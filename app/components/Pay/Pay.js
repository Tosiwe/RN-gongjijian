import React, { Component } from "react"
import {
  // Platform,
  StyleSheet,
  Text,
  View
} from "react-native"
import Alipay from "react-native-yunpeng-alipay"
import {
  Modal,
  Button,
  WhiteSpace,
  Radio,
  Toast
} from "@ant-design/react-native"
import { connect } from "react-redux"

const { RadioItem } = Radio
@connect()
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

  onClose = () => {
    this.setState({ visible: false })
  };

  aliPay = () => {
    const { data = {} } = this.props

    return new Promise(resole => {
      this.props.dispatch({
        type: "app/creatRechargeOrder",
        payload: {
          amount: Number(data.price)
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
          if (res.code === 10000) {
            this.createOrder()
          } else {
            Toast.info(`error code:${res.code}`)
          }
        },
        err => {
          console.log(err)
          Toast.info("付款出错了")
        //   this.createOrder()

        }
      )
    })
  };

  createOrder = () => {
    const { data } = this.props
    const map = {
      vip: "app/createVipOrder",
      contact: "app/createOrderContact",
      paper: "app/createOrderPaper",
      attach: "app/createOrderAttach"
    }
    const payload = {}

    if (data.type === "vip") payload.type = data.vip

    this.props.dispatch({
        type: map[data.type],
        payload,
        // payload: {
        //   sourceId: data.classifyId
        // },
        callback: response => {
          if (response.msg === "OK") {
            Toast.success("下单成功")
           // eslint-disable-next-line no-unused-expressions
           this.props.onSuccess && this.props.onSuccess()
           this.setState({visible:false})
          }
        }
      })

    // return new Promise(resole => {
    //   this.props.dispatch({
    //     type: "app/queryOrder",
    //     payload: {
    //       id: this.state.orderId
    //     },
    //     callback: res => {
    //       if (res.msg === "OK") {
    //         resole(res.result)
    //       }
    //     }
    //   })
    // }).then(result => {
    //   if (
    //     result.tradeStatus === "TRADE_SUCCESS" ||
    //     result.tradeStatus === "TRADE_FINISHED"
    //   ) {
    //     // Toast.success("付款成功")

    //     this.props.dispatch({
    //       type: map[data.type],
    //       payload,
    //       callback: response => {
    //         if (response.msg === "OK") {
    //           // eslint-disable-next-line no-unused-expressions
    //           this.props.onSuccess && this.props.onSuccess()
    //           this.setState({ visible: false })
    //         }
    //       }
    //     })
    //   } else {
    //     Toast.success("付款出错了")
    //   }
    // })
};

  pay = () => {
    const { payType } = this.state
    if (payType === "alipay") {
      this.aliPay()
    } else {
      Toast.info("正在施工...")
      //   this.wechatPay()
    }
  };

  render() {
    const { payType, visible } = this.state
    const { data = {} } = this.props
    return (
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
              checked={payType === "wechatPay"}
              onChange={event => {
                if (event.target.checked) {
                  this.setState({ payType: "wechatPay" })
                }
              }}
            >
              微信支付
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
              支付宝支付
            </RadioItem>

            <WhiteSpace />
          </View>
        </View>
        <Button type="primary" onPress={this.pay}>
          确认支付
        </Button>
      </Modal>

      // <View style={styles.container}>
      //     <TouchableOpacity onPress={this.aliPay}>
      //         <View style={styles.btn}>
      //             <Text style={styles.text}>支付宝支付</Text>
      //         </View>
      //     </TouchableOpacity>
      // </View>
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
  }
})
