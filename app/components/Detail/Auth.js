import React, { Component } from "react"
import { StyleSheet, View, Image, Text } from "react-native"

import { connect } from "react-redux"

@connect()
class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // refreshing: false
    }
  }

  render() {
    return (
      <View style={styles.title}>
        <Text style={styles.authTitle}>
          现有广东一级结构工程师证一本需要的联系
        </Text>
        <View style={styles.authWrap}>
          <Image
            style={styles.auth}
            source={require("./images/icon_authentication.png")}
          />
          <Text style={styles.authText}>公司认证</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    padding: 20
  },
  authTitle: {
    paddingBottom: 10
  },
  authWrap: {
    flexDirection: "row",
    alignItems: "center"
  },
  authText: {
    color: "#26A658",
    backgroundColor: "#E2FFF0",
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginLeft: 10
  },
  auth: {
    width: 20,
    height: 20
  }
})

export default Auth
