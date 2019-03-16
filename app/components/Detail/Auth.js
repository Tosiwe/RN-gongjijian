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
    const { data } = this.props
    const company=['company', 'rent','material']
    return (
      <View style={styles.title}>
        <Text style={styles.authTitle}>{data.title || "标题"}</Text>
        {/* TODO:认证标志 */}
        {company.includes( data.subClassifyId) && (
          <View style={styles.authWrap}>
            <Image
              style={styles.auth}
              source={require("./images/icon_authentication.png")}
            />
            <Text style={styles.authText}>公司认证</Text>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    padding: 20,
    paddingBottom: 10
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
