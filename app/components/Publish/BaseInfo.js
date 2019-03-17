/* eslint-disable react/sort-comp */
import React, { Component } from "react"

import { StyleSheet, View, Text } from "react-native"
import { List, TextareaItem, InputItem, Toast } from "@ant-design/react-native"
import { connect } from "react-redux"
import ImagePicker from "../ImagePicker/ImagePicker"
import { getPosition } from "../../utils/utils"

@connect(({ app }) => ({ ...app }))
export default class BaseInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      params: {}
    }
  }

  componentDidMount() {
    const that = { ...this }
    getPosition(that, Toast, false, true).then(res => {
      if (res.isSuccess) {
        this.state.params = res.params
        this.setState({ city: res.params.city })
      }
    })
  }

  handleInput = (value, name) => {
    const { params } = this.state
    let p = { ...params }
    if (name === "picture") {
      p = { ...p, ...value }
    } else {
      p[name] = value
    }
    this.props.onChange(p)
    if (name === "city") this.state.city = value
    this.setState({ params: p })
  };

  render() {
    const { city } = this.state
    const { subClassifyId } = this.props
    return (
      <View style={styles.wrap}>
        <Text style={{ marginLeft: 20 }}>展示图片</Text>
        <ImagePicker onChange={v => this.handleInput(v, "picture")} />
        {subClassifyId === "talent" && (
          <View>
            <Text style={{ marginLeft: 20 }}>身份证正面</Text>
            <ImagePicker
              onChange={v => this.handleInput(v.picture1, "idCardPosUrl")}
              maxLength={1}
            />
            <Text style={{ marginLeft: 20 }}>身份证背面</Text>
            <ImagePicker
              onChange={v => this.handleInput(v.picture1, "idCardVerUrl")}
              maxLength={1}
            />
          </View>
        )}
        <List style={styles.inputBox}>
          <TextareaItem
            style={styles.input}
            rows={5}
            clear
            onChange={v => this.handleInput(v, "desc")}
            placeholder="请输入详情描述，建议至少50字。"
          />
        </List>
        <List>
          <InputItem
            multipleLine={false}
            style={styles.input}
            clear
            onChange={v => this.handleInput(v, "contact")}
            placeholder="请填写联系人姓名"
            thumb={<Text style={{ color: "red" }}>*</Text>}
          />
          <InputItem
            multipleLine={false}
            style={styles.input}
            type="phone"
            clear
            onChange={v => this.handleInput(v, "phone")}
            placeholder="请填写联系人电话"
            thumb={<Text style={{ color: "red" }}>*</Text>}
          />
          <InputItem
            multipleLine={false}
            style={styles.input}
            clear
            onChange={v => this.handleInput(v, "wechat")}
            placeholder="请填写联系人微信"
          />
          <InputItem
            multipleLine={false}
            style={styles.input}
            clear
            onChange={v => this.handleInput(v, "qq")}
            placeholder="请填写联系人QQ"
          />
          <InputItem
            multipleLine={false}
            style={styles.input}
            value={city}
            onChange={v => this.handleInput(v, "city")}
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
  inputBox: {
    marginBottom: 10
  }
})
