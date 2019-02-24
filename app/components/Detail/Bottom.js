import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Linking
} from "react-native"
import { Modal, Button } from "@ant-design/react-native"
import { connect } from "react-redux"
import moment from "moment"
import Pay from "../Pay/Pay"

@connect()
class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasPaied: true,
      likeType: props.likeType || 0
    }
  }

  like = () => {
    const { recordId } = this.props.data
    const { likeType } = this.state
    this.props.dispatch({
      type: "app/saveBookmark",
      payload: { recordId, type: likeType === 0 ? 1 : 0 },
      callback: res => {
        if (res.msg === "OK") {
          this.setState({ likeType: likeType === 0 ? 1 : 0 })
        }
      }
    })
  };

  onServer = name => {
    const { hasPaied } = this.state
    const { data = {} } = this.props
    if (hasPaied) {
      if (name === "phone") {
        Linking.openURL(data.phone || "tel:10010")
      } else {
        this.showModal(data[name], name)
      }
    }
  };

  onClose = () => {
    this.setState({ visible: false })
  };

  showPayModal = () => {
    this.setState({
      payVisible: true
    })
  };

  payCLose = () => {
    this.setState({})
  };

  // showModal = (content = "123123", title) => {
  //   const map = {
  //     download: "下载",
  //     phone: "电话",
  //     wechat: "微信",
  //     qq: "QQ"
  //   }
  //   this.setState({
  //     visible: true,
  //     ModalTitle: map[title],
  //     content
  //   })
  // };

  render() {
    const { isPaper ,data} = this.props
    const { likeType, visible, ModalTitle, content, payVisible } = this.state
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
          <TouchableOpacity style={styles.cBtn} opPress={this.like}>
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
          {isPaper && (
            <TouchableOpacity
              onPress={() => {
                this.showPayModal("download")
              }}
              style={[styles.btns, styles.downLoadBtn]}
            >
              <Text style={styles.downText}>下载</Text>
            </TouchableOpacity>
          )}
          {!isPaper && (
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
          {!isPaper && (
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
          {!isPaper && (
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
            timeStamp={moment().format("x")}
            onSuccess={this.paySuccess}
            data={{
              use:"获取联系方式",
              name:data.title,
              price:"2.00",
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
    height: 80,
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
