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
import {Toast} from "@ant-design/react-native"
import { Storage, NavigationActions } from "../../utils"
import Ads from "./Ads"
import Top from "./Top"
import Entries from "../../components/Entries/Entries"
import MsgList from "./MsgList"
import { primaryColor, statusBarHeight, iconSize } from "../../styles/common"

@connect(({ app }) => ({ ...app }))
class Home extends Component {
  static navigationOptions = {
    tabBarLabel: ({ focused }) => (
      <Text
        style={[
          { fontSize: 12,textAlign:"center" },
          { color: focused ? primaryColor : "#D5D5D5" }
        ]}
      >
        首页
      </Text>
    ),
    tabBarIcon: ({ focused }) => (
      <Image
        style={styles.icon}
        source={
          focused
            ? require("./images/icon_tag_home_pre.png")
            : require("./images/icon_tag_home_nor.png")
        }
      />
    ),
    tabBarButtonComponent: TouchableOpacity
  };

  constructor(props) {
    super(props)
    this.state = {
      // refreshing: false
    }
  }

  componentDidMount() {
    Storage.get("auth").then(value => {
      if (!value) {
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: "Login"
          })
        )
      }
    })
  }

  handleScrollEnd = event => {
    const contentHeight = event.nativeEvent.contentSize.height
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height
    const scrollOffset = event.nativeEvent.contentOffset.y

    const isEndReached = scrollOffset + scrollViewHeight >= contentHeight // 是否滑动到底部
    const isContentFillPage = contentHeight >= scrollViewHeight // 内容高度是否大于列表高度

    if (isContentFillPage && isEndReached) {
      Toast.info ("已经到底啦～")
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
          <View style={styles.topWrap}>
            <Top />
            <Ads />
            <View style={{ paddingVertical: 10 }}>
              <Entries />
            </View>
          </View>
          <View style={styles.gap} />
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

export default Home
