import React, { Component } from "react"
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native"
import { connect } from "react-redux"
import { InputItem, Button, List, Toast } from "@ant-design/react-native"
import Icon from "react-native-vector-icons/AntDesign"
import { createAction, NavigationActions } from "../../utils"

let counter
@connect(({ app }) => ({ ...app }))
class BindPhone extends Component {
  static navigationOptions = {
    title: "BindPhone"
  };

  constructor(props) {
    super(props)
    this.state = {
      params: {},
      codeBtnDisable: false,
      count: 60
    }
  }

  onClose = () => {
    this.props.dispatch(NavigationActions.back())
  };

  handlePress = () => {
    const { params: payload } = this.state
    if (payload.password === payload.verifyPassword) {
      this.props.dispatch(createAction("app/register")(payload))
    }
  };

  onChange = (value, name) => {
    const { params } = this.state
    params[name] = value.toString().replace(/\s*/g, "")
  };

  getCode = () => {
    const { params } = this.state
    if (params.phone) {
      counter = setInterval(() => {
        const { count } = this.state
        const time = count - 1
        if (count === 0) {
          clearInterval(counter)
          this.setState({ codeBtnDisable: false })
        } else {
          this.setState({ count: time })
        }
      }, 1000)
      this.setState({ codeBtnDisable: true })
      const payload = { phone: params.phone }
      this.props.dispatch(createAction("app/sendCode")(payload))
    } else {
      Toast.info("请输入电话号码",3,null,false)
    }
  };

  render() {
    const { fetching } = this.props
    const { codeBtnDisable, count } = this.state
    return (
      <View style={styles.container}>
        <Image  style={{width:100, height:100, marginBottom:50}}  source={require("../img/img_logo.png")} />
        <View>
          <List style={styles.list}>
            <InputItem
            multipleLine={false}
              clear
              type="phone"
              placeholder="手机号"
              maxLength={11}
              style={styles.input}
              onChange={value => this.onChange(value, "phone")}
            >
              <Icon style={styles.inputIcon} name="phone" />
            </InputItem>
            <InputItem
            multipleLine={false}
              clear
              type="number"
              placeholder="验证码"
              maxLength={11}
              style={styles.input}
              extra={
                codeBtnDisable ? (
                  <Text style={styles.disableText}>{`${count}秒后重试`}</Text>
                ) : (
                  <TouchableOpacity onPress={this.getCode} style={styles.code}>
                    <Text
                      style={[
                        styles.codeText,
                        codeBtnDisable && styles.disableText
                      ]}
                    >
                      {"获取验证码"}
                    </Text>
                  </TouchableOpacity>
                )
              }
              onChange={value => this.onChange(value, "verifyCode")}
            >
              <Icon style={styles.inputIcon} name="mobile1" />
            </InputItem>
          </List>
        </View>
        <Button
          size="large"
          type="primary"
          style={styles.loginBtn}
          activeStyle={styles.activeLoginBtn}
          onPress={this.handlePress}
        >
          绑定手机
        </Button>
        <View style={styles.actions} />
        <View style={styles.thirdLogin} />
        {/* {!fetching && (
          <TouchableOpacity style={styles.close} onPress={this.onClose}>
            <Image
              style={styles.closeIcon}
              source={require("../../images/close.png")}
            />
          </TouchableOpacity>
        )} */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
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
  loginBtn: {
    marginTop: 30,
    width: 300,
    backgroundColor: "#FF7720",
    borderColor: "#FF7720",
    borderRadius: 30
  },
  activeLoginBtn: {
    color: "#FFF",
    backgroundColor: "#FD9857"
  },

  closeIcon: {
    width: 24,
    height: 24,
    tintColor: "gray"
  },
  actions: {
    marginVertical: 20,
    width: 300,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  list: {
    borderRadius: 50,
    width: 300
  },
  input: {
    color: "#fff"
  },
  thirdLogin: {
    alignItems: "center",
    marginTop: 30
  },
  inputIcon: {
    color: "#7f7f7f",
    fontSize: 20,
    width: 20
  },
  codeText: {
    color: "#FF7720"
  },
  disableText: {
    color: "#ccc"
  },
  thirdIcon: {
    fontSize: 28,
    marginTop: 20
  },
  thirdIconWrap: {
    width: 300,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10
  }
})

export default BindPhone
