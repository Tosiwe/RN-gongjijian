/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import {
  View,
  StyleSheet,
  Text,
  Image
} from "react-native"
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
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require("../img/img_logo.png")}
        />
        <Text>v0.0.1</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    height: 300,
    alignItems: "center",
    paddingTop: 100,
    textAlign: "center"
  },
  logo: {
    width: 150,
    // height: 150
  }
})
export default About
