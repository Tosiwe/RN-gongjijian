/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Linking
} from "react-native"
import { NavigationActions } from "react-navigation"

import { connect } from "react-redux"
import { statusBarHeight } from "../../styles/common"

@connect(({ app }) => ({ ...app }))
class Top extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInfo: {
        nick: "user"
      }
    }
  }

  componentDidMount() {
    if (this.props.userInfo) {
      this.setState({ userInfo: this.props.userInfo })
    } else {
      this.props.dispatch({
        type: "app/getProfile",
        callback: res => {
          if (res.msg === "OK") {
            const userInfo = res.result
            this.setState({ userInfo })
          }
        }
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(this.state.userInfo) !== JSON.stringify(nextProps.userInfo)
    ) {
      this.props.dispatch({
        type: "app/getProfile",
        callback: res => {
          if (res.msg === "OK") {
            this.setState({ userInfo: res.result })
          }
        }
      })
    }
  }

  toSet = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Setting",
        params: { name: "设置" }
      })
    )
  };

  setProfile = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "ProfileSetting",
        params: { name: "修改资料" }
      })
    )
  };

  toVip = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: "Vip" }))
  };

  toMessage = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Recommend",
        params: { name: "消息" }
      })
    )
  };

  render() {
    const { userInfo } = this.state
    return (
      <ImageBackground
        style={styles.wrap}
        imageStyle={styles.bgStyle}
        source={require("./images/bg_personal.png")}
      >
        <View style={styles.head}>
          <TouchableOpacity onPress={this.toSet}>
            <Image source={require("./images/icon_nav_set.png")} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              // width: 100,
              justifyContent: "flex-end"
            }}
          >
            <TouchableOpacity onPress={() => Linking.openURL("tel:10010")}>
              <Image source={require("./images/icon_nav_service.png")} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toMessage}>
              <Image source={require("./images/icon_nav_news.png")} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.vipPay} onPress={this.toVip}>
          <ImageBackground
            style={styles.vipBg}
            source={require("./images/btn_vip_bg.png")}
          >
            <Image source={require("./images/icon_vip1.png")} />
            <Text style={{ color: "#F8E4B3" }}>VIP充值</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.setProfile}>
          <Image
            style={styles.avator}
            source={
              userInfo.headshotUrl && userInfo.headshotUrl.includes("http")
                ? { uri: userInfo.headshotUrl }
                : require("./images/logo.jpg")
            }
          />
        </TouchableOpacity>
        <Text style={styles.text}>{userInfo.nick}</Text>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    height: 300,
    alignItems: "center",
    paddingTop: statusBarHeight,
    textAlign: "center"
  },
  bgStyle: {
    // resizeMode: Image.resizeMode.stretch
  },
  head: {
    width: "100%",
    flexDirection: "row",
    height: 60,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    fontSize: 20,
    color: "#FFF",
    top: -10
  },
  vipPay: {
    position: "absolute",
    top: 90,
    right: 0,
    width: 80
  },
  vipBg: {
    width: 100,
    height: 28,
    padding: 5,
    // resizeMode: Image.resizeMode.contain,
    flexDirection: "row"
  },
  avator: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#FFF",
    top: -15
  }
})
export default Top
