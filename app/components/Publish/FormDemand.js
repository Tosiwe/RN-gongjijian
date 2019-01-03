import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, Image, Text } from "react-native"
import { Toast, List, InputItem,  } from "@ant-design/react-native"
import ImagePicker from 'react-native-image-picker'

const { Item } = List
const { Brief } = Item

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}

ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response)
 
  if (response.didCancel) {
    console.log('User cancelled image picker')
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error)
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton)
  } else {
    const source = { uri: response.uri }
 
    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
 
    this.setState({
      avatarSource: source,
    })
  }
})

// Launch Camera:
ImagePicker.launchCamera(options, (response) => {
  // Same code as in above section!
})
 
// Open Image Library:
ImagePicker.launchImageLibrary(options, (response) => {
  // Same code as in above section!
})


@connect()
class FormDemand extends Component {

  constructor(props) {
    super(props)
    this.state = {
      files: [
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2121',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2122',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2123',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2124',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2125',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2126',
        },
      ],
      files2: [],
    }
  }

  fillForm = el => {
    Toast.info(el.type)
  };

  handleFileChange= file=>{
    Toast.info("file")

  }

  render() {
    // 选择发布分类
    return (
      <View style={styles.wrap}>
        <Text style={styles.title}>注册人员、资质、（所有行业）需求</Text>
        <List style={styles.inputBox}>
          <InputItem
            style={styles.input}
            clear
            onChange={this.handleInput}
            placeholder="请输入标题10~28个字"
          />
        </List>
        <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    paddingTop: 20
  },
  title: {
    paddingHorizontal: 15,
    marginBottom: 20
  },
  inputBox: {
    marginBottom: 10
  },
  input: {
    fontSize: 10
  }
})

export default FormDemand
