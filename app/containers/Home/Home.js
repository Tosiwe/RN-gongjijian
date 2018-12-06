import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Image,
} from "react-native"

import { connect } from "react-redux"

// import { WingBlank,  } from "antd-mobile-rn"
import Ads from "./Ads"
import Top from "./Top"
import Entries from "./Entries"
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

  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: "Detail" }))
  };

  render() {
    return (
      <View style={styles.home}>
        <Top />
        <Ads />
        <Entries />
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
