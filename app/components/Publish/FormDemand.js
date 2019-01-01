import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, Image, Text } from "react-native"
import { Toast, List } from "@ant-design/react-native"

const { Item } = List
const { Brief } = Item
@connect()
class FormDemand extends Component {
  fillForm = el => {
    Toast.info(el.type)
  };

  render() {
    // 选择发布分类
    return (
      <View style={styles.wrap}>
        <Text>demnd</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 20
  }
})

export default FormDemand
