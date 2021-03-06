/* eslint-disable react/sort-comp */
import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, ScrollView, Text, View, KeyboardAvoidingView } from "react-native"
import {
  Toast,
  List,
  InputItem,
  WhiteSpace,
  ActivityIndicator
} from "@ant-design/react-native"
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

const SERVER = {
  company: "业务名称|服务名称",
  team: "施工队名称",
  talent: "人才名称",
  project: "项目名称"
}

@connect(({ app }) => ({ ...app }))
class FormInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animating: false,
      tip:"发布",


      params: {
        title: "",
        desc: "",
        contact: "",
        phone: "",
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

        attchments: [],
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
    this.state.params.subClassifyId = ids.subClassifyId
  }

  isLegal = () => {
    const { params } = this.state
    if (params.title === "") {
      Toast.info("请填写标题", 3, null, false)
      return false
    }
    if (params.contact === "") {
      Toast.info("请填写联系人", 3, null, false)
      return false
    }
    if (params.phone === "") {
      Toast.info("请填写电话", 3, null, false)
      return false
    }
    return true
  };

  onSave = () => {
    if (this.isLegal()) {
      this.setState({ animating: true,tip:"保存" })
      const {params:oldParams} = this.state
      if(oldParams.province&&oldParams.city){
        this.props.dispatch({
          type: "app/saveInfoDraft",
          payload: oldParams,
          callback: res => {
            if (res.msg === "OK") {
              Toast.success("发布成功！", 3, this.goHome,false)
            }
            this.setState({ animating: false })
          }
        })
        return
      }
      getPosition({ ...this },Toast,false,true)
        .then(result => {
          if (result.isSuccess) {
            this.state.params = result.params
            const {shortAdcode,... params}  = result.params
            this.props.dispatch({
              type: "app/saveInfoDraft",
              payload: params,
              callback: res => {
                if (res.msg === "OK") {
                  Toast.success("保存成功！", 3, this.goHome, false)
                }
                this.setState({ animating: false })
              }
            })
          } else {
            this.setState({ animating: false })
          }
        })
        .catch(error => {
          this.setState({ animating: false })
        })
    }
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
    if (this.isLegal()) {
      this.setState({ animating: true,tip:"发布" })
      const {params:oldParams} = this.state
      if(oldParams.province&&oldParams.city){
        this.props.dispatch({
          type: "app/saveInfo",
          payload: oldParams,
          callback: res => {
            if (res.msg === "OK") {
              Toast.success("发布成功！", 3, this.goHome,false)
            }
            this.setState({ animating: false })
          }
        })
        return
      }
      getPosition({ ...this },Toast,false,true)
        .then(result => {
          if (result.isSuccess) {
            this.state.params = result.params
            const {shortAdcode,...params}  = result.params

            console.log("Publish Info", params)
            this.props.dispatch({
              type: "app/saveInfo",
              payload: params,
              callback: res => {
                if (res.msg === "OK") {
                  Toast.success("发布成功！", 3, this.goHome,false)
                }
                this.setState({ animating: false })
              }
            })
          } else {
            this.setState({ animating: false })
          }
        })
        .catch(error => {
          this.setState({ animating: false })
        })
    }
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
    console.log("params---", this.state.params)

  };

  render() {
    const { name, ids } = this.props.navigation.state.params
    const id = ids.classifyId
    const sid = ids.subClassifyId
    const {tip} = this.state

    // 选择发布分类
    return (
      <ScrollView
        style={styles.wrap}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // onScrollEndDrag={this.handleScrollEnd}
      >
        <ActivityIndicator
          animating={this.state.animating}
          text={`正在${tip}`}
          toast
          size="small"
        />
        <Text style={styles.title}>{name}</Text>
        <KeyboardAvoidingView behavior='padding'>

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
          {(sid === "material" || sid === "rent") &&
            LABEL.map(label => (
              <InputItem
                multipleLine={false}
                clear
                onChange={v => this.handleChange(v, label.key)}
                placeholder={ sid === "material" ? `请输入材料${label.value}`:`租赁设备${label.value}`  }
              />
            ))}
          {id === "smarket"  &&
            LABEL.map(label => (
              <InputItem
                key={label.key}
                multipleLine={false}
                clear
                onChange={v => this.handleChange(v, label.key)}
                placeholder={ `二手物品${label.value}` }
              />
            ))}
            {id ==="smarket" && <InputItem
              multipleLine={false}
              clear
              type="number"
              onChange={v => this.handleChange(v, "extraPrice")}
              extraa="元"
              placeholder="二手物品价格"
            />}

          {sid === "material" || sid === "rent" ? (
            <InputItem
              multipleLine={false}
              clear
              type="number"
              onChange={v => this.handleChange(v, "extraPrice")}
              extraa="元"
              placeholder={sid === "material" ? "请输入材料价格":"租赁设备价格"}
            />
          ) : (id !=="smarket" && (
            <InputItem
              multipleLine={false}
              clear
              onChange={v => this.handleChange(v, "extraName")}
              placeholder={SERVER[sid]}
            />)
          )}
        </List>
        <BaseInfo
          subClassifyId={ids.subClassifyId}
          onChange={v => this.handleChange(v, "baseInfo")}
          params={this.state.params}
        />
        <View style={{ height: 100 }} />
        <Buttons onPublish={this.onPublish} onSave={this.onSave} />
        </KeyboardAvoidingView>

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
