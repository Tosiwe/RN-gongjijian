/* eslint-disable react/sort-comp */
import React, { Component } from "react"

import { StyleSheet, View, TouchableOpacity, Text } from "react-native"
import { List, TextareaItem, InputItem } from "@ant-design/react-native"
import RNFileSelector from "react-native-file-selector"
import { connect } from "react-redux"
import ImagePicker from "../ImagePicker/ImagePicker"
import uploadFile from "../../utils/rpc"
@connect(({ app }) => ({ ...app }))
export default class BaseInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      params: {},
      fileName: ""
      // visible: false
      // avatarSource: null
    }
  }

  componentDidMount(){
    const { gepCode={} } = this.props
    const region = `${gepCode.province},${gepCode.city}`
    this.state.params.region=region
    this.setState({region})
  }

  showFileSelector = () => {
    RNFileSelector.Show({
      title: "选择文件",
      onDone: path => {
        const name = path.split("/")
        const fileName = name[name.length - 1]
        this.props.dispatch({
          type: "app/getUploadToken",
          callback: res => {
            if (res.msg === "OK") {
              const formInput = {
                key: `${fileName}_${new Date().valueOf()}`
              }
              const { token } = res.result
              const url = `http://pmzyq6wog.bkt.clouddn.com/${formInput.key}`
              uploadFile(path, token, formInput, () => {
                this.setState({ fileName: path })
                this.handleInput({ url, title: fileName }, "attchments")
              })
            }
          }
        })
      }
    })
  };

  onDone = path => {
    this.setState({ path })
  };

  handleInput = (value, name) => {
    const { params } = this.state
    let p = { ...params }
    if (name === "picture") {
      p = { ...p, ...value }
    } else {
      p[name] = value
    }
    this.props.onChange(p)
    if(name==="region")this.state.region=value
    this.setState({ params: p })
  };

  render() {
    const { path, fileName, region } = this.state
    return (
      <View style={styles.wrap}>
        <ImagePicker onChange={v => this.handleInput(v, "picture")} />
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
            value={region }
            onChange={v => this.handleInput(v, "region")}
            placeholder="请填写地域，如：全国、沧州市、河北省"
          />
        </List>
        <View>
          <Text style={styles.selectorTitle}>附件上传</Text>
          {!!fileName && <Text>{`已选择：${fileName}`}</Text>}
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
  inputBox: {
    marginBottom: 10
  }
})
