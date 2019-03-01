/* eslint-disable prefer-destructuring */
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
      data: {}
    }
  }

  componentDidMount() {
    const oldData = this.props.navigation.state.params.data
    const type =
      oldData.type === 0 ? "app/getDemandDetail" : "app/getInfoDetail"
    let data = {}
    this.props.dispatch({
      type,
      payload: {
        id: oldData.id
      },
      callback: res => {
        data = res.result.data
        this.setState({ data })
      }
    })

    const imgSet = [data.picture1, data.picture2, data.picture3, data.picture3]
    const imgList = []
    imgSet.forEach(item => {
      if (item) {
        imgList.push({ url: item })
      }
    })

    this.props.dispatch({
      type: "app/saveHistory",
      payload: {
        recordId: data.id,
        type: data.type
      }
    })
    this.setState({ imgList })
  }


  render() {
    const { imgList,data, } = this.state
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
          <View style={{ height: 100 }} />
        </ScrollView>
        <Bottom data={data} type="contact"/>
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
