/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-state */
import React, { Component } from "react"
import { BackHandler, TouchableOpacity ,Platform,NativeAppEventEmitter} from "react-native"

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

import { Provider , Toast} from "@ant-design/react-native"
import { connect } from "react-redux"
import * as wechat from "react-native-wechat"
import JPushModule from "jpush-react-native"

import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator"
import Icon from "react-native-vector-icons/AntDesign"
import Loading from "./containers/Loading"
import Login from "./containers/Auth/Login"
import SignUp from "./containers/Auth/SignUp"
import ResetPassword from "./containers/Auth/ResetPassword"
import BindPhone from "./containers/Auth/BindPhone"
import Home from "./containers/Home/Home"
import Account from "./containers/Account/Account"
import Setting from "./containers/Account/Setting"
import ChooseIndustry from "./containers/Account/ChooseIndustry"
import About from "./containers/Account/About"
import ProfileSetting from "./containers/Account/ProfileSetting"
import MyLike from "./containers/Account/MyLike"
import MyDownload from "./containers/Account/MyDownload"
import MyHistory from "./containers/Account/MyHistory"
import EditProfile from "./containers/Account/EditProfile"
import PayRecords from "./containers/Account/PayRecords"
import Recommend from "./containers/Account/Recommend"
import UserVerify from "./containers/Account/UserVerify"
import MessageDetail from "./containers/Account/MessageDetail"
import Detail from "./components/Detail/Detail"
import PaperDetail from "./components/Detail/PaperDetail"
import ImageReader from "./components/Detail/ImageReader"
import AddButton from "./components/AddButton/AddButton"
import Search from "./components/Search/Search"
import SearchResult from "./components/Search/SearchResult"
import Entry from "./containers/Entry/Entry"
import Publish from "./components/Publish/Publish"
import CompanyOrPerson from "./components/Publish/CompanyOrPerson"
import FormDemand from "./components/Publish/FormDemand"
import FormInfo from "./components/Publish/FormInfo"
import Seconds from "./components/Publish/Seconds"
import MyPublish from "./components/Publish/MyPublish"
import Settle from "./components/Settle/Settle"
import SettleForm from "./components/Settle/SettleForm"
import Result from "./components/Pay/Result"

import Vip from "./containers/Account/Vip_android"

let receiveNotification = ""
let subscription=""
let addOpenNotificationLaunchAppListener=""

// 底部标签导航
const HomeNavigator = createBottomTabNavigator({
  Home: { screen: Home },
  Add: {
    screen: AddButton,
    navigationOptions: () => ({
      tabBarButtonComponent: () => <AddButton />
    })
  },
  Account: { screen: Account }
})

// 底部导航属性设置
HomeNavigator.navigationOptions = {
  header: null,
  tabBarButtonComponent: TouchableOpacity
}

// 主要业务页面页内路由设置
const mainNavigationOptions = ({ navigation }) => ({
  title: `${navigation.state.params ? navigation.state.params.name : ""}`,
  headerStyle: { backgroundColor: "#F9F9F9", fontSize: 20 },
  headerLeft: (
    <TouchableOpacity
      style={{ height: 40, justifyContent: "center", width: 40 }}
      onPress={() => {
        navigation.goBack()
      }}
    >
      <Icon name="left" size={20} color="black" style={{ marginLeft: 13 }} />
    </TouchableOpacity>
  ),
  gesturesEnabled: true
})

