/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native"
import { List, InputItem, Radio } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"
import { connect } from "react-redux"
import ImagePicker from "react-native-image-picker"
import uploadFile from "../../utils/rpc"
import { screenWidth } from "../../styles/common"

const { RadioItem } = Radio
@connect(({ app }) => ({ ...app }))
class EditProfile extends Component {
  static navigationOptions = {
    title: "修改"
  };

  constructor(props) {
    super(props)

    this.state = {
      male: 0
    }
  }

  componentDidMount() {
    const { userInfo } = this.props.navigation.state.params
    this.state.male = userInfo.male
    // const { userInfo } = this.props
    // this.setState({ userInfo })
  }


  // 修改资料
  saveProfile = (value, str) => {
    const { avatarSource } = this.state
    const { userInfo } = this.props.navigation.state.params
    const payload = {}

    if (str === "logo") {
      this.props.dispatch({
        type: "app/getUploadToken",
        callback: res => {
          if (res.msg === "OK") {
            const formInput = {
              key: `${userInfo.nick}_logo_${new Date().valueOf()}`
            }
            const { token } = res.result
            const url = `http://pmzyq6wog.bkt.clouddn.com/${formInput.key}`
            uploadFile(avatarSource.uri, token, formInput, ()=>this.saveProfile(url,"headshotUrl"))
          }
        }
      })
    } else {
      payload[str] = value
      this.props.dispatch({
        type: "app/saveProfile",
        payload,
        callback: res => {
          if (res.msg === "OK") {
            this.props.dispatch(NavigationActions.back())
          }
        }
      })
    }
  };

  // 选择图片
  selectPhotoTapped = () => {
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
  };

  initView = () => {
    const { avatarSource } = this.state
    const { type, userInfo } = this.props.navigation.state.params
    if (type === "male") {
      return (
        <List>
          <RadioItem
            style={styles.item}
            checked={this.state.male === 0}
            onChange={event => {
              if (event.target.checked) {
                this.saveProfile(0, "male")
                this.setState({ male: 0 })
              }
            }}
          >
            男
          </RadioItem>
          <RadioItem
            style={styles.item}
            checked={this.state.male === 1}
            onChange={event => {
              if (event.target.checked) {
                this.saveProfile(1, "male")
                this.setState({ male: 1 })
              }
            }}
          >
            女
          </RadioItem>
        </List>
      )
    }
    if (type === "headshotUrl") {
      return (
        <TouchableOpacity onPress={this.selectPhotoTapped}>
          <Image
            source={
              avatarSource ||
              (userInfo.headshotUrl && userInfo.headshotUrl.includes("http")
                ? { uri: userInfo.headshotUrl }
                : require("./images/logo.jpg"))
            }
            resizeMode="contain"
            style={styles.logo}
          />
        </TouchableOpacity>
      )
    }
    return (
      <List>
        <InputItem
        multipleLine={false}
          clear
          onChange={value => {
            this.state.value = value
          }}
          defaultValue={userInfo[type]}
          style={styles.item}
        />
      </List>
    )
  };

  render() {
    const { type } = this.props.navigation.state.params

    return (
      <View>
        {this.initView()}
        <TouchableOpacity
          onPress={() => this.saveProfile(this.state.value, type==="headshotUrl" ? "logo" :type)}
        >
          <Text style={styles.save}>保存</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    fontSize: 24,
    // marginLeft: 10,
    height: 50,
    lineHeight: 50
  },
  list: {
    marginBottom: 20
  },
  save: {
    marginTop: 20,
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    padding: 10,
    backgroundColor: "#FF7720"
  },
  logo: {
    marginVertical: 20,
    width: screenWidth,
    height: screenWidth,
    backgroundColor: "#DDD"
  }
})
export default EditProfile
