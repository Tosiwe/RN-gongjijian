// native
import React, { Component } from "react"
import { TouchableOpacity, View, StyleSheet, Text } from "react-native"
import { connect } from "react-redux"

import { Modal, Button, Toast } from "@ant-design/react-native"
// import { NavigationActions } from "react-navigation"

import Icon from "react-native-vector-icons/AntDesign"

// constants
import { bigBubbleSize, bubbleColor } from "./styles"

@connect(({ app }) => ({ ...app }))
class AddButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  handleAddButtonPress = () => {
    this.setState({
      visible: true
    })
    // Modal.operation([
    //   { text: '标为未读', onPress: () => console.log('标为未读被点击了') },
    //   { text: '置顶聊天', onPress: () => console.log('置顶聊天被点击了') },
    // ])
  };

  onClose=()=>{
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={style.bigBubble}
          hitSlop={{
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
          }}
          onPress={this.handleAddButtonPress}
        >
          <Icon name="plus" size={35} color="#FFF" />
        </TouchableOpacity>
        <Modal
          transparent
          visible={this.state.visible}
          animationType="slide"
          maskClosable
          onClose={this.onClose}
          footer={null}
        >
           <Button style={style.btn}>发布需求</Button>
           <Button style={style.btn} >发布信息</Button>
        </Modal>
      </View>
    )
  }
}

const style = StyleSheet.create({
  bigBubble: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: bubbleColor,
    height: bigBubbleSize,
    width: bigBubbleSize,
    borderRadius: bigBubbleSize / 2,
    top: 3
  },
  btn:{
    // backgroundColor:"red"
  }
})

export default AddButton
