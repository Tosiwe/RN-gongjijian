import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native"

import { connect } from "react-redux"

import Ads from "./Ads"
import Top from "./Top"
import Entries from "./Entries"
import MsgList from "./MsgList"
import {primaryColor,statusBarHeight,iconSize} from '../../styles/common'

@connect()
class Home extends Component {
  static navigationOptions = {
    tabBarLabel: "首页",
    tabBarIcon: ({ focused }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? primaryColor : "gray" }]}
        source={require("../../images/house.png")}
      />
    ),
    tabBarButtonComponent: TouchableOpacity,
  };

  constructor(props) {
    super(props)
    this.state = {
      // refreshing: false
    }
  }



  handleScrollEnd = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height
    const scrollOffset = event.nativeEvent.contentOffset.y

    const isEndReached = scrollOffset + scrollViewHeight >= contentHeight // 是否滑动到底部
    const isContentFillPage = contentHeight >= scrollViewHeight // 内容高度是否大于列表高度

    if (isContentFillPage && isEndReached) {
      alert("给我数据，我还可以继续加载～～～")
    }
  };


  render() {
    const { msgList } = this.state
    return (
      <View style={styles.home}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={this.handleScrollEnd}
        >
          <Top />
          <Ads />
          <Entries />
          <MsgList data={msgList} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    paddingTop: statusBarHeight,
    flex: 1,
    flexDirection: "column",
    backgroundColor:'#fff',
    paddingLeft: 20,
    paddingRight: 20
  },
  icon: {
    width: iconSize,
    height: iconSize
  }
})

export default Home
