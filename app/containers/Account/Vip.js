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
import { NavigationActions } from "react-navigation"
import { primaryColor, iconSize } from "../../styles/common"
// import Pay from "../../components/Pay/Pay"
import Result from "../../components/Pay/Result"
import Top from "./Vip/VipTop"

const { RNInAppPurchaseModule } = NativeModules


const payArray = [
  {
    key: "vipMonth",
    title: "VIP包月",
    price: "30.00",
    des: "月度可无限次获取联系方式"
  },
  {
    key: "vipQuarter",
    title: "VIP包季",
    price: "80.00",
    des: "季度可无限次获取联系方式"
  },
  {
    key: "vipYear",
    title: "VIP包年",
    price: "300.00",
    des: "年度可无限次获取联系方式"
  },
  {
    key: "settleMonth",
    title: "超级商家包月",
    price: "30.00",
    des: "月度所有入驻的行业享受超级商家权益"
  },
  {
    key: "settleQuarter",
    title: "超级商家包季",
    price: "80.00",
    des: "季度所有入驻的行业享受超级商家权益"
  },
  {
    key: "settleYear",
    title: "超级商家包年",
    price: "300.00",
    des: "年度所有入驻的行业享受超级商家权益"
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
    // this.props.dispatch({
    //   type: "app/getPriceList",
    //   callback: res => {
    //     if (res.msg === "OK") {
    //       console.log("getPriceList", res.result)
    //       const vipInfo = []
    //       payArray.forEach(item => {
    //         const data = { ...item }
    //         data.price = res.result[item.key]
    //         vipInfo.push(data)
    //       })
    //       this.setState({ vipInfo })
    //     }
    //   }
    // })

    if (Platform.OS === "ios") {
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

      this.props.dispatch({
        type: "app/getAppleProducts",
        callback: res => {
          if (res.status === "OK") {
            const vipIds = []

            res.result.vip.forEach(item => {
              vipIds.push(item.id)
            })

            RNInAppPurchaseModule.loadProducts(
              vipIds,
              (error, products) => {
                if (!error) {
                  this.setState({ vipProducts: products })
                }
              }
            )
          }
        }
      })

    }


    this.props.dispatch({
      type: "app/getUserFinance"
    })
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
        key={payType.identifier}
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
              {payType.priceString || 30.0}
            </Text>
            <Text style={[styles.text, styles.des]}>
              {payType.describe || "月度可查100次联系方式"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  // payByBalance = () => {
  //   const { activeKey, vipProducts } = this.state
  //   const { identifier } = vipProducts[activeKey]

  //   recharge

  //   // const payload = {
  //   //   type: key
  //   // }

  //   // const type = key.includes("vip")
  //   //   ? "app/createVipOrder"
  //   //   : "app/createSuperVipOrder"

  //   // this.props.dispatch({
  //   //   type,
  //   //   payload,
  //   //   callback: response => {
  //   //     if (response.status === "OK") {
  //   //       this.setState({
  //   //         orderId: response.result.id,
  //   //         resultVisible: true,
  //   //         resultCode: Math.random()
  //   //       })
  //   //     } else if (response.status === "ERROR") {
  //   //       if (response.errorCode === "12000") {
  //   //         Modal.alert("提示", Platform.OS === "android"?"您的余额不足，直接购买":"您的余额不足，请先充值", [
  //   //           {
  //   //             text: "取消"
  //   //           },
  //   //           { text: "确认", onPress: this.pay }
  //   //         ])
  //   //       }
  //   //     }
  //   //   }
  //   // })

  // };

  recharge = () => {
    const { activeKey, vipProducts } = this.state
    const { identifier,priceString } = vipProducts[activeKey]

    RNInAppPurchaseModule.purchaseProduct(identifier, (error, result) => {
      if (error) {
        // BXAlert.showTipAlert('提示', error || '购买失败')
      } else {
        // TODO: 与服务器交互购买凭证
        console.log(result)
        const type = identifier.includes("super")
          ? "app/createSuperVipOrderApple"
          :"app/createVipOrderApple"

        const payType ={
          "vip_month":"vipMonth",
          "vip_season":"vipQuarter",
          "vip_year":"vipYear",
          "supervip_month":"settleMonth",
          "supervip_season":"settleQuarter",
          "supervip_year":"settleYear",
        }

        let payload={}
 
        for(const a in payType){
          if(identifier.includes(a)){
            payload={
              type:payType[a]
            }
          }
        }

        this.props.dispatch({
          type,
          payload,
          callback: res => {
            if (res.msg === "OK") {
              this.props.dispatch({
                type: "app/appleVerify",
                payload: {
                  id: res.result.id,
                  receipt: result.receiptData,
                  productIdentifier: result.productIdentifier,
                  transactionIdentifier: result.transactionIdentifier
                },
                callback: resp => {
                  if (resp.msg === "OK") {
                    this.paySuccess()
                  }
                }
              })
            }
          }
        })

        // 验证成功，删除缓存的凭证
        RNInAppPurchaseModule.removePurchase(result)
      }
    })
  };

  pay = () => {

    if(Platform.OS === "android"){
      this.setState({
        timeStamp: moment().format("x"),
        payVisible: true
      })
    }

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
      vipProducts=[],
    } = this.state
    const info = vipInfo[activeKey]
    const payData = {
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
            {vipProducts.map(this.renderPayWays)}
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
          <TouchableOpacity style={styles.btn} onPress={this.recharge}>
            <Text style={styles.btnText}>立即开通</Text>
          </TouchableOpacity>
          <View style={{ height: 100 }} />
        </ScrollView>
        {/* <Pay
          onSuccess={this.paySuccess}
          visible={payVisible}
          timeStamp={timeStamp}
          data={payData}
        /> */}
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
