import React, { Component } from "react"

import ImagePicker from "react-native-image-picker"
import Icon from "react-native-vector-icons/AntDesign"

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native"

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            avatarSource: null
          }
    }
  

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
      console.log("Response = ", response)

      if (response.didCancel) {
        console.log("User cancelled photo picker")
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error)
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton)
      } else {
        const source = { uri: response.uri }
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        })
      }
    })
  }

  render() {
    return (
      // eslint-disable-next-line react/jsx-no-bind
      <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
        <View style={[styles.avatar, styles.avatarContainer]}>
          {this.state.avatarSource === null ? (
            <View style={styles.imgBtn}>
              <Icon name="plus" color="#737373" size={16} />
              <Text style={{ color: "#737373" }}>选择照片</Text>
            </View>
          ) : (
            <Image style={styles.avatar} source={this.state.avatarSource} />
          )}
        </View>
      </TouchableOpacity>
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
    borderRadius: 10,
  },
  imgBtn: {
    justifyContent: "center",
    alignItems: "center"
  }
})
