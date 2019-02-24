/* eslint-disable react/sort-comp */
import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, ScrollView, Text } from "react-native"
import { Toast, List, InputItem, WhiteSpace } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"
import { getPosition } from "../../utils/utils"

// import ImagePicker from 'react-native-image-picker'
import BaseInfo from "./BaseInfo"
import Buttons from "./Buttons"

const LABEL = [
  { key: "extraName", value: "名称" },
  { key: "extraBrand", value: "品牌" },
  { key: "extraSpec", value: "规格" },
  { key: "extraUnit", value: "单位" }
]

@connect()
class FormInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      params: {
        title: "",
        desc: "",
        contact: "",
        phone: "",
        region: "",
        qq: "",
        wechat: "",
        picture1: "",
        picture2: "",
        picture3: "",
        picture4: "",
        classifyId: "",

        extraName: "",
        extraBrand: "",
        extraSpec: "",
        extraUnit: "",
        extraPrice: "",

        attchments: "",
        longitude: "",
        latitude: "",
        province: "",
        city: "",
        adcode: ""
      }
    }
  }

  componentDidMount() {
    const { ids } = this.props.navigation.state.params
    this.state.params.classifyId = ids.classifyId
    this.state.params.classifyId = ids.subClassifyId
  }

  isLegal = () => {
    const { params } = this.state
    if (params.title === "") {
      Toast.info("请填写标题")
      return false
    }
    if (params.title.length < 10) {
      Toast.info("标题字数应在10-28个字")
      return false
    }
    if (params.contact === "") {
      Toast.info("请填写联系人")
      return false
    }
    if (params.phone === "") {
      Toast.info("请填写电话")
      return false
    }
    return true
  };

  onSave = () => {
    getPosition({...this}).then(result => {
      if (this.isLegal() && result.isSuccess) {
        this.state.params = result.params
        this.props.dispatch({
          type: "app/saveInfoDraft",
          payload: result.params,
          callback: res => {
            if (res.msg === "OK") {
              Toast.success("保存成功！", 1, this.goHome)
            }
          }
        })
      }
    }).catch(err=>{
      Toast.error("发布失败，无法获取定位，请设置获取定位权限")
    })
  };

  goHome = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Home",
        params: {}
      })
    )
  };

  onPublish = () => {
    getPosition({...this}).then(result => {
      if (this.isLegal() && result.isSuccess) {
        this.state.params = result.params
        this.props.dispatch({
          type: "app/saveInfo",
          payload: result.params,
          callback: res => {
            if (res.msg === "OK") {
              Toast.success("发布成功！", 1, this.goHome)
            }
          }
        })
      }
    }).catch(err=>{
      Toast.error("发布失败，无法获取定位，请设置获取定位权限")
    })
  };

  handleChange = (value, name) => {
    const { params } = this.state
    let p = { ...params }
    if (name === "baseInfo") {
      p = { ...p, ...value }
    } else {
      p[name] = value
    }
    this.state.params = p
  };

  render() {
    const { name, ids } = this.props.navigation.state.params
    const id = ids.classifyId
    // 选择发布分类
    return (
      <ScrollView
        style={styles.wrap}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // onScrollEndDrag={this.handleScrollEnd}
      >
        <Text style={styles.title}>{name}</Text>

        <List style={styles.inputBox}>
          <InputItem
            multipleLine={false}
            clear
            onChange={v => this.handleChange(v, "title")}
            maxLength={28}
            placeholder="请输入标题，10-28个字"
          />
        </List>
        <List style={styles.inputBox}>
          {LABEL.map(label => (
            <InputItem
              multipleLine={false}
              clear
              onChange={v => this.handleChange(v, label.key)}
              placeholder={
                id === "smarket"
                  ? `二手物品${label.value}`
                  : `请输入材料${label.value}|租赁设备${label.value}`
              }
            />
          ))}
          <InputItem
            multipleLine={false}
            clear
            type="number"
            onChange={v => this.handleChange(v, "extraPrice")}
            extraa="元"
            placeholder={
              id === "smarket" ? "二手物品价格" : "请输入材料价格|租赁设备价格"
            }
          />
        </List>
        <BaseInfo
          onChange={v => this.handleChange(v, "baseInfo")}
          params={this.state.params}
        />
        <Buttons onPublish={this.onPublish} onSave={this.onSave} />
        <WhiteSpace style={styles.bottom} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    paddingTop: 20
  },
  title: {
    paddingHorizontal: 15,
    marginBottom: 20
  },
  inputBox: {
    marginBottom: 10
  },
  uploadImg: {
    width: 40,
    height: 40
  },
  bottom: {
    backgroundColor: "#FFF",
    height: 40
  }
})

export default FormInfo
