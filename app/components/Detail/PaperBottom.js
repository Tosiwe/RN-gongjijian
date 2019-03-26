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
import { Storage } from "../../utils"

@connect(({ app }) => ({ ...app }))
class PaperBottom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paid: false
    }
  }

  componentDidMount() {
    const { data } = this.props
    this.props.dispatch({
      type: "app/orderRecordQuery",
      payload: {
        sourceId: data.id
      },
      callback: res => {
        if (res.result && res.result.paid) {
          this.setState({ paid: true })
        }
      }
    })
  }

  // 下载按钮处理
  handleDownload = () => {
    const { paid } = this.state
    if (paid) {
      this.openFile()
    } else {
      this.payByBalance()
    }
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
          if (response.errorCode === '12000') {
            // 余额不够
            Modal.alert("提示", "您的余额不足，直接购买", [
              {
                text: "取消"
              },
              { text: "确认", onPress: this.showPayModal }
            ])
          }
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
            this.props.dispatch({
              type: "app/downloadPaper",
              payload: {
                id: data.id,
                url: data.url,
                title: data.title,
                fileName: data.fileKey
              },
              callback: response => {
                Storage.get("files").then(files => {
                  const newFiles = { ...JSON.parse(files) }
                  newFiles[data.id] = {
                    fromUrl: res.data.fromUrl,
                    path: res.data.path
                  }
                  Storage.set("files", JSON.stringify(newFiles))
                })
                // Storage.set("auth", res.result.token)

                console.log(response)
                onRefresh(false)
                const msg =
                  res.type === "img"
                    ? "下载成功，请在相册中查看"
                    : "下载成功，请在本地文件中查看"
                Toast.success(
                  msg,
                  3,
                  () => {
                    this.setState({ paid: true })
                    onProgress(0)
                  },
                  false
                )
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
  wechatShare = (file,shareType) => {
    const arrType = file.path.split(".")
    const arrName = file.path.split("/")
    const type = arrType[arrType.length - 1]
    const name = arrName[arrName.length - 1]

    if(shareType==="text"){
      wechat
      .isWXAppInstalled()
      .then(isInstalled => {
        if (isInstalled) {
          wechat
            .shareToSession({
              type: "text",
              description: file.fromUrl
            })
            .catch(error => {
              // Toast.info(error.message)
            })
        } else {
          Toast.info("请安装微信", 3, null, false)
        }
      })
      .catch(error => {
        console.log(error)
      })
      return
    }

    if (type === "jpg" || type === "png") {
      wechat
        .isWXAppInstalled()
        .then(isInstalled => {
          if (isInstalled) {
            wechat
              .shareToSession({
                type: "imageFile",
                title: name,
                description: "图纸下载",
                mediaTagName: "图纸",
                imageUrl: `file://${file.path}`
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            Toast.info("请安装微信", 3, null, false)
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
              type: "file",
              title: name,
              description: "图纸下载",
              mediaTagName: "图纸",
              filePath: file.path,
              fileExtension:type
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          Toast.info("请安装微信", 3, null, false)
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
  };

  // 读取缓存
  readStorage = () =>
    new Promise(resolve => {
      const { data } = this.props
      Storage.get("files").then(response => {
        const files = JSON.parse(response)
        if (files && files[data.id]) {
          const file = files[data.id]
          resolve(file)
        } else {
          Toast.info("文件找不到了，将重新下载", 3, this.getFile, false)
          this.setState({ paid: false })
          resolve()
        }
      })
    });

  // 分享modal
  share = () => {
    const { paid } = this.state
    if (paid) {
      this.readStorage().then(file => {
        if (file) {
          Modal.operation([
            {
              text: "分享文件到微信",
              onPress: () => this.wechatShare(file,'file')
            },
            {
              text: "分享下载链接到微信",
              onPress: () => this.wechatShare(file,'text')
            },
          
          ])
        }
      })
    } else {
      // 未购买
      Toast.info("先下载文件才能分享哦", 3, null, false)
    }
  };

  // 复制
  copy = txt => {
    Clipboard.setString(txt)
    Toast.info("复制成功", 3, null, false)
  };

  // 打开文件
  openFile = () => {
    this.readStorage().then(res => {
      if (!res) {
        return
      }
      const filePath = res.path
      const arrType = filePath.split(".")
      const type = arrType[arrType.length - 1]

      const mime = {
        dwg: "application/x-dwg",
        dxf: "application/x-dxf",
        dwf: "application/x-dwf",
        pdf: "application/pdf"
      }

      const sampleDocFilePath = filePath
      FileOpener.open(`${sampleDocFilePath}`, mime[type]).then(
        () => {
          console.log("success!!")
        },
        e => {
          Toast.info("文件找不到了，将重新下载", 3, this.getFile, false)
          this.setState({ paid: false })
        }
      )
    })
  };

  // 下载文件
  downloadFile(response, data) {
    return new Promise(resolve => {
      const fromUrl = response.url
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

      const SavePath = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.ExternalDirectoryPath

      const downloadDest = isPic
        ? `${SavePath}/${data.title}_${
            data.id
          }.${FileMimeType}`
        : `${SavePath}/${data.title}_${
            data.id
          }.${FileMimeType}`

      const options = {
        fromUrl,
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
            let grand = true
            if(Platform.OS==="android"){
               grand =  this.requestExternalStoragePermission()
            }
          debugger
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
                const da = { fromUrl, path: downloadDest, ...data }
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

    const { payVisible, timeStamp, paid } = this.state

    return (
      <View>
        <View style={styles.bottom}>
          <LikeBtn data={data} likeType="2" />
          <TouchableOpacity
            onPress={this.handleDownload}
            style={[styles.btns, styles.downLoadBtn]}
          >
            <Text style={styles.downText}>{paid ? "打开" : "下载"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.share}>
            <Icon name="sharealt" color="#ccc" size={24} />
            <Text style={{ color: "#727272", fontSize: 12 }}>分享</Text>
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
