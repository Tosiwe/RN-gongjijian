/* eslint-disable no-restricted-syntax */
import React, { Component } from "react"
import { StyleSheet, View, Text } from "react-native"
import { connect } from "react-redux"
import { List, InputItem, Button,Toast } from "@ant-design/react-native"
import ImagePicker from "../../components/ImagePicker/ImagePicker"

@connect(({ app }) => ({ ...app }))
class UserVerify extends Component {
  constructor() {
    super()
    this.state = {
      params: {
        realName: "",
        idCard: "",
        idCardPosUrl: "",
        idCardVerUrl: ""
      }
    }
  }

  componentDidMount() {}

  onChange = (value, name) => {
    const { params } = this.state
    const payload = { ...params }
    payload[name] = value
    this.setState({ params: payload })
  };

  submit = () => {
    const { params } = this.state
    const map={
            realName: "姓名",
            idCard: "身份证号",
            idCardPosUrl: "身份证正面照",
            idCardVerUrl: "身份证背面"
    }
    for (const name in params) {
      if (params[name] === "") {
        Toast.info(`${map[name]}不能为空`,3,null,false)
        return null
      }
    }
    this.props.dispatch({
      type: "app/verify",
      payload: this.state.params,
    })
    return null
  };

  render() {
    // const {  } = this.state

    return (
      <View style={styles.container}>
        <List>
          <InputItem
            placeholder="请输入"
            clear
            onChange={value => this.onChange(value, "realName")}
            style={styles.item}
          >
            <Text style={{ color: "#000", fontSize: 16 }}>
              <Text style={{ color: "red" }}>*</Text>姓名
            </Text>
          </InputItem>
          <InputItem
            placeholder="请输入"
            clear
            maxLength={18}
            onChange={value => this.onChange(value, "idCard")}
            style={styles.item}
          >
            <Text style={{ color: "#000", fontSize: 16 }}>
              <Text style={{ color: "red" }}>*</Text>身份证号
            </Text>
          </InputItem>
        </List>
        <View style={{height:10}} />
        <Text style={{ marginLeft: 20 }}><Text style={{ color: "red" }}>*</Text>身份证正面</Text>
        <ImagePicker
          onChange={v => this.onChange(v.picture1, "idCardPosUrl")}
          maxLength={1}
        />
        <Text style={{ marginLeft: 20 }}><Text style={{ color: "red" }}>*</Text>身份证背面</Text>
        <ImagePicker
          onChange={v => this.onChange(v.picture1, "idCardVerUrl")}
          maxLength={1}
        />
        <View style={styles.btnWrap}>
          <Button style={styles.btn} onPress={this.submit}>
            <Text style={{ color: "#FFF" }}>提交认证信息</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnWrap: { alignItems: "center" },
  btn: {
    marginTop: 40,
    width: "80%",
    backgroundColor: "#FE7B3E",
    borderRadius: 25
  }
})

export default UserVerify
