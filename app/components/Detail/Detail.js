import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text
} from "react-native"

import { connect } from "react-redux"

import Auth from "./Auth"
import BaseInfo from "./BaseInfo"
import Bottom from "./Bottom"
import Pics from "../../containers/Home/Ads"

import { statusBarHeight, iconSize } from "../../styles/common"
// import Setting from "../../containers/Account/Setting"

@connect()
class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // refreshing: false
    }
  }

  componentDidMount() {
    const { data } = this.props
    const imgSet = new Set([
      data.picture1,
      data.picture2,
      data.picture3,
      data.picture3
    ])
    this.setState({ imgList: Array.from(imgSet) })
  }

  render() {
    const { data } = this.props
    const { imgList } = this.state
    return (
      <View style={styles.home}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={this.handleScrollEnd}
        >
          <Pics data={imgList} noRadius />
          <Auth data={data} />
          <BaseInfo data={data} />
        </ScrollView>
        <Bottom data={data} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    paddingTop: statusBarHeight,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  topWrap: {
    paddingLeft: 20,
    paddingRight: 20
  },
  icon: {
    width: iconSize,
    height: iconSize
  },
  gap: {
    backgroundColor: "#EEEEEE",
    height: 10
  }
})

export default Detail
