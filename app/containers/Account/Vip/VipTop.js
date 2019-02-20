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
import Icon from "react-native-vector-icons/AntDesign"

import { connect } from "react-redux"
import { statusBarHeight } from "../../../styles/common"

@connect(({ app }) => ({ ...app }))
class VipTop extends Component {
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

  goBack = () => {
    this.props.dispatch(
      NavigationActions.back()
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

  render() {
    const { nick } = this.state
    return (
      <ImageBackground
        style={styles.wrap}
        imageStyle={styles.bgStyle}
        source={require("./images/bg_vip.png")}
      >
        <View style={styles.head}>
          <TouchableOpacity onPress={this.goBack}>
            <Icon name="left" style={styles.topLeft} />
          </TouchableOpacity>
          <Text style={styles.title}>VIP会员</Text>
          <View
            style={{
              flexDirection: "row",
              // width: 100,
              justifyContent: "flex-end"
            }}
          >
            <Text style={styles.topRight}>消费记录</Text>
          </View>
        </View>
        <View style={styles.body}>
          <TouchableOpacity style={styles.flex1} onPress={this.setProfile}>
            <Image
              style={styles.avator}
              source={{
                uri:
                  "https://wx4.sinaimg.cn/mw1024/ad38de43ly1fpewj6ks53j23u2227qvb.jpg"
              }}
            />
          </TouchableOpacity>
          <View style={styles.flex1}>
            <Text style={styles.text}>{nick}</Text>
            <Text style={styles.gold}>您还不是会员</Text>
            <Text style={styles.gold}>余额：0.00元</Text>
          </View>
          <TouchableOpacity
            style={[styles.vipPay, styles.flex1]}
            onPress={this.toVip}
          >
            <ImageBackground
              style={styles.vipBg}
              source={require("./images/btn_recharge_bg.png")}
            >
              <Text style={styles.vipText}>立即充值</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    height: 220,
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
    height: 40,
    lineHeight: 40,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between"
  },
  body: {
    flexDirection: "row",
    top: 40,
    paddingLeft: 40,
    paddingRight: 20
  },
  text: {
    fontSize: 24,
    color: "#FFF"
    // top: -10
  },
  vipPay: {
   left:10,
   top:5
  },
  vipText: {
    color: "#3C2009",
    width: "100%",
    textAlign: "center",
    lineHeight: 50,
    top: -10,
    left: -4
  },
  vipBg: {
    width: 100,
    height: 50,
    paddingVertical: 5,
    flexDirection: "row"
  },
  avator: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFF"
  },
  title: {
    color: "#F8E3B1",
    fontSize: 22
  },
  topLeft: {
    color: "#F8E3B1",
    fontSize: 22
  },
  topRight: {
    color: "#F8E3B1"
  },
  gold: { color: "#F8E3B1" },
  flex1: {
    flex: 1
  }
})
export default VipTop
