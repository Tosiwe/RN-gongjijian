/* eslint-disable no-unused-expressions */
import React, { Component } from "react"
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  CameraRoll,
  PermissionsAndroid,
  Clipboard,
  Platform
} from "react-native"
import { Modal, Toast } from "@ant-design/react-native"
import * as wechat from "react-native-wechat"
import { connect } from "react-redux"
import moment from "moment"
import RNFS from "react-native-fs"
import Icon from "react-native-vector-icons/AntDesign"
import FileOpener from "react-native-file-opener"
import Pay from "../Pay/Pay"
import LikeBtn from "./LikeBtn"

@connect(({ app }) => ({ ...app }))
class PaperBottom extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  // 检查是否已购买
  checkPay = () => {
    const { data, onRefresh } = this.props
    onRefresh(true)

    this.props.dispatch({
      type: "app/orderRecordQuery",
      payload: {
        sourceId: data.id
      },
      callback: res => {
        if (res.result.paid) {
          // 已购买
          this.getFile()
        } else {
          // 未购买
          this.payByBalance()
        }
      }
    })
  };

  // 创建图纸订单-即余额支付
  payByBalance = () => {
    const { data, onRefresh } = this.props

    const payload = {
      sourceId: data.id
    }
    this.props.dispatch({
      type: "app/createOrderPaper",
      payload,
      callback: response => {
        if (response.status === "OK") {
          // 余额足够
          this.getFile()
        } else if (response.status === "ERROR") {
          onRefresh(false)
          // 余额不够
          Modal.alert("提示", "您的余额不足，直接购买", [
            {
              text: "取消"
            },
            { text: "确认", onPress: this.showPayModal }
          ])
        }
      }
    })
  };

  // 请求文件
  getFile = () => {
    const { data = {}, onProgress, onRefresh } = this.props
    onRefresh(true)
    this.props.dispatch({
      type: "app/getFileUrl",
      payload: {
        key: data.fileKey
      },
      callback: resdata => {
        this.downloadFile(resdata.result, data).then(res => {
          if (res) {
            onProgress(100)
            this.state.shareData = res
            this.props.dispatch({
              type: "app/downloadPaper",
              payload: {
                id: data.id,
                url: data.url,
                title: data.title,
                fileName: data.fileKey
              },
              callback: response => {
                console.log(response)
                onRefresh(false)
                const msg =
                  res.type === "img"
                    ? "下载成功，请在相册中查看"
                    : "下载成功，请在本地文件中查看"
                Toast.success(msg, 3, () => onProgress(0), false)
              }
            })
          }
        })
      }
    })
  };

  // 调支付组件
  showPayModal = () => {
    this.setState({
      timeStamp: moment().format("x"),
      payVisible: true
    })
  };

  // 权限请求
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

  // 微信分享
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
                Toast.info(error.message)
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
                Toast.info(error.message)
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

  // 分享modal
  share = () => {
    const { shareData  } = this.state
    if (shareData) {
      Modal.operation([
        // {
        //   text: "打开文件夹",
        //   onPress: this.openFile
        // },
        {
          text: "分享到微信",
          onPress: this.wechatShare(shareData.data, shareData.type)
        }
      ])

      // if (shareData.type==='img') {
      //   Modal.alert("分享", "将文件分享到微信", [
      //     {
      //       text: "取消"
      //     },
      //     {
      //       text: "去分享",
      //       onPress: () => this.wechatShare(shareData.data, shareData.type)
      //     }
      //   ])
      // } else {
      //   Modal.alert("分享链接到微信", shareData.data.path, [
      //     {
      //       text: "取消"
      //     },
      //     {
      //       text: "去分享",
      //       onPress: () => this.wechatShare(shareData.data, shareData.type)
      //     }
      //   ])
      // }
    } else {
      Toast.info("先下载文件才能分享哦", 2, null, false)
    }
  };

  // 复制
  copy = txt => {
    Clipboard.setString(txt)
    Toast.info("复制成功", 2, null, false)
  };

  // 打开文件
  openFile = () => {
    const SavePath =
      Platform.OS === "ios"
        ? RNFS.DocumentDirectoryPath
        : RNFS.ExternalDirectoryPath
    const sampleDocFilePath = `${SavePath}/123.2627707192897.dwg`
    FileOpener.open(sampleDocFilePath, "application/msword").then(
      () => {
        console.log("success!!")
      },
      e => {
        console.log("error!!")
      }
    )
  };

  // 下载文件
  downloadFile(response, data) {
    return new Promise((resolve, reject) => {
      const formUrl = response.url
      const key = data.fileKey
      const arr = key.split(".")
      const FileMimeType = arr[arr.length - 1]
      const isPic = FileMimeType === "jpg" || FileMimeType === "png"

      // TODO:
      // if(!isPic){

      // }
      const { onProgress } = this.props
      // onRefresh(true)
      // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      console.log(`MainBundlePath=${RNFS.MainBundlePath}`)
      console.log(`CachesDirectoryPath=${RNFS.CachesDirectoryPath}`)
      console.log(`DocumentDirectoryPath=${RNFS.DocumentDirectoryPath}`)
      console.log(`TemporaryDirectoryPath=${RNFS.TemporaryDirectoryPath}`)
      console.log(`LibraryDirectoryPath=${RNFS.LibraryDirectoryPath}`)
      console.log(`ExternalDirectoryPath=${RNFS.ExternalDirectoryPath}`)
      console.log(
        `ExternalStorageDirectoryPath=${RNFS.ExternalStorageDirectoryPath}`
      )

      const downloadDest = isPic
        ? `${RNFS.MainBundlePath || RNFS.ExternalDirectoryPath}/${
            data.title
          }_${key}.${FileMimeType}`
        : `${RNFS.MainBundlePath || RNFS.ExternalDirectoryPath}/${
            data.title
          }_${key}.${FileMimeType}`

      const options = {
        fromUrl: formUrl,
        toFile: downloadDest,
        background: true,
        progress: res => {
          onProgress((res.bytesWritten * 100) / res.contentLength)
          // onRefresh(true,res)
          console.log("progress", (res.bytesWritten * 100) / res.contentLength)
        },
        begin: res => {
          console.log("begin", res)
          console.log("contentLength:", res.contentLength / 1024 / 1024, "M")
        }
      }
      try {
        const ret = RNFS.downloadFile(options)
        ret.promise
          .then(res => {
            const path = `file://${downloadDest}`
            console.log("success", res)
            console.log(path)
            const grand = this.requestExternalStoragePermission()
            if (grand) {
              if (isPic) {
                CameraRoll.saveToCameraRoll(path)
                  .then(() => {
                    const da = { path, ...data }
                    resolve({ data: da, type: "img" })
                  })
                  .catch(e => {
                    resolve()
                  })
              } else {
                const da = { path: formUrl, ...data }
                resolve({ data: da, type: "file" })
              }
            }
          })
          .catch(err => {
            console.log("err", err)
            resolve()
          })
      } catch (e) {
        console.log(e)
      }
    })
  }

  render() {
    const { data } = this.props

    const { payVisible, timeStamp } = this.state

    return (
      <View>
        <View style={styles.bottom}>
          <LikeBtn data={data} likeType="2" />
          <TouchableOpacity
            onPress={this.checkPay}
            style={[styles.btns, styles.downLoadBtn]}
          >
            <Text style={styles.downText}>下载</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.share}>
            <Icon name="sharealt" color="#ccc" size={28} />
          </TouchableOpacity>
        </View>
        <View>
          <Pay
            visible={payVisible}
            timeStamp={timeStamp}
            onSuccess={this.getFile}
            data={{
              id: data.id,
              use: "下载图纸",
              name: data.title,
              price: data.price,
              type: "paper"
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
    alignItems: "center",
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
    // marginTop: 10,
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

export default PaperBottom
