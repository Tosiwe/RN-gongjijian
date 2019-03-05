import React, { Component } from "react"
import { StyleSheet, View, Text } from "react-native"
import { connect } from "react-redux"
import { List, InputItem, Button } from "@ant-design/react-native"
import ImagePicker from "../../components/ImagePicker/ImagePicker"

@connect(({ app }) => ({ ...app }))
class UserVerify extends Component {
  constructor() {
    super()
    this.state = {
      params: {
        realName: "",
        idCard: ""
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
    this.props.dispatch({
      type: "app/",
      payload: this.state.params,
      callback: res => {}
    })
  };

  render() {
    // const {  } = this.state

    return (
      <View style={styles.container}>
        <List>
          <InputItem
            placeholder="请输入"
            clear
            onChange={value => this.onChange(value, "name")}
            style={styles.item}
          >
            姓名
          </InputItem>
          <InputItem
            placeholder="请输入"
            clear
            onChange={value => this.onChange(value, "id")}
            style={styles.item}
          >
            身份证号
          </InputItem>
        </List>
        <ImagePicker />
        <Text style={{ marginLeft: 20 }}>身份证正面</Text>
        <ImagePicker />
        <Text style={{ marginLeft: 20 }}>身份证背面</Text>
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