// 主要业务页面
const MainNavigator = createStackNavigator(
  {
    HomeNavigator: {
      // 首页
      screen: HomeNavigator
    },
    Detail: {
      // 详情页
      screen: Detail,
      navigationOptions: mainNavigationOptions
    },
    PaperDetail: {
      // 图纸详情页
      screen: PaperDetail,
      navigationOptions: mainNavigationOptions
    },
    Entry: {
      // 频道页
      screen: Entry,
      navigationOptions: mainNavigationOptions
    },
    Publish: {
      // 发布页-类型选择
      screen: Publish,
      navigationOptions: mainNavigationOptions
    },
    CompanyOrPerson: {
      // 发布页-商户选择
      screen: CompanyOrPerson,
      navigationOptions: mainNavigationOptions
    },
    FormDemand: {
      // 发布页-编辑需求
      screen: FormDemand,
      navigationOptions: mainNavigationOptions
    },
    FormInfo: {
      // 发布页-编辑信息
      screen: FormInfo,
      navigationOptions: mainNavigationOptions
    },
    Seconds: {
      // 发布页-二手信息分类
      screen: Seconds,
      navigationOptions: mainNavigationOptions
    },
    Setting: {
      // 个人中心-设置
      screen: Setting,
      navigationOptions: mainNavigationOptions
    },
    MyPublish: {
      // 个人中心-我的发布
      screen: MyPublish,
      navigationOptions: mainNavigationOptions
    },
    ChooseIndustry: {
      // 个人中心-行业设置
      screen: ChooseIndustry,
      navigationOptions: mainNavigationOptions
    },
    About: {
      // 个人中心-关于
      screen: About,
      navigationOptions: mainNavigationOptions
    },
    ProfileSetting: {
      // 个人中心-修改资料
      screen: ProfileSetting,
      navigationOptions: mainNavigationOptions
    },
    MyLike: {
      // 我的收藏
      screen: MyLike,
      navigationOptions: mainNavigationOptions
    },
    MyHistory: {
      // 我的历史
      screen: MyHistory,
      navigationOptions: mainNavigationOptions
    },
    MyDownload: {
      // 我的下载
      screen: MyDownload,
      navigationOptions: mainNavigationOptions
    },
    EditProfile: {
      // 修改资料
      screen: EditProfile,
      navigationOptions: mainNavigationOptions
    },
    Settle: {
      // 新入驻
      screen: Settle,
      navigationOptions: mainNavigationOptions
    },
    SettleForm: {
      // 入驻表单
      screen: SettleForm,
      navigationOptions: mainNavigationOptions
    },
    Search: {
      screen: Search,
      navigationOptions: {
        header: null
      }
    },

    SearchResult: {
      // 搜索结果
      screen: SearchResult,
      navigationOptions: mainNavigationOptions
    },

    PayRecords: {
      // 消费记录
      screen: PayRecords,
      navigationOptions: mainNavigationOptions
    },

    Result: {
      // 支付结果
      screen: Result,
      navigationOptions: mainNavigationOptions
    },

    Recommend: {
      // 消息
      screen: Recommend,
      navigationOptions: mainNavigationOptions
    },

    UserVerify: {
      // 消息
      screen: UserVerify,
      navigationOptions: mainNavigationOptions
    },
    MessageDetail: {
      // 消息详情
      screen: MessageDetail,
      navigationOptions: mainNavigationOptions
    },
    ImageReader: {
      // 消息详情
      screen: ImageReader,
      navigationOptions: mainNavigationOptions
    }
  },
  {
    transitionConfig: () => ({
      // 水平切换
      screenInterpolator: StackViewStyleInterpolator.forHorizontal
    })
  }
)

