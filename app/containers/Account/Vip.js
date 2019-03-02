import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  ImageBackground
} from "react-native"
import { connect } from "react-redux"

import moment from "moment"
import { primaryColor, iconSize } from "../../styles/common"
import Pay from "../../components/Pay/Pay"
import { createAction, NavigationActions } from "../../utils"
import Top from "./Vip/VipTop"

const payArray = [
  {
    key: "vipMonth",
    title: "包月",
    price: "30.00",
    des: "月度可查100次联系方式"
  },
  {
    key: "vipQuarter",
    title: "包季",
    price: "80.00",
    des: "季度可无限次获取联系方式"
  },
  {
    key: "vipYear",
    title: "包年",
    price: "300.00",
    des: "一年内可无限次获取联系方式"
  }
]
@connect(({ app }) => ({ ...app }))
class Vip extends Component {
  static navigationOptions = {
    tabBarLabel: ({ focused }) => (
      <Text
        style={[
          { fontSize: 12, textAlign: "center" },
          { color: focused ? primaryColor : "#D5D5D5" }
        ]}
      >
        个人中心
      </Text>
    ),
    tabBarIcon: ({ focused }) => (
      <Image
        style={styles.icon}
        source={
          focused
            ? require("./images/icon_tag_personal_pre.png")
            : require("./images/icon_tag_personal_nor.png")
        }
      />
    ),
    tabBarButtonComponent: TouchableOpacity
  };

  constructor() {
    super()
    this.state = {
      activeKey: 2,
      vipInfo: []
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: "app/getPriceList",
      callback: res => {
        if (res.msg === "OK") {
          const vipInfo = []
          payArray.forEach(item => {
            const data = { ...item }
            data.price = res.result[item.key]
            vipInfo.push(data)
          })
          this.setState({ vipInfo })
        }
      }
    })

    this.props.dispatch({
      type: "app/getUserFinance",
      callback: res => {
        if (res.msg === "OK") {
          this.setState({ userFinance: res.result })
        }
      }
    })
  }

  paySuccess = () => {
    this.props.dispatch({
      type: "app/getUserFinance",
      callback: res => {
        if (res.msg === "OK") {
          this.setState({ userFinance: res.result })
        }
      }
    })
  };

  renderPayWays = (payType, index) => {
    const { activeKey } = this.state
    let { wrap } = styles

    if (activeKey === index) {
      wrap = styles.activeWrap
    }
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ activeKey: index })
        }}
        style={{ flex: 1, alignItems: "center" }}
      >
        <View style={styles.content}>
          <View style={wrap}>
            <Text style={[styles.text, styles.title]}>
              {payType.title || "包月"}
            </Text>
            <Text style={[styles.text, styles.price]}>
              ¥{payType.price || 30.0}
            </Text>
            <Text style={[styles.text, styles.des]}>
              {payType.des || "月度可查100次联系方式"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  render() {
    const {
      vipInfo,
      activeKey,
      payVisible,
      userFinance={},
      timeStamp
    } = this.state
    const info = vipInfo[activeKey]
    const payData = {
      use: "购买VIP",
      name: info && info.title,
      price: info && info.price,
      type: "vip",
      vip: info && info.key
    }
    return (
      <View style={styles.container}>
        <ScrollView
          style={{ flex: 1 }}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Top data={userFinance} />
          <View style={styles.payBox}>
            {vipInfo.map(this.renderPayWays)}
            <ImageBackground
              style={styles.rcmBg}
              source={require("./Vip/images/bg_recommend.png")}
            >
              <Text style={styles.rcmTxt}>推荐</Text>
            </ImageBackground>
          </View>
          <View />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.setState({
                payVisible: true,
                timeStamp: moment().format("x")
              })
            }}
          >
            <Text style={styles.btnText}>{userFinance.vip ? "继续充值":"立即开通"}</Text>
          </TouchableOpacity>
        </ScrollView>
        <Pay
          onSuccess={this.paySuccess}
          visible={payVisible}
          timeStamp={timeStamp}
          data={payData}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    width: iconSize,
    height: iconSize
  },
  payBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40
  },
  wrap: {
    justifyContent: "center",
    // width: 130,
    height: 180,
    borderWidth: 2,
    borderColor: "#EEE",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FFF"
  },
  activeWrap: {
    justifyContent: "center",
    // width: 130,
    height: 180,
    borderWidth: 2,
    borderColor: "#E7BC85",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FFF7E5"
  },
  content:{
    flex: 1,
    padding:5,
  },
  text: {
    textAlign: "center"
  },
  title: {
    fontSize: 18
  },
  price: {
    color: "#C99A2E",
    fontSize: 24
  },
  des: {
    height: 80
  },
  rcmBg: {
    right: 0,
    width: 60,
    height: 30,
    position: "absolute"
  },
  rcmTxt: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center"
  },
  btn: {
    marginTop: 20,
    height: 50,
    backgroundColor: "#D4B87C",
    marginHorizontal: 16,
    borderRadius: 25
  },
  btnBg: {
    width: "100%",
    height: 50
  },
  btnText: {
    lineHeight: 50,
    fontSize: 20,
    textAlign: "center",
    color: "#FFF"
  }
})

export default Vip
