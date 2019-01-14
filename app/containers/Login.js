import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import { InputItem, Button, List } from "@ant-design/react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { primaryColor } from "../styles/common";
import { createAction, NavigationActions } from "../utils";
@connect(({ baseQuery }) => ({
  baseQuery,
  // loading: loading.models.baseQuery
}))
// @connect(({ baseQuery }) => ({ ...baseQuery }))
@connect(({ app }) => ({ ...app }))

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {}
    };
  }
  static navigationOptions = {
    title: "Login"
  };

  // onLogin = () => {
  //   this.props.dispatch(createAction("app/login")());
  // };

  onClose = () => {
    this.props.dispatch(NavigationActions.back());
  };

  login = () => {
    const { dispatch } = this.props;
    const { params } = this.state;
    this.props.dispatch(createAction('app/login')())
    // dispatch({
    //   type: "baseQuery/login",
    //   payload: params,
    //   callback: result => {
    //     alert("OK");
    //   }
    // });
  };

  onChange = (value, name) => {
    const params = this.state;
    params[name] = value;
  };

  render() {
    const { fetching } = this.props;
    return (
      <View style={styles.container}>
        <Image source={require("./img/img_logo.png")} />
        <View>
          <List style={styles.list}>
            <InputItem
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
              clear
              type="password"
              placeholder="密码"
              style={styles.input}
              onChange={value => this.onChange(value, "password")}
            >
              <Icon style={styles.inputIcon} name="lock" />
            </InputItem>
          </List>
        </View>
        <Button
          size="large"
          type="primary"
          style={styles.loginBtn}
          activeStyle={styles.activeLoginBtn}
          onPress={this.login}
        >
          登录
        </Button>
        <View style={styles.actions}>
          <TouchableOpacity>
            <Text style={{ color: primaryColor }}>注册账号</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ color: primaryColor }}>忘记密码</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.thirdLogin}>
          <Text style={{ color: "#666" }}>第三方登录</Text>
          <View style={styles.thirdIconWrap}>
            <TouchableOpacity>
              <Image source={require("./img/login_btn_wechat.png")} />
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <Icon name="QQ" style={styles.thirdIcon} />
            </TouchableOpacity> */}
          </View>
        </View>
        {!fetching && (
          <TouchableOpacity style={styles.close} onPress={this.onClose}>
            <Image
              style={styles.closeIcon}
              source={require("../images/close.png")}
            />
          </TouchableOpacity>
        )}
      </View>
    );
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
});

export default Login;
