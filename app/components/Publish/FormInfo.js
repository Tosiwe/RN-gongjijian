/* eslint-disable react/sort-comp */
import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, ScrollView, Text } from "react-native"
import { Toast, List, InputItem, WhiteSpace } from "@ant-design/react-native"
// import ImagePicker from 'react-native-image-picker'
import BaseInfo from "./BaseInfo"
import Buttons from "./Buttons"

@connect()
class FormInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  fillForm = el => {
    Toast.info(el.type)
  };

  onSave = () => {
    alert("save")
  };

  onPublish = () => {
    alert("publish")
  };

  render() {
    // 选择发布分类
    return (
      <ScrollView
        style={styles.wrap}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={this.handleScrollEnd}
      >
        <Text style={styles.title}>注册人员、资质、（所有行业）需求</Text>
        <List style={styles.inputBox}>
          <InputItem
            clear
            onChange={this.handleInput}
            placeholder="请输入标题10~28个字"
          />
        </List>
        <List style={styles.inputBox}>
          <InputItem
            clear
            onChange={this.handleInput}
            placeholder="请输入材料名称|租赁设备名称"
          />
          <InputItem
            clear
            onChange={this.handleInput}
            placeholder="请输入材料品牌|租赁设备品牌"
          />
          <InputItem
            clear
            onChange={this.handleInput}
            placeholder="请输入材料规格|租赁设备规格"
          />
          <InputItem
            clear
            onChange={this.handleInput}
            placeholder="请输入材料单位|租赁设备单位"
          />
          <InputItem
            clear
            type="number"
            onChange={this.handleInput}
            extra="元"
            placeholder="请输入材料价格|租赁设备价格"
          />
        </List>
        <BaseInfo />
        <Buttons onPublish={this.onPublish} onSave={this.onSave} />
        <WhiteSpace style={styles.bottom} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    paddingTop: 20
  },
  title: {
    paddingHorizontal: 15,
    marginBottom: 20
  },
  inputBox: {
    marginBottom: 10
  },
  uploadImg: {
    width: 40,
    height: 40
  },
  bottom: {
    backgroundColor: "#FFF",
    height: 40
  }
})

export default FormInfo
