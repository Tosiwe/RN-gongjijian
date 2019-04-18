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
  ScrollView,
  KeyboardAvoidingView
} from "react-native"
import {
  List,
  InputItem,
  Toast,
  Modal,
  Button,
  ActivityIndicator,
  TextareaItem
} from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"
import CommonFile from "./CommonFile"
import { getPosition } from "../../utils/utils"

@connect(({ app }) => ({ ...app }))
class SettleForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      params: {},
      animating:false
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
    } else {
      newParams[name] = value
    }
    this.state.params = newParams
  };

  onSave = () => {
    const { params } = this.state
    const { classifyId, subClassifyId } = this.props.navigation.state.params

    if (!params.company) {
      Toast.info("请输入公司名称", 3, null, false)
      return
    }
    if (!params.contact) {
      Toast.info("请输入联系方式", 3, null, false)
      return
    }
    if (!params.bisLicenseUrl) {
      Toast.info("请选择营业执照", 3, null, false)
      return
    }
    this.setState({animating:true})

    params.classifyId = classifyId
    params.subClassifyId = subClassifyId
    console.log("settleNew", params)
    getPosition({ ...this },Toast,false,true).then(result=>{
      if(result.isSuccess){
        this.props.dispatch({
          type: "app/settleNew",
          payload: result.params,
          callback: res => {
            this.setState({animating:false})

            if (res.msg === "OK") {
              Toast.info(
                "入驻成功！",
                2,
                () => {
                  this.props.dispatch({
                    type: "app/settleList"
                  })
                  const { callback } = this.props.navigation.state.params
                  if (callback) {
                    callback()
                  } else {
                    this.props.dispatch(NavigationActions.back())
                  }
                },
                false
              )
            }else if(res.status === "ERROR"){
              Toast.info(res.msg,2,null,false)
            }
          }
        })
      }
    })
  
  };

  toVip = () => {
    this.setState({ visible: false }, () => {
      this.props.dispatch(NavigationActions.navigate({ routeName: "Vip" }))
    })
  };

  render() {
    const { subClassifyId } = this.props.navigation.state.params

    // 选择发布分类
    return (
      <ScrollView style={styles.wrap}>
       <ActivityIndicator
          animating={this.state.animating}
          text="入驻中..."
          toast
          size="small"
        />
        <KeyboardAvoidingView behavior='padding'>
        <List style={styles.inputBox}>
          <InputItem
            multipleLine={false}
            labelNumber={6}
            style={styles.input}
            clear
            maxLength={28}
            onChange={v => this.handleChange(v, "company")}
            placeholder="请输入"
          >
            <Text style={{ color: "#000", fontSize: 16 }}>
              <Text style={{ color: "red" }}>*</Text>公司名称
            </Text>
          </InputItem>
          <InputItem
            type="phone"
            multipleLine={false}
            labelNumber={6}
            style={styles.input}
            clear
            maxLength={28}
            onChange={v => this.handleChange(v, "contact")}
            placeholder="请输入"
          >
            <Text style={{ color: "#000", fontSize: 16 }}>
              <Text style={{ color: "red" }}>*</Text>联系方式
            </Text>
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
          <InputItem
            multipleLine={false}
            labelNumber={5}
            style={styles.input}
            clear
            onChange={v => this.handleChange(v, "wechat")}
            placeholder="请输入"
          >
            微信
          </InputItem>
          <InputItem
            multipleLine={false}
            labelNumber={5}
            style={styles.input}
            clear
            onChange={v => this.handleChange(v, "qq")}
            placeholder="请输入"
          >
            QQ
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
          <TextareaItem
            rows={5}
            clear
            onChange={v => this.handleChange(v, "productDesc")}
            placeholder="请输入产品描述，建议至少50字。"
          />
        </List>
        <TouchableOpacity style={styles.btn} onPress={this.onSave}>
          <Text style={styles.btnText}>入驻</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={{ height: 100 }} />
        <Modal
          title="入驻成功！"
          transparent
          onClose={() => {
            this.setState({ visible: false })
          }}
          maskClosable
          visible={this.state.visible}
        >
          <View
            style={{
              height: 200,
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <Text>成为超级商家，享受更多特权</Text>
            <Button
              type="primary"
              onPress={this.toVip}
              style={{ backgroundColor: "#FF7720", borderColor: "#FF7720" }}
            >
              去看看吧
            </Button>
          </View>
        </Modal>
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
