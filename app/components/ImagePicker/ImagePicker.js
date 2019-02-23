/* eslint-disable react/jsx-no-bind */
import React, { Component } from "react"

import ImagePicker from "react-native-image-picker"
import Icon from "react-native-vector-icons/AntDesign"
import { connect } from "react-redux"
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native"
import { Toast } from "@ant-design/react-native"
import uploadFile from "../../utils/rpc"
@connect()
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgs: [],
      params: {}
    }
  }

  callChange = newParams => {
    const { onChange } = this.props
    // eslint-disable-next-line no-unused-expressions
    onChange && onChange(newParams)
  };

  // 选择图片
  selectPhotoTapped() {
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
        const { imgs, params } = this.state
        const source = { uri: response.uri }
        const newImgs = [...imgs]
        const newParams = { ...params }
        if (newImgs.length < 5) {
          newImgs.push(source)
        } else {
          Toast.info("最多添加4张图片")
        }
        const arr = source.uri.split("/")
        const name = arr[arr.length - 1]
        this.props.dispatch({
          type: "app/getUploadToken",
          callback: res => {
            if (res.msg === "OK") {
              const formInput = {
                key: `${name.split(","[1])}_demand_${new Date().valueOf()}`
              }
              const { token } = res.result
              const url = `http://pmzyq6wog.bkt.clouddn.com/${formInput.key}`
              newParams[`picture${newImgs.length}`] = url

              this.setState({
                imgs: newImgs,
                params: newParams
              })

              uploadFile(source.uri, token, formInput, () =>
                this.callChange(newParams)
              )
            }
          }
        })

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    })
  }

  render() {
    const { imgs } = this.state
    return (
      <View style={styles.wrap}>
        {imgs.map(source => (
          <Image style={styles.avatar} source={source} />
        ))}

        <TouchableOpacity
          onPress={this.selectPhotoTapped.bind(this)}
          style={styles.btn}
        >
          <View style={[styles.avatar, styles.avatarContainer]}>
            <View style={styles.imgBtn}>
              <Icon name="plus" color="#737373" size={16} />
              <Text style={{ color: "#737373" }}>选择照片</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap"
  },
  btn: {
    width: 100
  },
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
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 5
  },
  imgBtn: {
    justifyContent: "center",
    alignItems: "center"
  }
})
