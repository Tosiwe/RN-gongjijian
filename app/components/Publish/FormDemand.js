/* eslint-disable react/sort-comp */
import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, ScrollView, Text } from "react-native"
import { Toast, List, InputItem, WhiteSpace } from "@ant-design/react-native"
// import ImagePicker from 'react-native-image-picker'
import BaseInfo from "./BaseInfo"
import Buttons from "./Buttons"

@connect()
class FormDemand extends Component {
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
    const { type } = this.props.navigation.state.params

    // 选择发布分类
    return (
      <ScrollView
        style={styles.wrap}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={this.handleScrollEnd}
      >
        <Text style={styles.title}>
          {type === 10 || type === 11
            ? "注册人员、资质"
            : "注册人员、资质、（所有行业）需求"}
        </Text>
        <List style={styles.inputBox}>
          <InputItem
            style={styles.input}
            clear
            onChange={this.handleInput}
            placeholder="请输入标题10~28个字"
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
  input: {
    // fontSize: 10
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

export default FormDemand
