/* eslint-disable react/sort-comp */
import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, Text } from "react-native"
import { List } from "@ant-design/react-native"
import RNFileSelector from "react-native-file-selector"
import uploadFile from "../../utils/rpc"

const { Item } = List

@connect()
class CommonFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      params: {
        bisLicenseUrl: {},
        safeLicenseUrl: {},
        certLicenseUrl: {}
      }
    }
  }

  showFileSelector = name => {
    const { params } = this.state
    const pa = { ...params }
    const { onChange } = this.props
    // const that = this
    RNFileSelector.Show({
      title: "选择文件",
      onDone: v => {
        const arr = v.split("/")
        const fileName = arr[arr.length - 1]

        this.props.dispatch({
          type: "app/getUploadToken",
          callback: res => {
            if (res.msg === "OK") {
              const formInput = {
                key: `${fileName.split(",")[0]}_${new Date().valueOf()}`
              }
              const { token } = res.result
              const url = `http://pmzyq6wog.bkt.clouddn.com/${formInput.key}`
              uploadFile(v, token, formInput, () => {
                pa[name] = { name: fileName, path: url }
                onChange(pa)
                this.setState({
                  params: pa
                })
              })
            }
          }
        })
      }
    })
  };

  render() {
    const { params } = this.state
    // 选择发布分类
    return (
      <View style={styles.wrap}>
        <List style={styles.inputBox}>
          <Item
            extra={params.bisLicenseUrl.name || "请选择"}
            arrow="horizontal"
            thumb={<Text style={{ color: "red" }}>*</Text>}
            onPress={() => this.showFileSelector("bisLicenseUrl")}
          >
            营业执照
          </Item>
          <Item
            extra={params.safeLicenseUrl.name || "请选择"}
            arrow="horizontal"
            onPress={() => this.showFileSelector("safeLicenseUrl")}
          >
            安全生产许可
          </Item>
          <Item
            extra={params.certLicenseUrl.name || "请选择"}
            arrow="horizontal"
            onPress={() => this.showFileSelector("certLicenseUrl")}
          >
            资质证书
          </Item>
        </List>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    marginVertical: 10,
    backgroundColor: "#FFF"
  }
})

export default CommonFile
