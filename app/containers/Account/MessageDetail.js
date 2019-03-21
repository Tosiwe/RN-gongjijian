/* eslint-disable no-underscore-dangle */
import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, ScrollView, Text, Image, View } from "react-native"
import {screenHeight}from "../../styles/common"

@connect(({ app }) => ({ ...app }))
class MessageDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { data } = this.props.navigation.state.params

    // 选择发布分类
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.desc}>{data.desc}</Text>
          <Image
            style={styles.img}
            source={
              data.pictureUrl
                ? { uri: data.pictureUrl }
                : require("./images/logo.png")
            }
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding:20,
    // justifyContent: "center",
    alignItems: "center",
    flex: 1,
    minHeight:screenHeight,
  },
  title: {
    fontSize: 20,
    color: "#000"
  },
  desc: {
    fontSize: 16
  },
  img: {
    width: 100,
    height: 100
  }
})
export default MessageDetail
