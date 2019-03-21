/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
import React, { Component } from "react"

import ImagePicker from "react-native-image-picker"
import Icon from "react-native-vector-icons/AntDesign"
import { connect } from "react-redux"
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native"
import { Toast, Modal } from "@ant-design/react-native"
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

  delete = index => {
    Modal.alert("移除", "您确定要移除吗？", [
      {
        text: "取消"
      },
      {
        text: "确认",
        onPress: () => this.remove(index)
      }
    ])
  };

  remove = index => {
    const { imgs } = this.state
    const list = [...imgs]

    list.splice(index,1 )
    this.setState({ imgs: list })
  };

  // 选择图片
  selectPhotoTapped() {
    const { imgs } = this.state
    const { maxLength = 4 } = this.props

    if (imgs.length === maxLength) {
      Toast.info(`最多添加${maxLength}张图片`, 3, null, false)
      return null
    }

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
        const { params } = this.state
        const source = { uri: response.uri }
        const newImgs = [...imgs]
        const newParams = { ...params }
        newImgs.push(source)
        const arr = source.uri.split("/")
        const name = arr[arr.length - 1]
        this.props.dispatch({
          type: "app/getUploadToken",
          callback: res => {
            if (res.msg === "OK") {
              const formInput = {
                key: `${name}_${new Date().valueOf()}`
              }
              const { token } = res.result
              const url = `http://s.kunzepower.com/${formInput.key}`
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
        {imgs.map((source, index) => (
          <TouchableOpacity onPress={() => this.delete(index)}>
            <Image style={styles.avatar} source={source} />
          </TouchableOpacity>
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
    marginBottom: 10,
    marginHorizontal: 5
  },
  imgBtn: {
    justifyContent: "center",
    alignItems: "center"
  }
})
