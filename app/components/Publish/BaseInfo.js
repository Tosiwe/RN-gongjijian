/* eslint-disable react/sort-comp */
import React, { Component } from "react"

import { StyleSheet, View, TouchableOpacity, Text } from "react-native"
import {
  List,
  TextareaItem,
  InputItem,
  WhiteSpace,
  Button
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
    this.setState({ visible: true })
  };

  onDone=path=>{
    this.setState({path})
  }

  render() {
    const {path} = this.state
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
        <View>
          <Text style={styles.selectorTitle}>附件上传</Text>
          <Button style={{color:"#737373"}} onPress={this.showFileSelector}>选择文件</Button>
          <Text style={{color:"#737373"}}>{path}</Text>
        </View>
        <RNFileSelector
          title="Select File"
          visible={this.state.visible}
          onDone={this.onDone}
        />
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
  selectorTitle:{
    paddingVertical:10,
    color:"#737373"
  }
})
