/* eslint-disable no-restricted-syntax */
import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  ImageBackground,
  Platform,
  NativeModules
} from "react-native"
import { connect } from "react-redux"
import { Modal } from "@ant-design/react-native"
import moment from "moment"
import { primaryColor, iconSize } from "../../styles/common"
import Pay from "../../components/Pay/Pay"
import Result from "../../components/Pay/Result"
import Top from "./Vip/VipTop"

const { RNInAppPurchaseModule } = NativeModules
const payArray = [
  {
    key: "vipMonth",
    title: "VIP包月",
    price: "188",
    des: "月度可无限次获取联系方式"
  },
  {
    key: "vipQuarter",
    title: "VIP包季",
    price: "518",
    des: "季度可无限次获取联系方式"
  },
  {
    key: "vipYear",
    title: "VIP包年",
    price: "1998",
    des: "年度可无限次获取联系方式"
  },
  {
    key: "settleMonth",
    title: "超级商家包月",
    price: "288",
    des: "月度所有入驻的行业享受超级商家权益"
  },
  {
    key: "settleQuarter",
    title: "超级商家包季",
    price: "818",
    des: "季度所有入驻的行业享受超级商家权益"
  },
  {
    key: "settleYear",
    title: "超级商家包年",
    price: "2998",
    des: "年度所有入驻的行业享受超级商家权益"
  }
]

