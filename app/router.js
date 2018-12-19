import React, { Component } from "react"
import { BackHandler, Animated, Easing, TouchableOpacity } from "react-native"

import {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationActions
} from "react-navigation"

import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from "react-navigation-redux-helpers"

import { Provider } from "@ant-design/react-native"
import { connect } from "react-redux"

import Loading from "./containers/Loading"
import Login from "./containers/Login"
import Home from "./containers/Home/Home"
import Publish from "./containers/Publish/Publish"
import Account from "./containers/Account/Account"
import Detail from "./containers/Detail"
import AddButton from "./components/AddButton/AddButton"
import { primaryColor } from "./styles/common"

// 底部标签导航
const HomeNavigator = createBottomTabNavigator(
  {
    Home: { screen: Home },
    Add: {
      screen: AddButton,
      navigationOptions: () => ({
        tabBarButtonComponent: () => <AddButton />
      })
    },
    Account: { screen: Account }
  },
  {
    tabBarOptions: {}
  }
)

// 底部导航属性设置
HomeNavigator.navigationOptions = {
  header: null,
  tabBarButtonComponent: TouchableOpacity,
  tabBarIcon: { tintColor: primaryColor }
}

const MainNavigator = createStackNavigator(
  {
    HomeNavigator: { screen: HomeNavigator },
    Detail: { screen: Detail }
  },
  {
    headerMode: "float"
  }
)
const AppNavigator = createStackNavigator(
  {
    Main: { screen: MainNavigator },
    Publish: { screen: Publish },
    Login: { screen: Login }
  },
  {
    headerMode: "none",
    mode: "modal",
    navigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps
        const { index } = scene

        const height = layout.initHeight
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0]
        })

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1]
        })

        return { opacity, transform: [{ translateY }] }
      }
    })
  }
)

export const routerReducer = createNavigationReducer(AppNavigator)

export const routerMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.router
)

const App = reduxifyNavigator(AppNavigator, "root")

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getActiveRouteName(route)
  }
  return route.routeName
}

@connect(({ app, router }) => ({ app, router }))
class Router extends Component {
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backHandle)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backHandle)
  }

  backHandle = () => {
    const currentScreen = getActiveRouteName(this.props.router)
    if (currentScreen === "Login") {
      return true
    }
    if (currentScreen === "Publish") {
      return true
    }
    if (currentScreen !== "Home") {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  };

  render() {
    const { app, dispatch, router } = this.props
    if (app.loading) return <Loading />

    return (
      <Provider theme={null}>
        <App dispatch={dispatch} state={router} />
      </Provider>
    )
  }
}

export default Router
