/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, ScrollView, StyleSheet, Text, Image } from "react-native"
import { List, Checkbox } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"

import { connect } from "react-redux"
import { ENTRY_ARRAY } from "../../utils/dataDic"

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
    const { userInfo } = this.props
    this.setState({ userInfo })
    // this.props.dispatch({
    //   type: "app/getProfile",
    //   callback: res => {
    //     if (res.msg === "OK") {
    //       const { nick } = res.result
    //       this.setState({ nick })
    //     }
    //   }
    // })
  }

  toSet = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Setting",
        params: { name: "设置" }
      })
    )
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
          >
            <Text style={styles.item}>头像</Text>
          </Item>
          <Item arrow="horizontal" extra={userInfo.nick}>
            <Text style={styles.item}>昵称</Text>
          </Item>
        </List>
        <List style={styles.list}>
          <Item arrow="horizontal"  extra={userInfo.phone ? `${userInfo.phone.substr(0,3) }****${ userInfo.phone.substr(7,11)}` :"" }>
            <Text style={styles.item}>手机号</Text>
          </Item>
          <Item arrow="horizontal" extra={userInfo.wechat}>
            <Text style={styles.item}>微信</Text>
          </Item>
        </List>
        <List style={styles.list}>
          <Item arrow="horizontal" extra={userInfo.male ? "女" : "男"}>
            <Text style={styles.item}>性别</Text>
          </Item>
        </List>
        <List style={styles.list}>
          <Item arrow="horizontal" extra={userInfo.region}>
            <Text style={styles.item}>所在地</Text>
          </Item>
        </List>
        <View style={styles.bottom} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    fontSize: 20,
    marginLeft: 10,
    height: 40,
    lineHeight: 40
  },
  list: {
    marginBottom: 20
  }
})
export default ProfileSetting
