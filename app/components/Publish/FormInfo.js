/* eslint-disable react/sort-comp */
import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, ScrollView, Text } from "react-native"
import { Toast, List, InputItem, WhiteSpace } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"

// import ImagePicker from 'react-native-image-picker'
import BaseInfo from "./BaseInfo"
import Buttons from "./Buttons"

const LABEL = ["名称", "品牌", "规格", "单位"]

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
        picture1: "1",
        picture2: "2",
        picture3: "3",
        picture4: "4",
        classifyId: ""
      }
    }
  }

  fillForm = el => {
    Toast.info(el.type)
  };


  onSave = () => {
    const { params } = this.state
    if (this.isLegal()) {
      this.props.dispatch({
        type: "app/saveDemandDraft",
        payload: params,
        callback: res => {
          if (res.msg === "OK") {
            Toast.success("保存成功！", 1, this.goHome)
          }
        }
      })
    }
  };

  goHome = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Home',
        params: {  },
      })
    )

    // const backAction = NavigationActions.back();
    // this.props.navigation.dispatch(backAction)
    // NavigationActions.back()
  };

  onPublish = () => {
    const { params } = this.state
    if (this.isLegal()) {
      this.props.dispatch({
        type: "app/saveDemand",
        payload: params,
        callback: res => {
          if (res.msg === "OK") {
            Toast.success("发布成功！", 1, this.goHome)
          }
        }
      })
      // this.props.dispatch(createAction('app/saveDemand')(params))
    }
  };


  changeTitle = v => {
    this.state.params.title = v
  };

  changeBaseInfo = params => {
    this.setState({ params })
  };

  render() {
    const { name, title, id } = this.props.navigation.state.params
    // 选择发布分类
    return (
      <ScrollView
        style={styles.wrap}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={this.handleScrollEnd}
      >
        <Text style={styles.title}>{`${name}-${title}`}</Text>

        <List style={styles.inputBox}>
          <InputItem
          multipleLine={false}
            clear
            onChange={this.changeTitle}
            maxLength={28}
            placeholder="请输入标题，28个字以内"
          />
        </List>
        <List style={styles.inputBox}>
          {LABEL.map(text => (
            <InputItem
            multipleLine={false}
              clear
              onChange={v=>this.handleInput(v)}
              placeholder={
                id === 'smarket'
                  ? `二手物品${text}`
                  : `请输入材料${text}|租赁设备${text}`
              }
            />
          ))}
          <InputItem
          multipleLine={false}
            clear
            type="number"
            onChange={v=>this.handleInput(v)}
            extra="元"
            placeholder={id === 'smarket' ? "二手物品价格" : "请输入材料价格|租赁设备价格"}
          />
        </List>
        <BaseInfo onChange={this.changeBaseInfo} params={this.state.params}/>
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
