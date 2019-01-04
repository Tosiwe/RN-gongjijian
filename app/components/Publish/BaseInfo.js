import React, { Component } from "react"

import { StyleSheet, View, TouchableOpacity, Image } from "react-native"
import {
  List,
  TextareaItem,
  InputItem,
  WhiteSpace
} from "@ant-design/react-native"
import ImagePicker from "../ImagePicker/ImagePicker"

export default class BaseInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // avatarSource: null
    }
  }

  render() {
    return (
      <View>
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
        <WhiteSpace size="sm" />
        <List>
          <InputItem
            style={styles.input}
            clear
            onChange={this.handleInput}
            placeholder="请填写联系人姓名"
          />
          <InputItem
            style={styles.input}
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
  }
})