// 基础页面
const AppNavigator = createStackNavigator(
  {
    // UserVerify: { screen: UserVerify },
    Login: { screen: Login },
    Main: { screen: MainNavigator },
    BindPhone: { screen: BindPhone },
    ResetPassword: { screen: ResetPassword },
    SignUp: { screen: SignUp },
    Publish: { screen: Publish },
    Vip: { screen: Vip }
  },
  {
    headerMode: "none",
    mode: "modal",
    navigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig: () => ({
      // 垂直切换
      screenInterpolator: StackViewStyleInterpolator.forVertical
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

  componentDidMount() {
    wechat.registerApp("wx6da250551cee1eda")

    if (Platform.OS === 'android') {
      JPushModule.initPush()
      JPushModule.getInfo(map => {
        this.setState({
          appkey: map.myAppKey,
          imei: map.myImei,
          package: map.myPackageName,
          deviceId: map.myDeviceId,
          version: map.myVersion
        })
        console.log("appInfo:" ,map )
      })
      JPushModule.notifyJSDidLoad(resultCode => {
        if (resultCode === 0) {
          // Toast.info("notifyJSDidLoad")
        }else{
          // Toast.info("notifyJSDidLoad",resultCode)
        }
      })
    } else {
      // JPushModule.initPush()
       JPushModule.setupPush()

      receiveNotification =  NativeAppEventEmitter.addListener(
        'ReceiveNotification',
        (notification) => console.log(notification)
      )

      subscription = NativeAppEventEmitter.addListener(
        'networkDidReceiveMessage',
        (message) => console.log(message)
      )

      addOpenNotificationLaunchAppListener = JPushModule.addOpenNotificationLaunchAppListener(this.openNotificationListener)

      NativeAppEventEmitter.addListener('networkDidStetup',()=>{
        console.log("已连接")
      })
      NativeAppEventEmitter.addListener('networkDidClose',()=>{
        console.log("连接已断开")
      })
      NativeAppEventEmitter.addListener('networkDidRegister',()=>{
        console.log("已注册")
      })
      NativeAppEventEmitter.addListener('networkDidLogin',()=>{
        console.log("已登陆")
      })
     
    }

    this.onGetRegistrationIdPress()

    this.setTag()

    // 接收自定义消息事件
    JPushModule.addReceiveCustomMsgListener(this.receiveCustomMsgListener)

    // 接收推送事件
    JPushModule.addReceiveNotificationListener(this.receiveNotificationListener)

    // 点击推送事件
    JPushModule.addReceiveOpenNotificationListener(this.openNotificationListener)

    // 如果添加这个监听，设备注册成功后，打开应用将会回调这个事件。
    JPushModule.getRegistrationID(this.getRegistrationIdListener)


  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backHandle)
    
    // 取消接收自定义消息事件
    JPushModule.removeReceiveCustomMsgListener(this.receiveCustomMsgListener)
    
    // 取消接收推送事件
    JPushModule.removeReceiveNotificationListener(this.receiveNotificationListener)

    // 移除点击推送事件
    JPushModule.removeReceiveOpenNotificationListener(this.openNotificationListener)

    // 移除监听 registrationId 事件
    JPushModule.removeGetRegistrationIdListener(this.getRegistrationIdListener)
    // Toast.info('Will clear all notifications')

    // 清除所有通知
    JPushModule.clearAllNotifications()

    if(receiveNotification) receiveNotification.remove()
    if(subscription) subscription.remove()
    if(addOpenNotificationLaunchAppListener) addOpenNotificationLaunchAppListener.removeOpenNotificationLaunchAppEventListener()

  }

  onGetRegistrationIdPress () {
    JPushModule.getRegistrationID(registrationId => {
      this.setState({
        registrationId
      })
    })
  }

  setTag () {

    this.props.dispatch({
      type: "app/followList",
      callback: res => {
        if (res.msg === "OK") {
          const chooseList = res.result||[]

          if (chooseList) {
            /**
             * 请注意这个接口要传一个数组过去，这里只是个简单的示范
             */
            // Toast.info(`我关注了：${ chooseList}`)
            
            JPushModule.setTags(chooseList, map => {
              if (map.errorCode === 0) {
                // Toast.info(`Tag operate succeed, tags: ${  map.tags}`)
              } else {
                // Toast.info(`设置tag出错，error code: ${  map.errorCode}`)
              }
            })
          }

           
        }
      }
    })
   
  }

  backHandle = () => {
    const currentScreen = getActiveRouteName(this.props.router)
    // debugger
    if (currentScreen !== "Home") {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  };

  receiveCustomMsgListener = map => {
    this.setState({
      pushMsg: map.content
    })
    // Toast.info(`extras: ${  map.extras}`)
  }

  receiveNotificationListener = map => {
    // Toast.info(`alertContent: ${  map.alertContent}`)
    // Toast.info(`extras: ${  map.extras}`)
  }

  getRegistrationIdListener = registrationId => {
    // Toast.info(`Device register succeed, registrationId ${  registrationId}`)
  }

  openNotificationListener = map => {
    // Toast.info('Opening notification!')
    // Toast.info(`map.extra: ${  map.extras}`)
    this.jumpSecondActivity(map)
  }


  jumpSecondActivity (info) {
    // Toast.info('jump to SecondActivity')
    // this.props.navigation.navigate('Recommend')
    const extras = typeof(  info.extras) ==="string" ? JSON.parse( info.extras) :info.extras

    if(Platform.OS !== 'android'){
        JPushModule.setBadge(0, success => {})
    }
    if(extras.type === "info"){
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: "Detail",
          params: {
            name: extras.title,
            data:extras,
          }
        })
      )
    }else{
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: "Recommend",
          params: {
            name: "消息",
            data:extras,
          }
        })
      )
    }


   

  }
  

  // read = (item, isRec) => {
  //   const { dispatch } = this.props
  //   const payload = { id: item.id }
  //   if (isRec) {
  //     dispatch({
  //       type: "app/recommendRead",
  //       payload,
  //       callback: () => {
  //         this.props.dispatch(
  //           NavigationActions.navigate({
  //             routeName: "MessageDetail",
  //             params: {
  //               name: item.title,
  //               data: item
  //             }
  //           })
  //         )
  //       }
  //     })
  //   } else {
  //     dispatch({
  //       type: "app/noticeRead",
  //       payload,
  //       callback: () => {
  //         this.props.dispatch(
  //           NavigationActions.navigate({
  //             routeName: "MessageDetail",
  //             params: {
  //               name: item.title,
  //               data: item
  //             }
  //           })
  //         )
  //       }
  //     })
  //   }
  // };


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
