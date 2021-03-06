
import React, { Component } from "react"
import {
  // StyleSheet,
  // Dimensions,
  Modal
} from "react-native"
// import { NavigationActions } from "react-navigation"

import ImageViewer from 'react-native-image-zoom-viewer'
import { connect } from "react-redux"

// const ScreenWidth = Dimensions.get("window").width // 屏幕宽度
// const ScreenHeight = Dimensions.get("window").height // 屏幕宽度

// const IMG =
//   "http://h.hiphotos.baidu.com/zhidao/pic/item/6d81800a19d8bc3ed69473cb848ba61ea8d34516.jpg"

  @connect()
export default class PanView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // viewWidth: ScreenWidth
    }
  }

  // back=()=>{
  //   this.props.dispatch(NavigationActions.back({ routeName: "Home" }))
  // }

  render() {
    const { url } = this.props.navigation.state.params
    console.log( 'width: this.state.viewWidth',this.state.viewWidth)
    return (
        <Modal visible transparent>
                <ImageViewer 
                onCancel={this.back}
                enableSwipeDown
                imageUrls={[{url}]}
                />
        </Modal>
    )
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF"
//   },
//   rect: {
//     flex: 1,
//     position: "absolute"
//   }
// })
