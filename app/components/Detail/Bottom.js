import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Linking,
  CameraRoll,
  PermissionsAndroid
} from "react-native"
import { Modal, Button, Toast } from "@ant-design/react-native"
import * as wechat from "react-native-wechat"
import { connect } from "react-redux"
import moment from "moment"
import RNFS from "react-native-fs"
import Pay from "../Pay/Pay"
// import Result from "../Pay/Result"
const use = {
  contact: "查看联系方式",
  paper: "下载图纸",
  attach: "下载附件",
  charge: "充值"
}

const time = 0
@connect(({ app }) => ({ ...app }))
class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasPaied: false,
      collected: false,
      time: 0
    }
  }

  componentDidMount() {
    const { type } = this.props
    this.state.time = 0
    this.props.dispatch({
      type: "app/getPriceList",
      callback: res => {
        if (res.msg === "OK") {
          this.setState({ price: res.result[type] })
        }
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.time === 0 &&
      nextProps.data.collected !== undefined &&
      this.state.collected !== nextProps.data.collected
    ) {
      this.setState({ collected: nextProps.data.collected })
      this.state.time += 1
    }
  }

  like = () => {
    const { id, type } = this.props.data
    const { collected } = this.state
    const ActionType = collected ? "app/cancelBookmark" : "app/saveBookmark"
    this.props.dispatch({
      type: ActionType,
      payload: { recordId: id, type },
      callback: res => {
        if (res.msg === "OK") {
          this.setState({ collected: !collected })
        }
      }
    })
  };

  onClose = () => {
    this.setState({ visible: false })
  };

  checkPay = () => {};

  checkType = name => {
    const { data = {}, type, userFinance = {} } = this.props
    const isVip = userFinance.vip
    this.state.pressName = name
    // type: contact\paper\attach
    if (type === "paper") {
      // 图纸下载，需扣余额
      this.payByBalance(name)
    } else if (isVip) {
      // vip直接显示
      if (name === "phone") {
        Linking.openURL(data.phone ? `tel:${data.phone}` : "tel:10010")
      } else if (name === "download") {
        this.props.dispatch({
          type: "app/getFileUrl",
          payload: {
            key: data.fileKey
          },
          callback: res => {
            this.downloadFile(res.result.url,data)
            this.props.dispatch({
              type: "app/downloadPaper",
              payload: {
                id: data.id,
                url: data.url,
                title: data.title,
                fileName: data.fileKey
              },
              callback: response => {
                // TODO:下载附件
              }
            })
          }
        })
      } else {
        this.showModal(data[name], name)
      }
    } else {
      // 非vip，需扣余额
      this.payByBalance(name)
    }
  };

  payByBalance = name => {
    const { data, type } = this.props
    // const { price } = this.state
    // const salePrice = data.price || price

    // type: contact\paper\attach

    this.props.dispatch({
      type: "app/orderRecordQuery",
      payload: {
        sourceId: data.id
      },
      callback: res => {
        if (res.result.paid) {
          this.state.hasPaied = true
          this.showPayModal(name)
        } else {
          const map = {
            vip: "app/createVipOrder",
            contact: "app/createOrderContact",
            paper: "app/createOrderPaper",
            attach: "app/createOrderAttach"
          }
          const payload = {
            sourceId: data.id
          }

          this.props.dispatch({
            type: map[type],
            payload,
            callback: response => {
              if (response.status === "OK") {
                this.state.hasPaied = true
                this.showPayModal(name)
              } else if (response.status === "ERROR") {
                Modal.alert("提示", "您的余额不足，直接购买", [
                  {
                    text: "取消"
                  },
                  { text: "确认", onPress: () => this.showPayModal(name) }
                ])
              }
            }
          })
        }
      }
    })
  };

  showPayModal = name => {
    const { hasPaied } = this.state
    const { data = {} } = this.props

    if (hasPaied) {
      if (name === "phone") {
        Linking.openURL(data.phone ? `tel:${data.phone}` : "tel:10010")
      } else if (name === "download") {
        this.props.dispatch({
          type: "app/getFileUrl",
          payload: {
            key: data.fileKey
          },
          callback: res => {
            this.downloadFile(res.result.url,data)

            this.props.dispatch({
              type: "app/downloadPaper",
              payload: {
                id: data.id,
                url: data.url,
                title: data.title,
                fileName: data.fileKey
              },
              callback: response => {
                // TODO:下载附件
              }
            })
          }
        })
        // getFileUrl
      } else {
        this.showModal(data[name], name)
      }
    } else {
      // 调起第三方支付
      this.setState({
        timeStamp: moment().format("x"),
        payVisible: true
      })
    }
  };

  showModal = (content = "123123", title) => {
    const map = {
      download: "下载",
      phone: "电话",
      wechat: "微信",
      qq: "QQ"
    }
    this.setState({
      visible: true,
      ModalTitle: map[title],
      content
    })
  };

  paySuccess = pay => {
    this.state.hasPaied = true
    const { pressName } = this.state
    const { data } = this.props
    // vip直接显示
    if (pressName === "phone") {
      Linking.openURL(data.phone ? `tel:${data.phone}` : "tel:10010")
    } else {
      this.showModal(data[pressName], pressName)
    }
  };

  requestExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "请开启存储权限",
          message: "需要将文件保存到本地哦"
        }
      )
      return granted
    } catch (err) {
      console.error("Failed to request permission ", err)
      return null
    }
  };


  wechatShare=(data)=>{
    wechat.isWXAppInstalled()
    .then((isInstalled) => {
        if (isInstalled) {
          wechat.shareToSession({
                type: 'imageFile',
                title:data.title,
                description: data.desc,
                mediaTagName: 'email signature',
                // thumbImage: 'https://tvax4.sinaimg.cn/crop.0.0.736.736.180/62fc3de5ly8fu6xizfsmhj20kg0kgtbh.jpg',
                imageUrl: data.path,
                // fileExtension:'.jpg'
            })
                .catch((error) => {
                    Toast.info(error.message)
                })
        } else {
            Toast.info('请安装微信')
        }
    }).catch(error=>{
      console.log(error)
    })
  }

  

  share=(da)=>{
    Modal.alert("分享", "将文件分享到微信", [
      {
        text: "取消"
      },
      {
        text: "确认",
        onPress: () =>  this.wechatShare(da)
      }
    ])
  }

  /* 下载文件 */
  downloadFile(formUrl, data) {
    // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    // 图片
    const downloadDest = `${RNFS.MainBundlePath ||
      RNFS.DocumentDirectoryPath}/${Math.random() * 1000}.jpg`
    // const formUrl =
    //   "http://img.kaiyanapp.com/c7b46c492261a7c19fa880802afe93b3.png?imageMogr2/quality/60/format/jpg"

    // 文件
    // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000))}.zip`;
    // const formUrl = 'http://files.cnblogs.com/zhuqil/UIWebViewDemo.zip';

    // 视频
    // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000))}.mp4`;
    // http://gslb.miaopai.com/stream/SnY~bbkqbi2uLEBMXHxGqnNKqyiG9ub8.mp4?vend=miaopai&
    // https://gslb.miaopai.com/stream/BNaEYOL-tEwSrAiYBnPDR03dDlFavoWD.mp4?vend=miaopai&
    // const formUrl = 'https://gslb.miaopai.com/stream/9Q5ADAp2v5NHtQIeQT7t461VkNPxvC2T.mp4?vend=miaopai&';

    // 音频
    // const downloadDest = `${RNFS.MainBundlePath}/${Math.random() * 1000}.mp3`
    // // http://wvoice.spriteapp.cn/voice/2015/0902/55e6fc6e4f7b9.mp3
    // const formUrl =
    //   "http://wvoice.spriteapp.cn/voice/2015/0818/55d2248309b09.mp3"

    const options = {
      fromUrl: formUrl,
      toFile: downloadDest,
      background: true,
      begin: res => {
        console.log("begin", res)
        console.log("contentLength:", res.contentLength / 1024 / 1024, "M")
      },
      // progress: res => {
        // const pro = res.bytesWritten / res.contentLength

        // this.setState({
        //   progressNum: pro
        // })
      // }
    }
    try {
      const ret = RNFS.downloadFile(options)
      ret.promise
        .then(res => {
          console.log("success", res)
          const path = `file://${downloadDest}`

          console.log(path)
          const grand = this.requestExternalStoragePermission()

          if (grand) {
            CameraRoll.saveToCameraRoll(path)
              .then(() => {
                // const da={path,...data}
                // Toast.info("保存成功，请在相册中查看",1,()=>this.share(da),false)
                Toast.info("保存成功，请在相册中查看")
              })
              .catch(e => {
                Toast.info(`保存失败！\n${e}`)
              })
          }
          // 例如保存图片
        })
        .catch(err => {
          console.log("err", err)
        })
    } catch (e) {
      console.log(e)
    }
  }



  render() {
    const { type, data, userFinance = {} } = this.props

    const {
      collected,
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
              style={{ textAlign: "center" }}
            >{`${ModalTitle}:${content}`}</Text>
            {userFinance.vip && (
              <Text style={{ textAlign: "center" }}>
                尊贵的VIP，您可以无限次查看联系方式
              </Text>
            )}
          </View>
          <Button type="primary" onPress={this.onClose}>
            关闭
          </Button>
        </Modal>
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.cBtn} onPress={this.like}>
            <Image
              style={styles.cImg}
              source={
                collected
                  ? require("./images/icon_collection_pressed.png")
                  : require("./images/icon_collection.png")
              }
            />
            <Text style={styles.cText}>收藏</Text>
          </TouchableOpacity>
          {!(type === "contact") && (
            <TouchableOpacity
              onPress={() => {
                this.checkType("download")
              }}
              style={[styles.btns, styles.downLoadBtn]}
            >
              <Text style={styles.downText}>下载</Text>
            </TouchableOpacity>
          )}
          {type === "contact" && (
            <TouchableOpacity
              onPress={() => {
                this.checkType("phone")
              }}
              style={styles.btns}
            >
              <Image
                style={styles.img}
                source={require("./images/icon_phone.png")}
              />
              <Text>电话</Text>
            </TouchableOpacity>
          )}
          {type === "contact" && (
            <TouchableOpacity
              onPress={() => {
                this.checkType("wechat")
              }}
              style={styles.btns}
            >
              <Image
                style={styles.img}
                source={require("./images/icon_wechat.png")}
              />
              <Text>微信</Text>
            </TouchableOpacity>
          )}
          {type === "contact" && (
            <TouchableOpacity
              onPress={() => {
                this.checkType("qq")
              }}
              style={styles.btns}
            >
              <Image
                style={styles.img}
                source={require("./images/icon_qq.png")}
              />
              <Text>QQ</Text>
            </TouchableOpacity>
          )}
        </View>
        <View>
          <Pay
            visible={payVisible}
            timeStamp={timeStamp}
            onSuccess={this.paySuccess}
            data={{
              id: data.id,
              use: use[type],
              name: data.title,
              price: data.price || price,
              type
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

export default Detail
