/* eslint-disable no-restricted-syntax */
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
  NativeModules,
  Platform
} from "react-native"
import moment from "moment"
import {
  Button,
  List,
  InputItem,
  Modal,
  Toast,
  Picker
} from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"
import { connect } from "react-redux"
// import Pay from "../../../components/Pay/Pay"

import { statusBarHeight } from "../../../styles/common"

const { RNInAppPurchaseModule } = NativeModules

@connect(({ app }) => ({ ...app }))
class VipTop extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // nick: "username"
    }
  }

  componentDidMount() {
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
            const rechargeIds = []
            // const vipIds = []

            res.result.recharge.forEach(item => {
              rechargeIds.push(item.id)
            })
            // res.result.vip.forEach(item => {
            //   vipIds.push(item.id)
            // })

            RNInAppPurchaseModule.loadProducts(
              // [
              //   'com.gp.gongjijian_recharge_18',
              //   'com.gp.gongjijian_recharge_68',
              //   'com.gp.gongjijian_recharge_108',
              //   'com.gp.gongjijian_recharge_158',
              //   'com.gp.gongjijian_recharge_198',
              //   'com.gp.gongjijian_recharge_298',
              //   'com.gp.gongjijian_recharge_588',
              //   // 'com.gp.gongjijian_recharge_998',
              // ],
              rechargeIds,
              (error, products) => {
                if (!error) {
                  const list = []
                  console.log("list", products)
                  let length = 0
                  products.forEach((item,index) => {
                

                    if(list.length){
                      const array = item.identifier.split("_")
                      const number = array[array.length - 1]
                 
                      list.forEach((it,i)=>{
                        const arr = it.value.split("_")
                        const num = arr[arr.length - 1]
                      
                        console.log("list index", i,"length", list.length-1)
                        
                        if(length< list.length){
                          return null
                        }

                        if( Number(number) < Number(num) ){
                          list.splice(i,0,{
                            label: item.title,
                            value: item.identifier
                          })
                        }else if(Number(number) > Number(num) && i === list.length-1){
                          list.push({
                            label: item.title,
                            value: item.identifier
                          })
                        }
                       
                      })

                    }else{
                      list.push({
                        label: item.title,
                        value: item.identifier
                      })
                    }
                    length = list.length
                    console.log("products list", [...list])
                  
                  }) 
                  this.setState({ rechargeProducts: list })
                }
              }
            )
            // RNInAppPurchaseModule.loadProducts(
            //   vipIds,
            //   (error, products) => {
            //     if (!error) {
            //       this.setState({ vipProducts: products })
            //     }
            //   }
            // )
          }
        }
      })

    }
  }

  recharge = id => {
    debugger
    RNInAppPurchaseModule.purchaseProduct(id[0], (error, result) => {
      if (error) {
        // BXAlert.showTipAlert('提示', error || '购买失败')
      } else {
        // TODO: 与服务器交互购买凭证
        console.log(result)
        const products = {}

        this.state.rechargeProducts.forEach(item=>{
          products[item.value] = item.label
        })

        this.props.dispatch({
          type: "app/creatRechargeOrder",
          payload: {
            amount: Number(products[id]),
            type: 3
          },
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

  // 创建业务订单
  createOrder = () => {
    const { data } = this.props
    const map = {
      vip: "app/createVipOrder",
      superVip: "app/createSuperVipOrder",
      contact: "app/createOrderContact",
      paper: "app/createOrderPaper"
    }
    const textMap = {
      vip: "会员",
      superVip: "超级商家",
      contact: "联系方式",
      paper: "图纸"
    }

    const payload = {}

    if (data.type === "vip") {
      payload.type = data.vip
    } else {
      payload.sourceId = data.id
    }

    this.props.dispatch({
      type: map[data.type],
      payload,
      callback: response => {
        if (response.status === "OK") {
          this.paySuccess()
        } else if (response.status === "ERROR") {
          if (!response.msg) {
            Toast.info(`创建${textMap[data.type]}订单失败`, 3, null, false)
          }
        }
      }
    })
  };

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

  toPay = () => {
    if (this.state.price < 0.01) {
      Toast.info("请输入正确的金额")
      return
    }
    this.setState({
      // price:this.state.inputNumber,
      visible: false,
      payVisible: true,
      timeStamp: moment().format("x")
    })
  };

  inputPrice = () => {
    this.setState({ visible: true })
    // Modal.prompt("充值", "请输入您要充值的金额", [
    //   { text: "取消" },
    //   { text: "确认", onPress: this.toPay }
    // ])
  };

  render() {
    let { data = {} } = this.props
    const { userFinance = {}, userInfo = {} } = this.props

    const {
      payVisible,
      timeStamp,
      price,
      visible,
      rechargeProducts = []
    } = this.state

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
            <Text style={styles.topLeft}>取消</Text>
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
          <View style={[styles.flex5, { top: -5 }]}>
            <Text style={styles.text}>{userInfo.nick}</Text>
            <Text style={styles.gold}>
              {data.vip
                ? `会员 ${moment(data.endTime).format("YYYY-MM-DD")} 到期`
                : "您还不是会员"}
            </Text>
            <Text style={styles.gold}>
              {data.superVip
                ? `超级商家 ${moment(data.superEndTime).format(
                    "YYYY-MM-DD"
                  )} 到期`
                : "您还不是超级商家"}
            </Text>
          </View>
          <View style={styles.flex3}>
            <Text style={styles.gold}>余额：{data.balance || "0.00"}元</Text>
            {Platform.OS === "ios" ? (
              <Picker data={rechargeProducts} cols={1} onChange={this.recharge}>
                <TouchableOpacity
                  style={styles.vipPay}
                  // onPress={this.inputPrice}
                >
                  <ImageBackground
                    style={styles.vipBg}
                    source={require("./images/btn_recharge_bg.png")}
                  >
                    <Text style={styles.vipText}>立即充值</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </Picker>
            ) : (
              <TouchableOpacity style={styles.vipPay} onPress={this.inputPrice}>
                <ImageBackground
                  style={styles.vipBg}
                  source={require("./images/btn_recharge_bg.png")}
                >
                  <Text style={styles.vipText}>立即充值</Text>
                </ImageBackground>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* <Pay
          onSuccess={this.paySuccess}
          visible={payVisible}
          timeStamp={timeStamp}
          data={payData}
        /> */}
        <Modal
          title="充值"
          visible={visible}
          closable
          maskClosable
          onClose={() => {
            this.setState({ visible: false })
          }}
          // popup
          // animationType="slide-up"
          transparent
        >
          <List style={{ paddingVertical: 10 }}>
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              请输入您要充值的金额
            </Text>
            <InputItem
              type="number"
              onChange={inputNumber => this.setState({ price: inputNumber })}
              placeholder="0.00"
            >
              金额：
            </InputItem>
          </List>
          <Button type="primary" onPress={this.toPay}>
            确认支付
          </Button>
        </Modal>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    height: 220,
    alignItems: "center",
    paddingTop: statusBarHeight + 10,
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
    paddingHorizontal: 10
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
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#FFF"
  },
  title: {
    color: "#F8E3B1",
    fontSize: 22,
    left: 15
  },
  topLeft: {
    color: "#F8E3B1"
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
