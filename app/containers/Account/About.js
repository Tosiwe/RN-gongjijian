/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, StyleSheet, Text, Image } from "react-native"
import { NavigationActions } from "react-navigation"

import { connect } from "react-redux"

@connect(({ app }) => ({ ...app }))
class About extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // nick: "username"
    }
  }

  componentDidMount() {
    // this.props.dispatch({
    //   type: "app/getProfile",
    //   callback: res => {
    //     if (res.msg === "OK") {
    //       const { nick } = res.result
    //       this.setState({ nick })
    //     }
    //   }
    // })
  }

  toSet = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Setting",
        params: { name: "设置" }
      })
    )
  };

  render() {
    return (
      <View style={styles.wrap}>
        <View style={{ alignItems: "center" }}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("../img/img_logo.png")}
          />
          <Text>v0.0.1</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("./images/qrcode.png")}
          />
          <Text>微信号：gongjijian</Text>
        </View>
        <View style={styles.info}>
          <Text>Copyright@2017-2019</Text>
          <Text>南皮县高品钢结构有限公司 版权所有</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#FFF",
    justifyContent: "center"
  },
  logo: {
    width: 150
    // height: 150
  },
  info: {
    marginTop:50,
    alignItems: "center"
  }
})
export default About
