import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet,  ScrollView, Text } from "react-native"
import { Toast, List, InputItem,  } from "@ant-design/react-native"
// import ImagePicker from 'react-native-image-picker'
import BaseInfo from "./BaseInfo"

@connect()
class FormDemand extends Component {
  constructor(props) {
    super(props)
    this.state = {
      }
  }

  fillForm = el => {
    Toast.info(el.type)
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
            style={styles.input}
            clear
            onChange={this.handleInput}
            placeholder="请输入标题10~28个字"
          />
        </List>
        <BaseInfo />
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
  }
})

export default FormDemand
