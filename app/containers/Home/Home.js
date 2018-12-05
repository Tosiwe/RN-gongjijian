import React, { Component } from "react"
import { StyleSheet, View, Image } from "react-native"
import { connect } from "react-redux"

import { WingBlank, SearchBar, Picker } from "antd-mobile-rn"
import Ads from "./Ads"
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
        <WingBlank>
          <Picker 
          title="城市"
          />
          <SearchBar style={styles.searchBar} />
        </WingBlank>
        <Ads />
        <WingBlank />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    marginTop: 20
  },
  searchBar: {
    height: 40
  },
  icon: {
    width: 32,
    height: 32
  }
})

export default Home
