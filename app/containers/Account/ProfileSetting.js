/* eslint-disable no-unused-expressions */
/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, ScrollView, StyleSheet, Text, Image } from "react-native"
import { List } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"
import Rpc from "react-native-newqiniu"

import { connect } from "react-redux"

const { Item } = List
@connect(({ app }) => ({ ...app }))
class ProfileSetting extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInfo: {}
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: "app/getProfile",
      callback: res => {
        if (res.msg === "OK") {
          this.setState({ userInfo: res.result })
        }
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    // console.log("ProfileSetting componentWillReceiveProps")
    debugger
    if (
      this.state.userInfo&&nextProps.userInfo&&
    (  JSON.stringify(this.state.userInfo) !==
      JSON.stringify(nextProps.userInfo))
    ) {
      this.props.dispatch({
        type: "app/getProfile",
        callback: res => {
          if (
            res.msg === "OK" ) {
            this.setState({ userInfo: res.result })
          }
        }
      })
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   debugger
  //   // this.props.dispatch({
  //   //   type: "app/getProfile",
  //   //   callback: res => {
  //   //     if (res.msg === "OK") {
  //   //       this.setState({ userInfo:res.result })
  //   //     }
  //   //   }
  //   // })
  // }

  // 设置头像
  setAvator = (file, name) => {
    const token = ""
    const formInput = {
      key: name
    }

    Rpc.uploadFile(file, token, formInput)
  };

  toEdit = type => {
    const { userInfo } = this.state

    if(type==="UserVerify"){
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: "UserVerify",
          params: { type, userInfo ,name:"实名认证"}
        })
      )
    }else{
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: "EditProfile",
          params: { type, userInfo ,name:"修改"}
        })
      )
    }
    
  };

  render() {
    const { userInfo } = this.state
    return (
      <ScrollView style={styles.wrap}>
        <View style={styles.bottom} />

        <List style={styles.list}>
          <Item
            arrow="horizontal"
            extra={
              <Image
                source={{
                  uri: userInfo.headshotUrl
                }}
                style={{ width: 30, height: 30 }}
              />
            }
            onPress={() => this.toEdit("headshotUrl")}
          >
            <Text style={styles.item}>头像</Text>
          </Item>
          <Item
            arrow="horizontal"
            onPress={() => this.toEdit("nick")}
            extra={userInfo.nick}
          >
            <Text style={styles.item}>昵称</Text>
          </Item>
        </List>
        <List style={styles.list}>
          <Item
            arrow="horizontal"
            onPress={() => this.toEdit("phone")}
            extra={
              userInfo.phone
                ? `${userInfo.phone.substr(0, 3)}****${userInfo.phone.substr(
                    7,
                    11
                  )}`
                : ""
            }
          >
            <Text style={styles.item}>手机号</Text>
          </Item>
          <Item
            arrow="horizontal"
            onPress={() => this.toEdit("wechat")}
            extra={userInfo.wechat}
          >
            <Text style={styles.item}>微信</Text>
          </Item>
        </List>
        <List style={styles.list}>
          <Item
            arrow="horizontal"
            onPress={() => this.toEdit("male")}
            extra={userInfo.male ? "女" : "男"}
          >
            <Text style={styles.item}>性别</Text>
          </Item>
        </List>
        <List style={styles.list}>
          <Item
            arrow="horizontal"
            onPress={() => this.toEdit("city")}
            extra={userInfo.city}
          >
            <Text style={styles.item}>所在地</Text>
          </Item>
          <Item
            arrow={!userInfo.realNameVerify &&"horizontal"}
            onPress={() => {!userInfo.realNameVerify && this.toEdit("UserVerify")}}
            extra={userInfo.realNameVerify?"已实名认证":"未实名认证"}
          >
            <Text style={styles.item}>实名认证</Text>
          </Item>
        </List>
        <View style={styles.bottom} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    fontSize: 16,
    marginLeft: 10,
    height: 40,
    lineHeight: 40
  },
  list: {
    marginBottom: 20
  }
})
export default ProfileSetting