// const IAP_PRODUCT_IDS =['com.gp.gongjijian_vip_year']

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
      // iapProductIds: [
      //   "com.gp.gongjijian_vip_season",
      //   "com.gp.gongjijian_vip_year",
      //   // 'com.gp.gongjijian_vip_month',
      //   "com.gp.gongjijian_supervip_season",
      //   "com.gp.gongjijian_supervip_year",
      //   "com.gp.gongjijian_supervip_month"
      // ]
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: "app/getUserFinance"
    })

    if (Platform.OS === "ios") {
      this.props.dispatch({
        type: "app/getAppleProducts",
        callback: res => {
          if (res.status === "OK") {
            const vipIds = []

            res.result.vip.forEach(item => {
              vipIds.push(item.id)
            })

            res.result.superVip.forEach(item => {
              vipIds.push(item.id)
            })

            RNInAppPurchaseModule.loadProducts(
              // vipIds,
              [
                "com.gp.gongjijian_vip_season",
                "com.gp.gongjijian_vip_year",
                "com.gp.gongjijian_vip_month_000",
                "com.gp.gongjijian_supervip_season",
                "com.gp.gongjijian_supervip_year",
                "com.gp.gongjijian_supervip_month"
              ],
              (error, products) => {
                if (!error) {
                  this.setState({ vipProducts: products })
                }
              }
            )
          }
        }
      })

      // 处理与服务器交互失败，缓存下来的漏单
      const { iapUnverifyOrdersArray } = RNInAppPurchaseModule

      for (const purchase of iapUnverifyOrdersArray) {
        // TODO: 与服务器交互验证购买凭证
        console.log(purchase)
        // 验证成功，删除缓存的凭证
        RNInAppPurchaseModule.removePurchase(purchase)
      }

      // 注册iap，监听并处理因App意外推出产生的漏单
      RNInAppPurchaseModule.addTransactionObserverWithCallback(
        (error, purchase) => {
          // TODO: 与服务器交互验证购买凭证
          console.log(purchase)
          // 验证成功，删除缓存的凭证
          RNInAppPurchaseModule.removePurchase(purchase)
        }
      )
    } else {
      this.props.dispatch({
        type: "app/getPriceList",
        callback: res => {
          if (res.msg === "OK") {
            console.log("getPriceList", res.result)
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
    }
  }

  paySuccess = () => {
    this.props.dispatch({
      type: "app/getUserFinance"
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
        activeOpacity={1}
        key={payType.identifier || payType.key}
        onPress={() => {
          this.setState({ activeKey: index })
        }}
        style={{ width: "33%", alignItems: "center" }}
      >
        <View style={styles.content}>
          <View style={wrap}>
            <Text style={[styles.text, styles.title]}>
              {payType.title || "包月"}
            </Text>
            <Text style={[styles.text, styles.price]}>
              {payType.priceString || `¥${payType.price}`}
            </Text>
            <Text style={[styles.text, styles.des]}>
              {payType.description || payType.des}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  payByBalance = () => {
    const { activeKey, vipInfo = [], vipProducts } = this.state
    let type = ""
    let payload = {}

    if (Platform.OS === "ios") {
      const { identifier } = vipProducts[activeKey]
      let key = ""
      if (identifier.includes("super")) {
        if (identifier.includes("month")) {
          key = "settleMonth"
        }
        if (identifier.includes("season")) {
          key = "settleQuarter"
        }
        if (identifier.includes("year")) {
          key = "settleYear"
        }

        payload = {
          type: key
        }

        type = "app/createSuperVipOrder"
      } else {
        if (identifier.includes("month")) {
          key = "vipMonth"
        }
        if (identifier.includes("season")) {
          key = "vipQuarter"
        }
        if (identifier.includes("year")) {
          key = "vipYear"
        }

        payload = {
          type: key
        }

        type = "app/createVipOrder"
      }
    } else {
      const { key } = vipInfo[activeKey]

      payload = {
        type: key
      }

      type = key.includes("vip")
        ? "app/createVipOrder"
        : "app/createSuperVipOrder"
    }

    this.props.dispatch({
      type,
      payload,
      callback: response => {
        if (response.status === "OK") {
          this.setState({
            orderId: response.result.id,
            resultVisible: true,
            resultCode: Math.random()
          })
          this.paySuccess()
        } else if (response.status === "ERROR") {
          if (response.errorCode === "12000") {
            Modal.alert("提示", "您的余额不足，直接购买", [
              {
                text: "取消"
              },
              { text: "确认", onPress: this.pay }
            ])
          }
        }
      }
    })
  };

  pay = () => {
    if (Platform.OS === "ios") {
      const { vipProducts, activeKey } = this.state
      RNInAppPurchaseModule.purchaseProduct(
        vipProducts[activeKey].identifier,
        (error, result) => {
          if (error) {
            // BXAlert.showTipAlert('提示', error || '购买失败')
          } else {
            // TODO: 与服务器交互购买凭证
            console.log(result)

            this.props.dispatch({
              type: "app/appleVerify",
              payload: {
                id: result.productIdentifier,
                receipt: result.receipt,
                productIdentifier: result.productIdentifier,
                transactionIdentifier: result.transactionIdentifier
              },
              callback: res => {
                if (res.msg === "OK") {
                  this.payByBalance()
                  // this.paySuccess()
                }
              }
            })
            // 验证成功，删除缓存的凭证
            RNInAppPurchaseModule.removePurchase(result)
          }
        }
      )
      return
    }

    this.setState({
      payVisible: true,
      timeStamp: moment().format("x")
    })
  };

  render() {
    const {
      vipInfo,
      activeKey,
      payVisible,
      timeStamp,
      resultVisible,
      resultCode,
      orderId,
      vipProducts = []
    } = this.state
    const info =
      Platform.OS === "ios" ? vipProducts[activeKey] : vipInfo[activeKey]

    const payData =
      Platform.OS === "ios"
        ? {
            use: info && info.identifier.includes("super") ?  "购买超级商家":"购买vip" ,
            price: info && info.priceString.split("¥")[0],
          }
        : {
            use: info && info.key.includes("vip") ? "购买vip" : "购买超级商家",
            name: info && info.title,
            price: info && info.price,
            type: info && info.key.includes("vip") ? "vip" : "superVip",
            vip: info && info.key
          }

    const resultData = { orderId, ...payData }

    return (
      <View style={styles.container}>
        <Result
          visible={resultVisible}
          onOK={this.paySuccess}
          data={resultData}
          timeStamp={resultCode}
        />
        <ScrollView
          style={{ flex: 1 }}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Top />
          <Text style={{ fontSize: 16, color: "#009688", margin: 10 }}>
            超级商家享有Vip的所有权限
          </Text>
          <View style={styles.payBox}>
            {Platform.OS !== "ios" && vipInfo.map(this.renderPayWays)}
            {Platform.OS === "ios" && vipProducts.map(this.renderPayWays)}
            <ImageBackground
              style={styles.rcmBg}
              source={require("./Vip/images/bg_recommend.png")}
            >
              <Text style={styles.rcmTxt}>推荐</Text>
            </ImageBackground>
            <ImageBackground
              style={styles.rcmBg2}
              source={require("./Vip/images/bg_recommend.png")}
            >
              <Text style={styles.rcmTxt}>推荐</Text>
            </ImageBackground>
          </View>
          <View />
          <TouchableOpacity style={styles.btn} onPress={this.payByBalance}>
            <Text style={styles.btnText}>立即开通</Text>
          </TouchableOpacity>
          <View style={{ height: 100 }} />
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
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  wrap: {
    justifyContent: "center",
    // width: 130,
    height: 130,
    borderWidth: 2,
    borderColor: "#EEE",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FFF"
  },
  activeWrap: {
    justifyContent: "center",
    // width: 130,
    height: 130,
    borderWidth: 2,
    borderColor: "#E7BC85",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FFF7E5"
  },
  content: {
    flex: 1,
    padding: 5
  },
  text: {
    textAlign: "center"
  },
  title: {
    fontSize: 12
  },
  price: {
    color: "#C99A2E",
    fontSize: 20
  },
  des: {
    fontSize: 12,
    minHeight: 50
  },
  rcmBg: {
    right: 0,
    width: 60,
    height: 30,
    position: "absolute"
  },
  rcmBg2: {
    top: 140,
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
