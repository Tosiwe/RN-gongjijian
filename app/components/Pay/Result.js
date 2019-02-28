/* eslint-disable no-unused-expressions */
/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, StyleSheet, Text, Image } from "react-native"
import { NavigationActions } from "react-navigation"

import { connect } from "react-redux"
import moment from "moment"
import { Button, Modal } from "@ant-design/react-native"

@connect(({ app }) => ({ ...app }))
class Result extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: []
    }
  }

  componentDidMount() {
    const { data={} } = this.props

    const {
      use = "查看联系方式",
      price = 0.01,
      timeStamp,
      orderId = "123"
    } = data
    this.setState({
      list: [
        {
          label: "支付项目",
          text: use
        },
        {
          label: "支付金额",
          text: `¥${price}元`
        },
        {
          label: "支付时间",
          text: moment(timeStamp).format("YYYY-MM-DD HH:mm:ss")
        },
        {
          label: "订单号",
          text: orderId
        }
      ]
    })
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
    const { onOK } = this.props
    onOK && onOK()
    this.setState({ visible: false })
  };

  render() {
    const { list, visible } = this.state
    return (
      <Modal style={{height:"80%"}} visible={visible} transparent onClose={this.onClose} maskClosable>
        <View style={styles.wrap}>
          <View style={styles.bg}>
            <Image
              resizeMode="contain"
              style={styles.logo}
              source={require("./img/img_paysuccess.png")}
            />
            <Text style={{ color: "#FFF", fontSize: 16, marginTop: 20 }}>
              支付成功
            </Text>
          </View>
          <View />
          <View style={{ marginVertical: 30 }}>
            {list.map(item => (
              <View style={styles.row}>
                <Text style={styles.label}>{item.label}</Text>
                <Text
                  style={[
                    styles.text,
                    item.label === "支付金额" && styles.price
                  ]}
                >
                  {item.text}
                </Text>
              </View>
            ))}
          </View>
          <Button style={styles.btn} onPress={this.onClose}>
            <Text style={{ color: "#FFF" }}>完成支付</Text>
          </Button>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    textAlign: "center",
  },
  logo: {
    width: 150
  },
  bg: {
    height: 200,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF501E"
  },
  row: {
    height: 40,
    lineHeight: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  label: {
    height: 40,
    paddingLeft: 10,
    lineHeight: 40,
    width: 80,
    textAlign: "left",
    color: "#737373"
  },
  text: {
    width: 150,
    textAlign: "right",
    height: 40,
    lineHeight: 40,
    color: "#000"
  },
  price: {
    fontSize: 16,
    color: "#FF501E"
  },
  btn: {
    width: "80%",
    backgroundColor: "#FE7B3E",
    borderRadius: 25
  }
})
export default Result
