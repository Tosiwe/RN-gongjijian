/* eslint-disable react/sort-comp */
import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, ScrollView, Text } from "react-native"
import { Toast, List, InputItem, WhiteSpace } from "@ant-design/react-native"
// import ImagePicker from 'react-native-image-picker'
import BaseInfo from "./BaseInfo"
import Buttons from "./Buttons"

const LABEL = ["名称", "品牌", "规格", "单位"]

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
    const { name, title, id } = this.props.navigation.state.params
    // 选择发布分类
    return (
      <ScrollView
        style={styles.wrap}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={this.handleScrollEnd}
      >
        <Text style={styles.title}>{`${name}-${title}`}</Text>

        <List style={styles.inputBox}>
          <InputItem
            clear
            onChange={this.handleInput}
            placeholder="请输入标题10~28个字"
          />
        </List>
        <List style={styles.inputBox}>
          {LABEL.map(text => (
            <InputItem
              clear
              onChange={this.handleInput}
              placeholder={
                id === 'smarket'
                  ? `二手物品${text}`
                  : `请输入材料${text}|租赁设备${text}`
              }
            />
          ))}

          <InputItem
            clear
            type="number"
            onChange={this.handleInput}
            extra="元"
            placeholder={id === 'smarket' ? "二手物品价格" : "请输入材料价格|租赁设备价格"}
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
