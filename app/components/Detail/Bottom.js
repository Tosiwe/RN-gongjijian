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
        <View>
          <Image />
          <Text>收藏</Text>
        </View>
        <View>
          <Image />
          <Text>电话</Text>
        </View>
        <View>
          <Image />
          <Text>微信</Text>
        </View>
        <View>
          <Image />
          <Text>QQ</Text>
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
    height: 100,
    width: "100%"
  }
})

export default Detail
