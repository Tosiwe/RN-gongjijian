import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Image,
  Text,
  RefreshControl,
  ScrollView,
} from "react-native"

import { connect } from "react-redux"

// import { WingBlank,  } from "antd-mobile-rn"
import { Toast } from "antd-mobile-rn"
import Ads from "./Ads"
import Top from "./Top"
import Entries from "./Entries"
import MsgList from "./MsgList"
import { NavigationActions } from "../../utils"

@connect()
class Home extends Component {
  static navigationOptions = {
    tabBarLabel: "首页",
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : "gray" }]}
        source={require("../../images/house.png")}
      />
    )
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
    marginTop: 20,
    flex: 1,
    flexDirection: "column"
  },
  icon: {
    width: 32,
    height: 32
  }
})

export default Home
