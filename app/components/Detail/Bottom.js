import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Linking
} from "react-native"

import { connect } from "react-redux"

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
    const { data } = this.props
    if (hasPaied) {
      if (name === "phone") {
        Linking.openURL(data.phone || "tel:10010")
      } else {
        const url = "mqqwpa://im/chat?chat_type=wpa&uin=416793829" // 调用QQ
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url)
          }
        })
      }
    }
  };

  render() {
    const { isPaper = true } = this.props
    const { likeType } = this.state
    return (
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
              this.onServer("download")
            }}
            style={[styles.btns, styles.downLoadBtn]}
          >
            <Text style={styles.downText}>下载</Text>
          </TouchableOpacity>
        )}
        {!isPaper && (
          <TouchableOpacity
            onPress={() => {
              this.onServer("phone")
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
              this.onServer("wechat")
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
              this.onServer("qq")
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
