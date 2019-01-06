import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { InputItem, Button, List } from '@ant-design/react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { primaryColor } from '../styles/common'
import { createAction, NavigationActions } from '../utils'

@connect(({ app }) => ({ ...app }))
class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  }

  onLogin = () => {
    this.props.dispatch(createAction('app/login')())
  }

  onClose = () => {
    this.props.dispatch(NavigationActions.back())
  }

  render() {
    const { fetching } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.logoText}>工基建-test</Text>
        <View>
          <List style={styles.list}>
            <InputItem
              clear
              type="phone"
              placeholder="手机号"
              maxLength={11}
              style={styles.input}
            >
              <Icon style={styles.inputIcon} name="phone" />
            </InputItem>
            <InputItem
              clear
              type="password"
              placeholder="密码"
              style={styles.input}
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
          <Text style={{ color: '#666' }}>第三方登录</Text>
          <View style={styles.thirdIconWrap}>
            <TouchableOpacity>
              <Icon name="wechat" style={styles.thirdIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="QQ" style={styles.thirdIcon} />
            </TouchableOpacity>
          </View>
        </View>
        {!fetching && (
          <TouchableOpacity style={styles.close} onPress={this.onClose}>
            <Image
              style={styles.closeIcon}
              source={require('../images/close.png')}
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    height: 20,
    borderBottomWidth: 0,
  },
  close: {
    position: 'absolute',
    left: 10,
    top: 30,
  },
  logoText: {
    fontSize: 32,
    color: '#f57b6a',
    marginBottom: 100,
  },
  loginBtn: {
    marginTop: 30,
    width: 300,
    backgroundColor: '#00b100',
    borderColor: '#00b100',
  },
  activeLoginBtn: {
    backgroundColor: '#58b758',
  },

  closeIcon: {
    width: 24,
    height: 24,
    tintColor: 'gray',
  },
  actions: {
    marginVertical: 20,
    width: 300,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  list: {
    borderRadius: 50,
    width: 300,
  },
  input: {
    color: '#fff',
  },
  thirdLogin: {
    alignItems: 'center',
    marginTop: 30,
  },
  inputIcon: {
    color: '#7f7f7f',
    fontSize: 20,
    width: 20,
  },
  thirdIcon: {
    fontSize: 28,
    marginTop: 20,
  },
  thirdIconWrap: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})

export default Login
