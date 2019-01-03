import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, Image, Text } from "react-native"
import { Toast, List, InputItem,TextareaItem  } from "@ant-design/react-native"
// import ImagePicker from 'react-native-image-picker'
import ImagePicker from "../ImagePicker/ImagePicker"

const { Item } = List
const { Brief } = Item


@connect()
class FormDemand extends Component {

  constructor(props) {
    super(props)
    this.state = {
      files: [
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2121',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2122',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2123',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2124',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2125',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2126',
        },
      ],
      files2: [],
    }
  }

  fillForm = el => {
    Toast.info(el.type)
  };

  render() {
    // 选择发布分类
    return (
      <View style={styles.wrap}>
        <Text style={styles.title}>注册人员、资质、（所有行业）需求</Text>
        <List style={styles.inputBox}>
          <InputItem
            style={styles.input}
            clear
            onChange={this.handleInput}
            placeholder="请输入标题10~28个字"
          />
        </List>
        <ImagePicker />
        <List style={styles.inputBox}>
          <TextareaItem
            style={styles.input}
            rows={5}
            clear
            onChange={this.handleInput}
            placeholder="请输入详情描述，至少50字。"
          />
        </List>
      </View>
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
  uploadImg:{
    width:40,
    height:40,

  }
})

export default FormDemand
