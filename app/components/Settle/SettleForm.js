/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/sort-comp */
import React, { Component } from "react"
import { connect } from "react-redux"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native"
import { List, InputItem, Toast, Radio } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"
import CommonFile from "./CommonFile"

const { RadioItem } = Radio

@connect(({ app }) => ({ ...app }))
class SettleForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      params: {}
    }
  }

  handleChange = (value, name) => {
    const { params } = this.state
    const newParams = { ...params }
    if (name === "files") {
      for (const str in value) {
        newParams[str] = value[str]
      }
    } else if (name === "province" && value.name) {
      // eslint-disable-next-line prefer-destructuring
      newParams[name] = value.name[0]
    }else if(name==="settleTime"){
      this.setState({checked:value})
    } else {
      newParams[name] = value
    }
    this.state.params = newParams
  };

  onSave = () => {
    const { params } = this.state
    const { classifyId, subClassifyId } = this.props.navigation.state.params

    if (!params.company) {
      Toast.info("请输入公司名称")
      return
    }
    if (!params.bisLicenseUrl) {
      Toast.info("请选择营业执照")
      return
    }

    params.classifyId = classifyId
    params.subClassifyId = subClassifyId
    console.log("settleNew", params)
    this.props.dispatch({
      type: "app/settleNew",
      payload: params,
      callback: res => {
        if (res.msg === "OK") {
          Toast.info("入驻成功！", 1, () => {
            this.props.dispatch({
              type: "app/settleList"
            })
            const { callback } = this.props.navigation.state.params
            if (callback) {
              callback()
            } else {
              this.props.dispatch(NavigationActions.back())
            }
          })
        }
      }
    })
  };

  render() {
    const { subClassifyId } = this.props.navigation.state.params

    // 选择发布分类
    return (
      <ScrollView style={styles.wrap}>
        <List style={styles.inputBox}>
          <InputItem
            multipleLine={false}
            labelNumber={5}
            style={styles.input}
            clear
            maxLength={28}
            onChange={v => this.handleChange(v, "company")}
            placeholder="请输入"
            thumb={<Text style={{ color: "red" }}>*</Text>}
          >
            公司名称
          </InputItem>
        </List>
        <CommonFile onChange={v => this.handleChange(v, "files")} />
        <List style={styles.inputBox}>
          <InputItem
            multipleLine={false}
            labelNumber={5}
            style={styles.input}
            clear
            onChange={v => this.handleChange(v, "address")}
            placeholder="请输入"
          >
            地址
          </InputItem>
          {subClassifyId === "company" && (
            <InputItem
              multipleLine={false}
              labelNumber={5}
              style={styles.input}
              clear
              onChange={v => this.handleChange(v, "legal")}
              placeholder="请输入"
            >
              公司法人
            </InputItem>
          )}
          {subClassifyId === "company" && (
            <InputItem
              multipleLine={false}
              labelNumber={5}
              style={styles.input}
              clear
              onChange={v => this.handleChange(v, "idCard")}
              placeholder="请输入"
            >
              法人身份证
            </InputItem>
          )}
          <InputItem
            multipleLine={false}
            labelNumber={5}
            style={styles.input}
            clear
            onChange={v => this.handleChange(v, "productDesc")}
            placeholder="请输入"
          >
            产品描述
          </InputItem>
        </List>

        <List style={{ marginTop: 12 }}>
          <Text style={{ marginTop: 12,marginLeft:15 }}>
           选择入驻时长
          </Text>
          <RadioItem
            checked={this.state.checked === 1}
            onChange={event => {
              if (event.target.checked) {
                this.handleChange(1,'settleTime')
              }
            }}
          >
            月度
          </RadioItem>
          <RadioItem
            checked={this.state.checked === 2}
            onChange={event => {
              if (event.target.checked) {
                this.handleChange(2,'settleTime')
              }
            }}
          >
            季度
          </RadioItem>
          <RadioItem
            checked={this.state.checked === 3}
            onChange={event => {
              if (event.target.checked) {
                this.handleChange(3,'settleTime')
              }
            }}
          >
            年度
          </RadioItem>
        </List>
        <TouchableOpacity style={styles.btn} onPress={this.onSave}>
          <Text style={styles.btnText}>入驻</Text>
        </TouchableOpacity>
        <View style={{ height: 100 }} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  province: {
    height: 40,
    backgroundColor: "#FFF",
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between"
  },
  provinceLabel: {
    width: 80,
    fontSize: 17,
    color: "#000",
    lineHeight: 40
  },
  provinceExtra: {
    fontSize: 17,
    color: "#aaa",
    lineHeight: 40
  },
  wrap: {
    flex: 1,
    backgroundColor: "#EEE",
    paddingVertical: 10
  },
  inputBox: {
    marginVertical: 10
  },
  itemStyle: {
    height: 80
  },
  btn: {
    marginTop: 20,
    height: 50,
    backgroundColor: "#FF7720",
    marginHorizontal: 16,
    borderRadius: 25
  },
  btnBg: {
    width: "100%",
    height: 50
  },
  btnText: {
    lineHeight: 50,
    fontSize: 20,
    textAlign: "center",
    color: "#FFF"
  }
})

export default SettleForm
