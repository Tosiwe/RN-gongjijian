import React, { Component } from "react"
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native"

import { connect } from "react-redux"

@connect()
class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // refreshing: false
    }
  }

  render() {
    return (
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.cBtn}>
          <Image style={styles.cImg} source={require("./images/icon_collection.png")}/>
          <Text style={styles.cText}>收藏</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns}>
          <Image style={styles.img} source={require("./images/icon_phone.png")}/>
          <Text>电话</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns}>
          <Image style={styles.img} source={require("./images/icon_wechat.png")}/>
          <Text>微信</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns}>
          <Image style={styles.img} source={require("./images/icon_qq.png")}/>
          <Text>QQ</Text>
        </TouchableOpacity>
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
    justifyContent:"space-around",
    alignItems:"flex-start",
    backgroundColor:"#fff"
  },
  img:{
      width:30,
      height:30
  },
  cText:{
      color:"#727272",
      fontSize:12
  },
  cBtn:{
      alignItems:"center",
      height:60,
      justifyContent:"center"
  },
  cImg:{
      width:20,
  },
  btns:{
      height:60,
      flexDirection:"row",
      alignItems:"center"
  }
})

export default Detail
