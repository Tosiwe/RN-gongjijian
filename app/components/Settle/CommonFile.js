/* eslint-disable react/sort-comp */
import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, Text } from "react-native"
import { List, Toast } from "@ant-design/react-native"
import RNFileSelector from "react-native-file-selector"
import ImagePicker from "react-native-image-picker"
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

  // 选择图片
  selectPhotoTapped(name) {
    const options = {
      title: "选择图片",
      cancelButtonTitle: "取消",
      takePhotoButtonTitle: "拍照",
      chooseFromLibraryButtonTitle: "选择照片",
      cameraType: "back",
      mediaType: "photo",
      videoQuality: "high",
      durationLimit: 10,
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.8,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true
      }
    }

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled photo picker")
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error)
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton)
      } else {
        const {  params } = this.state
        const source = { uri: response.uri }
        const newParams = { ...params }
        const arr = source.uri.split("/")
        const fname = arr[arr.length - 1]
        this.props.dispatch({
          type: "app/getUploadToken",
          callback: res => {
            if (res.msg === "OK") {
              const formInput = {
                key: `${fname}_${new Date().valueOf()}`
              }
              const { token } = res.result
              const url = `http://pmzyq6wog.bkt.clouddn.com/${formInput.key}`

              uploadFile(source.uri, token, formInput, () => {
                newParams[name] = { name: fname, path: url }
                this.props.onChange(newParams)
                this.setState({
                  params: newParams
                })
              })
            }
          }
        })

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    })
  }

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
            onPress={() => this.selectPhotoTapped("bisLicenseUrl")}
          >
            营业执照
          </Item>
          <Item
            extra={params.safeLicenseUrl.name || "请选择"}
            arrow="horizontal"
            onPress={() => this.selectPhotoTapped("safeLicenseUrl")}
          >
            安全生产许可
          </Item>
          <Item
            extra={params.certLicenseUrl.name || "请选择"}
            arrow="horizontal"
            onPress={() => this.selectPhotoTapped("certLicenseUrl")}
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
