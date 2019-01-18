import React, { Component } from 'react'
import { BackHandler, TouchableOpacity } from 'react-native'

import {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationActions,
} from 'react-navigation'

import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers'

import { Provider } from '@ant-design/react-native'
import { connect } from 'react-redux'

import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator'
import Icon from 'react-native-vector-icons/AntDesign'
import Loading from './containers/Loading'
import Login from './containers/Auth/Login'
import SignUp from './containers/Auth/SignUp'
import Home from './containers/Home/Home'
import Account from './containers/Account/Account'
import Detail from './components/Detail/Detail'
import PaperDetail from './components/Detail/PaperDetail'
import AddButton from './components/AddButton/AddButton'
import Search from './components/Search/Search'
import Entry from './containers/Entry/Entry'
import Publish from './components/Publish/Publish'
import CompanyOrPerson from './components/Publish/CompanyOrPerson'
import FormDemand from './components/Publish/FormDemand'
import FormInfo from './components/Publish/FormInfo'
import Seconds from './components/Publish/Seconds'
// 底部标签导航
const HomeNavigator = createBottomTabNavigator({
  Home: { screen: Home },
  Add: {
    screen: AddButton,
    navigationOptions: () => ({
      tabBarButtonComponent: () => <AddButton />,
    }),
  },
  Account: { screen: Account },
})

// 底部导航属性设置
HomeNavigator.navigationOptions = {
  header: null,
  tabBarButtonComponent: TouchableOpacity,
}

// 主要业务页面页内路由设置
const mainNavigationOptions = ({ navigation }) => ({
  title: `${navigation.state.params.name}`,
  headerStyle: { backgroundColor: '#F9F9F9' },
  headerLeft: (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack()
      }}
    >
      <Icon name="left" size={24} color="black" style={{ marginLeft: 13 }} />
    </TouchableOpacity>
  ),
})

// 主要业务页面
const MainNavigator = createStackNavigator(
  {
    HomeNavigator: {
      // 首页
      screen: HomeNavigator,
    },
    Detail: {
      // 详情页
      screen: Detail,
    },
    PaperDetail: {
      // 图纸详情页
      screen: PaperDetail,
    },
    Entry: {
      // 频道页
      screen: Entry,
      navigationOptions: mainNavigationOptions,
    },
    Publish: {
      // 发布页-类型选择
      screen: Publish,
      navigationOptions: mainNavigationOptions,
    },
    CompanyOrPerson: {
      // 发布页-商户选择
      screen: CompanyOrPerson,
      navigationOptions: ({ navigation }) => ({
        title: '选择发布分类',
        headerStyle: { backgroundColor: '#F9F9F9' },
        headerLeft: (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}
          >
            <Icon
              name="left"
              size={24}
              color="black"
              style={{ marginLeft: 13 }}
            />
          </TouchableOpacity>
        ),
      }),
    },
    FormDemand: {
      // 发布页-编辑需求
      screen: FormDemand,
      navigationOptions: mainNavigationOptions,
    },
    FormInfo: {
      // 发布页-编辑信息
      screen: FormInfo,
      navigationOptions: ({ navigation }) => ({
        title: `信息编辑`,
        headerStyle: { backgroundColor: '#F9F9F9' },
        headerLeft: (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}
          >
            <Icon
              name="left"
              size={24}
              color="black"
              style={{ marginLeft: 13 }}
            />
          </TouchableOpacity>
        ),
      }),
    },
    Seconds:{
      // 发布页-二手信息分类
      screen: Seconds,
      navigationOptions: mainNavigationOptions,
    }
  },
  {
    transitionConfig: () => ({
      // 水平切换
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    }),
  }
)

// 基础页面
const AppNavigator = createStackNavigator(
  {
    SignUp: { screen: SignUp },
    Login: { screen: Login },
    Main: { screen: MainNavigator },
    Publish: { screen: Publish },
    Search: { screen: Search },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      // 垂直切换
      screenInterpolator: StackViewStyleInterpolator.forVertical,
    }),
  }
)

export const routerReducer = createNavigationReducer(AppNavigator)

export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.router
)

const App = reduxifyNavigator(AppNavigator, 'root')

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
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  backHandle = () => {
    const currentScreen = getActiveRouteName(this.props.router)
    if (currentScreen === 'Login') {
      return true
    }
    if (currentScreen === 'Publish') {
      return true
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

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
