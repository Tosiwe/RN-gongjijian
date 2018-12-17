// native
import React, { Component } from "react"
import {
  TouchableOpacity,
  Animated,
  Easing,
  View,
  StyleSheet,
  Text
} from "react-native"
import { connect } from "react-redux"
import { Modal, Button } from "antd-mobile-rn"
// import { NavigationActions } from "react-navigation"

import FAwesomeIcon from "react-native-vector-icons/FontAwesome"

// constants
import {
  center,
  topLeft,
  topRight,
  bigBubbleSize,
  smallBubbleSize,
  bubbleColor,
  animateTime,
  easingType,
  delay
} from "./styles"

@connect(({ app }) => ({ ...app }))
class AddButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  onClose = () => {
    this.setState({
      visible: false
    })
  };

  handleAddButtonPress = () => {
    Modal.operation([
      { text: '标为未读', onPress: () => console.log('标为未读被点击了') },
      { text: '置顶聊天', onPress: () => console.log('置顶聊天被点击了') },
    ])
  };

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
          <FAwesomeIcon name="plus" size={35} color="#FFF" />
        </TouchableOpacity>
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
  }
})

export default AddButton
