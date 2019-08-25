import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  RefreshControl
} from "react-native"

import { connect } from "react-redux"
import { Toast ,NoticeBar} from "@ant-design/react-native"
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
          { fontSize: 12, textAlign: "center" },
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
      timeStamp: 1,
      imgList:[]
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
    this.props.dispatch({
      type: "app/bannerList",
      callback: res => {
        if (res.msg === "OK") {
          this.setState({
            imgList: res.result
          })
        }
      }
    })
    this.props.dispatch({
      type: "app/getUserFinance",
    })
  }

  onclose=()=>{

  }

  handleScrollEnd = event => {
    const contentHeight = event.nativeEvent.contentSize.height
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height
    const scrollOffset = event.nativeEvent.contentOffset.y

    const isEndReached = scrollOffset + scrollViewHeight >= contentHeight-50 // 是否滑动到底部
    const isContentFillPage = contentHeight >= scrollViewHeight // 内容高度是否大于列表高度

    if (isContentFillPage && isEndReached) {
      if(this.props.guesslikePage==="-1"){
        Toast.info("已经到底啦～",2,this.onclose,false)
      }else{
        this.setState({guesslikePage:this.props.guesslikePage+1}) 
      }
    }
  };

  render() {
    const { msgList,timeStamp,imgList,guesslikePage=1 } = this.state
    return (
      <View style={styles.home}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
          onScrollEndDrag={this.handleScrollEnd}
        >
          <View style={styles.topWrap}>
            <Top />
            <Ads data={imgList} isAds/>
            <View style={{ paddingVertical: 10 }}>
              <Entries />
            </View>
          </View>
          <View style={styles.gap} />
          <NoticeBar>如遇虚假信息，请拨打官方客服电话举报</NoticeBar>
          <MsgList data={msgList} timeStamp={timeStamp} guesslikePage={guesslikePage}/>
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
