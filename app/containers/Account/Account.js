import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native"
import { connect } from "react-redux"

import { Button } from "../../components"
import { primaryColor, statusBarHeight, iconSize } from "../../styles/common"

import { createAction, NavigationActions } from "../../utils"
import Top from "./Top"
import My from "./My"
import JoinList from "./JoinList"

@connect(({ app }) => ({ ...app }))
class Account extends Component {
  static navigationOptions = {
    tabBarLabel: "个人中心",
    tabBarIcon: ({ focused }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? primaryColor : "gray" }]}
        source={require("../../images/person.png")}
      />
    ),
    tabBarButtonComponent: TouchableOpacity
  };

  gotoLogin = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: "Login" }))
  };

  logout = () => {
    this.props.dispatch(createAction("app/logout")())
  };

  render() {
    const { login } = this.props
    return (
      <View style={styles.container}>
        <ScrollView
          style={{ flex: 1}}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Top />
          <My />
          <JoinList />
          {/* {login ? (
          <Button text="Logout" onPress={this.logout} />
        ) : (
          <Button text="Goto Login" onPress={this.gotoLogin} />
        )} */}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight,
    flex: 1,
    backgroundColor: "#fff"
  },
  icon: {
    width: iconSize,
    height: iconSize
  }
})

export default Account
