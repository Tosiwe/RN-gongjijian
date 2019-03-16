/* eslint-disable no-unused-expressions */
import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Linking,
  Clipboard,
  Platform,
  BackHandler
} from "react-native"
import { Modal, Button, Toast } from "@ant-design/react-native"
import * as wechat from "react-native-wechat"
import { connect } from "react-redux"
import moment from "moment"
import Pay from "../Pay/Pay"
import LikeBtn from "./LikeBtn"

@connect(({ app }) => ({ ...app }))
class Bottom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contactType: "phone"
    }
  }

  componentWillMount() {
    if (Platform.OS === "android") {
      this.listener = BackHandler.addEventListener(
        "hardwareBackPress",
        this.onBackAndroid,
        true
      )
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: "app/getPriceList",
      callback: res => {
        if (res.msg === "OK") {
          this.setState({ price: res.result.contact })
        }
      }
    })
  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      this.listener.remove("hardwareBackPress")
    }
  }

  onBackAndroid = () => {
    const { visible } = this.state
    if (visible) {
      this.onClose()
      return true
    }
    return false
  };

  onClose = () => {
    this.setState({ visible: false })
  };

  checkPay = type => {
    this.state.contactType = type
    // 自己发布的
    const { data, userFinance = {} } = this.props
    if (data.userId === userFinance.id) {
      this.showModal()
    } else {
      this.payByBalance()
    }
  };

  // 创建订单-即扣余额
  payByBalance = () => {
    const { data } = this.props

    const payload = {
      sourceId: data.id
    }

    this.props.dispatch({
      type: "app/createOrderContact",
      payload,
      callback: response => {
        if (response.status === "OK") {
          this.showModal()
        } else if (response.status === "ERROR") {
          if (response.errorCode === '12000') {
            Modal.alert("提示", "您的余额不足，直接购买", [
              {
                text: "取消"
              },
              { text: "确认", onPress: () => this.showPayModal() }
            ])
          }
        }
      }
    })
  };

  // 调起支付
  showPayModal = () => {
    this.setState({
      timeStamp: moment().format("x"),
      payVisible: true
    })
  };

  // 业务功能
  showModal = () => {
    const { data = {} } = this.props
    const { contactType } = this.state
    const map = {
      wechat: "微信",
      qq: "QQ"
    }
    if (contactType === "phone") {
      Linking.openURL(data.phone ? `tel:${data.phone}` : "tel:10010")
    } else {
      this.setState({
        visible: true,
        ModalTitle: map[contactType],
        content: data[contactType]
      })
    }
  };

  wechatShare = (data, type) => {
    if (type === "img") {
      wechat
        .isWXAppInstalled()
        .then(isInstalled => {
          if (isInstalled) {
            wechat
              .shareToSession({
                type: "imageFile",
                title: data.title,
                description: data.desc,
                mediaTagName: "图纸",
                // thumbImage: 'https://tvax4.sinaimg.cn/crop.0.0.736.736.180/62fc3de5ly8fu6xizfsmhj20kg0kgtbh.jpg',
                imageUrl: data.path
                // fileExtension:'.jpg'
              })
              .catch(error => {
                // Toast.info(error.message)
              })
          } else {
            Toast.info("请安装微信")
          }
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      wechat
        .isWXAppInstalled()
        .then(isInstalled => {
          if (isInstalled) {
            wechat
              .shareToSession({
                type: "text",
                description: data.path
              })
              .catch(error => {
                // Toast.info(error.message)
              })
          } else {
            Toast.info("请安装微信")
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  };

  share = (da, type) => {
    if (type === "img") {
      Modal.alert("分享", "将文件分享到微信", [
        {
          text: "取消"
        },
        {
          text: "去分享",
          onPress: () => this.wechatShare(da, type)
        }
      ])
    } else {
      Modal.alert("分享链接到微信", da.path, [
        {
          text: "取消"
        },
        {
          text: "去分享",
          onPress: () => this.wechatShare(da, type)
        }
      ])
    }
  };

  copy = txt => {
    Clipboard.setString(txt)
    Toast.info("复制成功", 1, null, false)
  };

  render() {
    const { data } = this.props

    const {
      visible,
      ModalTitle,
      content,
      payVisible,
      timeStamp,
      price
    } = this.state

    return (
      <View>
        <Modal
          title={ModalTitle}
          transparent
          onClose={this.onClose}
          maskClosable
          visible={visible}
          closable
        >
          <View style={{ paddingVertical: 20 }}>
            <Text
              onLongPress={() => this.copy(content)}
              style={{
                textAlign: "center",
                color: "#000",
                fontSize: 16,
                marginVertical: 10
              }}
            >
              {content}
            </Text>
            <Text style={{ textAlign: "center", marginTop: 10 }}>长按复制</Text>
          </View>
          <Button type="primary" onPress={this.onClose}>
            关闭
          </Button>
        </Modal>
        <View style={styles.bottom}>
          <LikeBtn data={data} likeType="1" />
          <TouchableOpacity
            onPress={() => {
              this.checkPay("phone")
            }}
            style={styles.btns}
          >
            <Image
              style={styles.img}
              source={require("./images/icon_phone.png")}
            />
            <Text>电话</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.checkPay("wechat")
            }}
            style={styles.btns}
          >
            <Image
              style={styles.img}
              source={require("./images/icon_wechat.png")}
            />
            <Text>微信</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.checkPay("qq")
            }}
            style={styles.btns}
          >
            <Image
              style={styles.img}
              source={require("./images/icon_qq.png")}
            />
            <Text>QQ</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Pay
            visible={payVisible}
            timeStamp={timeStamp}
            onSuccess={this.showModal}
            data={{
              id: data.id,
              use: "查看联系方式",
              name: data.title,
              price,
              type: "contact"
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bottom: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    position: "absolute",
    bottom: 0,
    height: 70,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "flex-start",
    backgroundColor: "#fff"
  },
  img: {
    width: 30,
    height: 30
  },
  cText: {
    color: "#727272",
    fontSize: 12
  },
  cBtn: {
    alignItems: "center",
    height: 60,
    justifyContent: "center"
  },
  cImg: {
    width: 20
  },
  btns: {
    height: 60,
    flexDirection: "row",
    alignItems: "center"
  },
  downLoadBtn: {
    marginTop: 10,
    backgroundColor: "#FF7720",
    width: "60%",
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  downText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 18
  }
})

export default Bottom
