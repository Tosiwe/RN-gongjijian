/* eslint-disable react/sort-comp */
import React, { Component } from "react"

import { StyleSheet, View, TouchableOpacity, Text } from "react-native"
import {
  List,
  TextareaItem,
  InputItem,
  WhiteSpace,
} from "@ant-design/react-native"
import RNFileSelector from "react-native-file-selector"
import ImagePicker from "../ImagePicker/ImagePicker"

export default class BaseInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
      // avatarSource: null
    }
  }

  showFileSelector = () => {
    RNFileSelector.Show({
      title: "Select File",
      onDone: this.onDone
      // onCancel: () => {
      //     console.log('cancelled')
      // }
    })
  };

  onDone = path => {
    this.setState({ path })
  };

  render() {
    const { path } = this.state
    return (
      <View style={styles.wrap}>
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
        <List>
          <InputItem
            style={styles.input}
            clear
            onChange={this.handleInput}
            placeholder="请填写联系人姓名"
          />
          <InputItem
            style={styles.input}
            type="phone"
            clear
            onChange={this.handleInput}
            placeholder="请填写联系人电话"
          />
          <InputItem
            style={styles.input}
            clear
            onChange={this.handleInput}
            placeholder="请填写联系人微信"
          />
          <InputItem
            style={styles.input}
            clear
            onChange={this.handleInput}
            placeholder="请填写联系人QQ"
          />
          <InputItem
            style={styles.input}
            clear
            onChange={this.handleInput}
            placeholder="请填写地域，如：全国、沧州市、河北省"
          />
        </List>
        <View>
          <Text style={styles.selectorTitle}>附件上传</Text>
          <TouchableOpacity
            style={styles.selectBtn}
            onPress={this.showFileSelector}
          >
            <Text style={styles.selectBtnText}>选择文件</Text>
          </TouchableOpacity>
          <Text style={{ color: "#737373" }}>{path}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginBottom: 10,
    marginLeft: 10
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 10
  },
  imgBtn: {
    justifyContent: "center",
    alignItems: "center"
  },
  selectorTitle: {
    paddingVertical: 10,
    color: "#737373",
    marginLeft: 15
  },
  selectBtn: {
    backgroundColor: "#FFF",
    alignItems: "center",
    padding: 15
  },
  selectBtnText: {
    color: "#737373"
  },
  inputBox:{
    marginBottom:10
  }
})
