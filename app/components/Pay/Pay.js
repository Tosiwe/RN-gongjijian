import React, { Component } from "react"
import {
  // Platform,
  StyleSheet,
  Text,
  View,
  Image
} from "react-native"
import Alipay from "react-native-yunpeng-alipay"
import * as wechat from "react-native-wechat"

import {
  Modal,
  Button,
  WhiteSpace,
  Radio,
  Toast
} from "@ant-design/react-native"

import { connect } from "react-redux"
import Result from "./Result"

const { RadioItem } = Radio
@connect(({ app }) => ({ ...app }))
export default class App extends Component {
  constructor() {
    super()
    this.state = {
      payType: "alipay",
      visible: false,
      timeStamp: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    const { visible, timeStamp } = this.state
    if (visible !== nextProps.visible && timeStamp !== nextProps.timeStamp) {
      this.setState({
        visible: nextProps.visible,
        timeStamp: nextProps.timeStamp
      })
    }
  }

  // 关闭付款弹窗
  onClose = () => {
    this.setState({ visible: false })
  };

  // 支付宝支付
  aliPay = () => {
    const { data = {} } = this.props

    return new Promise(resole => {
      this.props.dispatch({
        type: "app/creatRechargeOrder",
        payload: {
          amount: Number(data.price),
          type: 0 // 0 支付宝
        },
        callback: res => {
          if (res.msg === "OK") {
            this.state.orderId = res.result.id
            resole(res.result.data)
          }
        }
      })
    }).then(params => {
      Alipay.pay(params).then(
        res => {
          // if (res.code === 10000) {
          if (data.type === "charge") {
            const { orderId } = this.state
            const resultData = { orderId, ...data }
            this.setState({
              visible: false,
              resultVisible: true,
              resultData,
              resultCode: Math.random()
            })
          } else {
            this.createOrder()
          }
        },
        err => {
          console.log(err)
          Toast.info("付款出错了")
          // this.createOrder()
        }
      )
    })
  };

  // 创建业务订单
  createOrder = () => {
    const { data } = this.props
    const map = {
      vip: "app/createVipOrder",
      superVip: "app/createSuperVipOrder",
      contact: "app/createOrderContact",
      paper: "app/createOrderPaper",
    }
    const textMap = {
      vip: "会员",
      superVip: "超级商家",
      contact: "联系方式",
      paper: "图纸",
    }

    const payload = {  }

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
          const resultData = { orderId: response.result.id, ...data }
          this.setState({
            visible: false,
            resultVisible: true,
            resultData,
            resultCode: Math.random()
          })
        } else if (response.status === "ERROR") {
          Toast.info(`创建${textMap[data.type]}订单失败`)
        }
      }
    })
  };

  // 微信支付
  wechatPay = () => {
    const { data = {} } = this.props

    return new Promise(resole => {
      this.props.dispatch({
        type: "app/creatRechargeOrder",
        payload: {
          amount: Number(data.price),
          type: 1 // 1 微信
        },
        callback: res => {
          if (res.msg === "OK") {
            this.state.orderId = res.result.id
            resole(res.result.data)
          }
        }
      })
    }).then(params => {
      wechat.pay(params).then(
        res => {
          if (data.type === "charge") {
            const { orderId } = this.state
            const resultData = { orderId, ...data }
            this.setState({
              visible: false,
              resultVisible: true,
              resultData,
              resultCode: Math.random()
            })
          } else {
            this.createOrder()
          }
        },
        err => {
          console.log(err)
          // alert()
          alert(`付款出错了，erroeCode：${err.code}`)
          // this.createOrder()
        }
      )
    })
  };

  // 结果弹窗确认
  onOK = () => {
    const { data } = this.props
    // eslint-disable-next-line no-unused-expressions
    this.props.onSuccess && this.props.onSuccess(data)
  };

  // 选择支付方式
  pay = () => {
    const { payType } = this.state
    if (payType === "alipay") {
      this.aliPay()
    } else {
      this.wechatPay()
    }
  };

  render() {
    const {
      payType,
      visible,
      resultVisible,
      resultData,
      resultCode
    } = this.state
    const { data = {} } = this.props
    return (
      <View>
        <Result
          visible={resultVisible}
          onOK={this.onOK}
          data={resultData}
          timeStamp={resultCode}
        />
        <Modal
          title={data.name || "请付款"}
          transparent
          visible={visible}
          onClose={this.onClose}
          style={styles.modal}
          maskClosable
          closable
          popup
          animationType="slide-up"
        >
          <View style={{ paddingVertical: 100 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Text fontSize={16}>{data.use || "获取联系方式"}</Text>
              <Text fontSize={16}>
                {data.price ? `${data.price}元` : "2.00元"}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  marginVertical: 20,
                  color: "#000",
                  fontSize: 20
                }}
              >
                {data.price ? `${data.price}元` : "2.00元"}
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <RadioItem
                // thumb={
                // <Image
                //   style={{ width: 40, height: 40 }}
                //   source={require("./img/wechat.png")}
                // />
                // <Text  >123</Text>
                // }
                checked={payType === "wechatPay"}
                onChange={event => {
                  if (event.target.checked) {
                    this.setState({ payType: "wechatPay" })
                  }
                }}
              >
                <View style={styles.row}>
                  <Image
                    style={styles.icon}
                    source={require("./img/wechat.png")}
                  />
                  <Text>微信支付</Text>
                </View>
              </RadioItem>
              <WhiteSpace />
              <RadioItem
                checked={payType === "alipay"}
                onChange={event => {
                  if (event.target.checked) {
                    this.setState({ payType: "alipay" })
                  }
                }}
              >
                <View style={styles.row}>
                  <Image
                    style={styles.icon}
                    source={require("./img/alipay.png")}
                  />
                  <Text>支付宝支付</Text>
                </View>
              </RadioItem>

              <WhiteSpace />
            </View>
          </View>
          <Button type="primary" onPress={this.pay}>
            确认支付
          </Button>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    // top:100,
  },
  patText: {
    textAlign: "center",
    fontSize: 20
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  }
})
