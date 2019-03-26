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
import moment from "moment"
import { Toast, Modal } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"
import Icon from "react-native-vector-icons/AntDesign"
import { connect } from "react-redux"
import Pay from "../../../components/Pay/Pay"

import { statusBarHeight } from "../../../styles/common"

@connect(({ app }) => ({ ...app }))
class VipTop extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // nick: "username"
    }
  }

  goBack = () => {
    this.props.dispatch(NavigationActions.back())
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

  toRecords = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "PayRecords",
        params: { name: "消费记录" }
      })
    )
  };

  paySuccess = () => {
    this.props.dispatch({
      type: "app/getUserFinance"
    })
  };

  toPay = price => {
    this.setState({
      price,
      payVisible: true,
      timeStamp: moment().format("x")
    })
  };

  inputPrice = () => {
    Modal.prompt("充值", "请输入您要充值的金额", [
      { text: "取消" },
      { text: "确认", onPress: this.toPay }
    ])
  };

  render() {
    let { data = {} } = this.props
    const { userFinance = {}, userInfo = {} } = this.props

    const { payVisible, timeStamp, price } = this.state

    if (userFinance) {
      data = userFinance
    }

    const payData = {
      use: "余额充值",
      name: "余额充值",
      price,
      type: "charge"
    }

    return (
      <ImageBackground
        style={styles.wrap}
        imageStyle={styles.bgStyle}
        source={require("./images/bg_vip.png")}
      >
        <View style={styles.head}>
          <TouchableOpacity onPress={this.goBack}>
            <Text style={styles.topLeft} >取消</Text>
          </TouchableOpacity>
          <Text style={styles.title}>VIP会员</Text>
          <TouchableOpacity onPress={this.toRecords}>
            <View
              style={{
                flexDirection: "row",
                // width: 100,
                justifyContent: "flex-end"
              }}
            >
              <Text style={styles.topRight}>消费记录</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <TouchableOpacity style={styles.flex2} onPress={this.setProfile}>
            <Image
              style={styles.avator}
              source={
                userInfo.headshotUrl && userInfo.headshotUrl.includes("http")
                  ? { uri: userInfo.headshotUrl }
                  : require("../images/logo.png")
              }
            />
          </TouchableOpacity>
          <View style={[styles.flex5 ,{top:-5}]}>
            <Text style={styles.text}>{userInfo.nick}</Text>
            <Text style={styles.gold}>
              {data.vip
                ? `会员 ${moment(data.endTime).format("YYYY-MM-DD")} 到期`
                : "您还不是会员"}
            </Text>
            <Text style={styles.gold}>
              {data.superVip
                ? `超级商家 ${moment(data.superEndTime).format("YYYY-MM-DD")} 到期`
                : "您还不是超级商家"}
            </Text>
          </View>
          <View style={styles.flex3}>
            <Text style={styles.gold}>余额：{data.balance || "0.00"}元</Text>

            <TouchableOpacity
              style={styles.vipPay}
              // onPress={() => {
              //   this.setState({
              //     payVisible: true,
              //     timeStamp: moment().format("x")
              //   })
              // }}
              onPress={this.inputPrice}
            >
              <ImageBackground
                style={styles.vipBg}
                source={require("./images/btn_recharge_bg.png")}
              >
                <Text style={styles.vipText}>立即充值</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
        <Pay
          onSuccess={this.paySuccess}
          visible={payVisible}
          timeStamp={timeStamp}
          data={payData}
        />
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
    paddingHorizontal:10
  },
  text: {
    fontSize: 24,
    color: "#FFF"
    // top: -10
  },
  vipPay: {
    left: 10,
    top: 5
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
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFF"
  },
  title: {
    color: "#F8E3B1",
    fontSize: 22,
    left:15
  },
  topLeft: {
    color: "#F8E3B1",
  },
  topRight: {
    color: "#F8E3B1"
  },
  gold: { color: "#F8E3B1" },
  flex5: {
    flex: 5
  },
  flex2: {
    flex: 2
  },
  flex3: {
    flex: 3
  }
})
export default VipTop
