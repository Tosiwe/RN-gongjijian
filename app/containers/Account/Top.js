/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native"
import Icon from "react-native-vector-icons/AntDesign"
import { iconSize, screenWidth } from "../../styles/common"

const iconColor = "#FFF"
class Top extends Component {
  render() {
    return (
      <ImageBackground
        style={styles.wrap}
        source={{
          uri:
            "https://wx2.sinaimg.cn/mw1024/ad38de43ly1fpewixt9zoj21cs0qndti.jpg"
        }}
      >
        <View style={styles.head}>
          <TouchableOpacity onPress={this.onPress}>
            <Icon
              name="setting"
              size={iconSize}
              color={iconColor}
              style={{ width: 100 }}
            />
          </TouchableOpacity>
          <Text style={styles.text}>username</Text>
          <View
            style={{
              flexDirection: "row",
              width: 100,
              justifyContent: "flex-end"
            }}
          >
            <TouchableOpacity>
              <Icon
                name="customerservice"
                size={iconSize}
                color={iconColor}
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="message1" size={iconSize} color={iconColor} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.vipPay}>
          <Text style={{ color: "yellow" }}>VIP-充值</Text>
        </TouchableOpacity>
        <Image
          style={styles.avator}
          source={{
            uri:
              "https://wx4.sinaimg.cn/mw1024/ad38de43ly1fpewj6ks53j23u2227qvb.jpg"
          }}
        />
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    height: 240,
    alignItems: "center"
  },
  head: {
    width: screenWidth,
    flexDirection: "row",
    height: 60,
    // backgroundColor: "rgba(255,255,255,0.1)",
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    fontSize: 24,
    textShadowColor: "#fff",
    textShadowRadius: 5,
    textShadowOffset: { width: 1, height: 1 }
  },
  vipPay: {
    position: "absolute",
    right: 10,
    top: 70,
    backgroundColor: "#FF2D2D",
    padding: 5
  },
  avator: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginTop: 10
  }
})
export default Top
