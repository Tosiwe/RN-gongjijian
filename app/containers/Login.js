import React, { Component } from "react"
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native"
import { connect } from "react-redux"
import { InputItem,Button } from "antd-mobile-rn"
import Icon from "react-native-vector-icons/AntDesign"

import { createAction, NavigationActions } from "../utils"

@connect(({ app }) => ({ ...app }))
class Login extends Component {
  static navigationOptions = {
    title: "Login"
  };

  onLogin = () => {
    this.props.dispatch(createAction("app/login")())
  };

  onClose = () => {
    this.props.dispatch(NavigationActions.back())
  };

  render() {
    const { fetching } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.logoText}>工基建</Text>
        <View>
          <InputItem placeholder="手机号" style={styles.input}>
            <Icon style={styles.inputIcon} name="phone" />
          </InputItem>
          <InputItem placeholder="密码" style={styles.input}>
            <Icon style={styles.inputIcon} name="lock" />
          </InputItem>
        </View>
        <Button size="large" type="primary">登录</Button>
        {!fetching && (
          <TouchableOpacity style={styles.close} onPress={this.onClose}>
            <Image
              style={styles.closeIcon}
              source={require("../images/close.png")}
            />
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3a3a3a",
    height: 20,
    borderBottomWidth: 0
  },
  close: {
    position: "absolute",
    left: 10,
    top: 30
  },
  logoText: {
    fontSize: 32,
    color: "#f57b6a",
    marginBottom: 100
  },

  closeIcon: {
    width: 24,
    height: 24,
    tintColor: "gray"
  },
  input: {
    width: 300,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#3f3f3f",
    color: "#7f7f7f"
  },
  inputIcon: {
    color: "#7f7f7f",
    fontSize: 20,
    width: 20
  }
})

export default Login
