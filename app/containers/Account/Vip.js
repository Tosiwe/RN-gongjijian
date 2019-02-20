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

import { primaryColor, iconSize } from "../../styles/common"

import { createAction, NavigationActions } from "../../utils"
import Top from "./Vip/VipTop"

const payArray = [
  {
    title: "包月",
    price: "30.00",
    des: "月度可查100次联系方式"
  },
  {
    title: "包季",
    price: "80.00",
    des: "季度可查400次联系方式"
  },
  {
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
      activeKey:2
    }
  }

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
      </TouchableOpacity>
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={{ flex: 1 }}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Top />
          <View style={styles.payBox}>
            {payArray.map(this.renderPayWays)}
            <ImageBackground
              style={styles.rcmBg}
              source={require("./Vip/images/bg_recommend.png")}
            >
              <Text style={styles.rcmTxt}>推荐</Text>
            </ImageBackground>
          </View>
          <View />
          <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>立即开通</Text>
          </TouchableOpacity>
        </ScrollView>
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
    width: 130,
    height: 160,
    borderWidth: 2,
    borderColor: "#EEE",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FFF"
  },
  activeWrap: {
    justifyContent: "center",
    width: 130,
    height: 160,
    borderWidth: 2,
    borderColor: "#E7BC85",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FFF7E5"
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
  des: {},
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
  btnBg:{
    width:"100%",
    height:50
  },
  btnText: {
    lineHeight: 50,
    fontSize: 20,
    textAlign: "center",
    color: "#FFF"
  }
})

export default Vip
