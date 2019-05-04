
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
export default class ImageView extends Component {
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
    const { visible=false, index=0, imgs=[],onCancel } = this.props
    const urls = imgs.map(item=>({url:item.url}))
    console.log( 'width: this.state.viewWidth',this.state.viewWidth)
    return (
        <Modal 
        onRequestClose={onCancel}
        visible={visible} 
        transparent>
                <ImageViewer 
                    onCancel={onCancel}
                    enableSwipeDown
                    imageUrls={urls}
                    index={index}
                    saveToLocalByLongPress={false}
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
