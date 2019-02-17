/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native"
import { NavigationActions } from "react-navigation"

import { connect } from "react-redux"
import { statusBarHeight } from "../../styles/common"

@connect(({ app }) => ({ ...app }))
class Top extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nick: "username"
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: "app/getProfile",
      callback: res => {
        if (res.msg === "OK") {
          const { nick } = res.result
          this.setState({ nick })
        }
      }
    })
  }

  toSet = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Setting",
        params: { name: "设置" }
      })
    )
  };

  render() {
    const { nick } = this.state
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
            <TouchableOpacity>
              <Image source={require("./images/icon_nav_service.png")} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("./images/icon_nav_news.png")} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.vipPay}>
          <ImageBackground
            style={styles.vipBg}
            source={require("./images/btn_vip_bg.png")}
          >
            <Image source={require("./images/icon_vip1.png")} />
            <Text style={{ color: "#F8E4B3" }}>VIP充值</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Image
          style={styles.avator}
          source={{
            uri:
              "https://wx4.sinaimg.cn/mw1024/ad38de43ly1fpewj6ks53j23u2227qvb.jpg"
          }}
        />
        <Text style={styles.text}>{nick}</Text>
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
