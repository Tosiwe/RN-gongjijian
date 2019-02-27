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
import { connect } from "react-redux"
import moment from "moment"

import RNFS from "react-native-fs"
import Pay from "../Pay/Pay"

const use = {
  contact: "获取联系方式",
  paper: "下载图纸",
  attach: "下载附件"
}
@connect()
class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasPaied: false,
      likeType: 0
    }
  }

  componentDidMount() {
    this.setState({ likeType: this.props.data.type })
    const { type } = this.props
    this.props.dispatch({
      type: "app/getPriceList",
      callback: res => {
        if (res.msg === "OK") {
          this.setState({ price: res.result[type] })
        }
      }
    })
  }

  like = () => {
    const { id } = this.props.data
    const { likeType } = this.state
    this.props.dispatch({
      type: "app/saveBookmark",
      payload: { id, type: likeType === 0 ? 1 : 0 },
      callback: res => {
        if (res.msg === "OK") {
          this.setState({ likeType: likeType === 0 ? 1 : 0 })
        }
      }
    })
  };

  onClose = () => {
    this.setState({ visible: false })
  };

  showPayModal = name => {
    const { hasPaied } = this.state
    const { data = {}, type } = this.props

    if (hasPaied) {
      if (name === "phone") {
        Linking.openURL(data.phone ? `tel:${data.phone}` : "tel:10010")
      } else if (name === "download") {
        this.downloadFile(data.url)
      } else {
        this.showModal(data[name], name)
      }
    } else {
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

  paySuccess = () => {
    this.setState({ hasPaied: true })
  };

  requestExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "My App Storage Permission",
          message:
            "My App needs access to your storage " +
            "so you can save your photos"
        }
      )
      return granted
    } catch (err) {
      console.error("Failed to request permission ", err)
      return null
    }
  };

  /* 下载文件 */
  downloadFile(formUrl, type) {
    // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    // 图片
    const downloadDest =  `${RNFS.MainBundlePath ||
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
      progress: res => {
        const pro = res.bytesWritten / res.contentLength

        this.setState({
          progressNum: pro
        })
      }
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
                Toast.info("保存成功")
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
    const { type, data } = this.props
    const { price } = this.state
    const {
      likeType,
      visible,
      ModalTitle,
      content,
      payVisible,
      timeStamp
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
            <Text style={{ textAlign: "center" }}>{content}</Text>
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
                likeType
                  ? require("./images/icon_collection_pressed.png")
                  : require("./images/icon_collection.png")
              }
            />
            <Text style={styles.cText}>收藏</Text>
          </TouchableOpacity>
          {!(type === "contact") && (
            <TouchableOpacity
              onPress={() => {
                this.showPayModal("download")
              }}
              style={[styles.btns, styles.downLoadBtn]}
            >
              <Text style={styles.downText}>下载</Text>
            </TouchableOpacity>
          )}
          {type === "contact" && (
            <TouchableOpacity
              onPress={() => {
                this.showPayModal("phone")
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
                this.showPayModal("wechat")
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
                this.showPayModal("qq")
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
        <View style={{ backgroundColor: "red" }}>
          <Pay
            visible={payVisible}
            timeStamp={timeStamp}
            onSuccess={this.paySuccess}
            data={{
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
