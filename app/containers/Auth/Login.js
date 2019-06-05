/* eslint-disable no-unused-expressions */
import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Platform,
  Linking,
} from "react-native"
import { connect } from "react-redux"
import { InputItem, Button, List, Toast ,Modal} from "@ant-design/react-native"
import Icon from "react-native-vector-icons/AntDesign"
import * as wechat from "react-native-wechat"
import { primaryColor } from "../../styles/common"
import { createAction, NavigationActions, Storage } from "../../utils"


@connect(({ app }) => ({ ...app }))
class Login extends Component {
  static navigationOptions = {
    title: "Login"
  };

  constructor(props) {
    super(props)
    this.state = {
      params: {},
    }
  }

  componentDidMount(){
    this.checkVersion()

    wechat.isWXAppInstalled().then(isInstalled => {
      this.setState({wechatIsInstalled:isInstalled})
    })

    if(this.props.login){
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: "HomeNavigator"
        })
      )
    }
  }
  
  update=()=>{
    // if( Platform.OS === "ios"){
    //   Linking.openURL('itms-apps://itunes.apple.com/cn/app/com.gp.gongjijian?mt=8&action=write-review')
    // }else{
      this.props.dispatch({
        type:"app/getVersionUrl",
        callback:res=>{
          if(res.status==="OK"){
            const url =  Platform.OS==="ios" ? res.result.iosUrl : res.result.url
            Linking.openURL(url).catch(err => console.error('An error occurred', err))
          }
        }
      })
    // }
  }

  checkVersion=()=>{
    this.props.dispatch({
      type:"app/checkVersion",
      callback:res=>{
        if(res.status==="OK" && res.shouldForceUpdate){
            Modal.alert('提示', '有新的工机建版本，请前去更新', [
              { text: '好的', onPress: this.update },
              { text: '取消', onPress: this.update },
            ])
        }
      }
    })
  }

  onClose = () => {
    this.props.dispatch(NavigationActions.back())
  };

  login = () => {
    const { params: payload } = this.state
    if (!payload.phone) {
      Toast.info("请输入电话",3,null,false)
      return null
    }

    if (!payload.password) {
      Toast.info("请输入密码",3,null,false)
      return null
    }
    payload.noNendAuth = true
    this.props.dispatch(createAction("app/login")(payload))
    return null
  };

  onChange = (value, name) => {
    const { params } = this.state
    params[name] = value.toString().replace(/\s*/g, "")
  };

  toSignUp = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "SignUp"
      })
    )
  };

  resetPassword = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "ResetPassword"
      })
    )
  };

  // 微信登录示例
  wechatLogin = () => {
    const scope = "snsapi_userinfo"
    const state = "wechat_sdk_demo"
    // 判断微信是否安装
    wechat.isWXAppInstalled().then(isInstalled => {
      if (isInstalled) {
        // 发送授权请求
        wechat
          .sendAuthRequest(scope,state)
          .then(responseCode => {
            // 返回code码，通过code获取access_token
            this.getAccessToken(responseCode.code)
          })
          .catch(err => {
            Toast.info("登录授权发生错误：",3, err.message, false)
          })
      } else {
        Platform.OS === "ios"
          ? Toast.info("没有安装微信，请先安装微信客户端再进行登录", 3, null, false)
          : Toast.info("没有安装微信，请先安装微信客户端再进行登录", 3, null, false)
      }
    })
  };

  getAccessToken = code => {
    this.props.dispatch({
      type: "app/wechatLogin",
      payload: {
        code,
        noNendAuth:true
      }
    })
  };

  render() {
    const { wechatIsInstalled } = this.state
    const { fetching } = this.props
    return (
      <View style={styles.container}>
        <Image style={{width:100, height:100, marginBottom:50}} source={require("../img/img_logo.png")} />
        <View>
          <List style={styles.list}>
            <InputItem
              multipleLine={false}
              clear
              type="phone"
              placeholder="手机号"
              maxLength={11}
              style={styles.input}
              onChange={value => this.onChange(value, "phone")}
            >
              <Icon style={styles.inputIcon} name="phone" />
            </InputItem>
            <InputItem
              multipleLine={false}
              clear
              type="password"
              placeholder="密码"
              style={styles.input}
              onChange={value => this.onChange(value, "password")}
            >
              <Icon style={styles.inputIcon} name="lock" />
            </InputItem>
          </List>
        </View>
        <Button
          size="large"
          type="primary"
          style={styles.loginBtn}
          activeStyle={styles.activeLoginBtn}
          onPress={this.login}
        >
          登录
        </Button>
        <View style={styles.actions}>
          <TouchableOpacity onPress={this.toSignUp}>
            <Text style={{ color: primaryColor }}>注册账号</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.resetPassword}>
            <Text style={{ color: primaryColor }}>忘记密码</Text>
          </TouchableOpacity>
        </View>
      { wechatIsInstalled && <View style={styles.thirdLogin}>
          <Text style={{ color: "#666" }}>第三方登录</Text>
          <View style={styles.thirdIconWrap}>
            <TouchableOpacity onPress={this.wechatLogin}>
              <Image source={require("../img/login_btn_wechat.png")} />
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <Icon name="QQ" style={styles.thirdIcon} />
            </TouchableOpacity> */}
          </View>
        </View>}
        {/* {!fetching && (
          <TouchableOpacity style={styles.close} onPress={this.onClose}>
            <Image
              style={styles.closeIcon}
              source={require("../../images/close.png")}
            />
          </TouchableOpacity>
        )} */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 20,
    borderBottomWidth: 0
  },
  close: {
    position: "absolute",
    left: 10,
    top: 30
  },
  logoText: {
    fontSize: 32,
    color: "#f57b6a",
    marginBottom: 100
  },
  loginBtn: {
    marginTop: 30,
    width: 300,
    backgroundColor: "#FF7720",
    borderColor: "#FF7720",
    borderRadius: 30
  },
  activeLoginBtn: {
    color: "#FFF",
    backgroundColor: "#FD9857"
  },

  closeIcon: {
    width: 24,
    height: 24,
    tintColor: "gray"
  },
  actions: {
    marginVertical: 20,
    width: 300,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  list: {
    borderRadius: 50,
    width: 300
  },
  input: {
    color: "#fff"
  },
  thirdLogin: {
    alignItems: "center",
    marginTop: 30
  },
  inputIcon: {
    color: "#7f7f7f",
    fontSize: 20,
    width: 20
  },
  thirdIcon: {
    fontSize: 28,
    marginTop: 20
  },
  thirdIconWrap: {
    width: 300,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10
  }
})

export default Login
