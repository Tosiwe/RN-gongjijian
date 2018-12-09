import React, { Component } from 'react'
import { View, Image, Text, findNodeHandle, StyleSheet } from 'react-native'
import { BlurView } from 'react-native-blur'
 
export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = { viewRef: null }
  }
 
  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) })
  }
 
  render() {
    return (
      <View style={styles.container}>
        <Image
          ref={(img) => { this.backgroundImage = img }}
          source={{uri:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544351523937&di=0aa0496c8ef84c4f9801a7e925ea89d3&imgtype=0&src=http%3A%2F%2Fimage.tupian114.com%2F20140416%2F14435270.png'}}
          style={styles.absolute}
          onLoadEnd={this.imageLoaded}
        />
        <BlurView
          style={styles.absolute}
          viewRef={this.state.viewRef}
          blurType="light"
          blurAmount={10}
        />
        <Text>Hi, I am some unblurred text</Text>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
  },
})