import React, { Component } from "react"
import { connect } from "react-redux"
import { NavigationActions } from "react-navigation"

import { StyleSheet, View, Image, Text } from "react-native"
import { List, NoticeBar } from "@ant-design/react-native"

const { Item } = List
const { Brief } = Item

const COMPANY = [
  { title: "公司", brief: "公司简介、公司业务等" },
  { title: "租赁", brief: "租赁相关信息" },
  { title: "材料供应", brief: "租赁相关信息" }
]

const PERSON = [
  { title: "人才", brief: "人才相关信息" },
  { title: "施工队伍", brief: "施工队伍相关信息" },
  { title: "项目信息", brief: "项目相关信息" }
]
@connect()
class CompanyOrPerson extends Component {
  fillForm = title => {
    const { type, name } = this.props.navigation.state.params
    const { dispatch } = this.props
    dispatch(
      NavigationActions.navigate({
        routeName: "FormInfo",
        params: { type, name:`${name}-${title}`,  }
      })
    )
  };

  render() {
    // 选择发布分类
    return (
      <View style={styles.wrap}>
        <NoticeBar mode="closable">
          请正确选择发布信息分类，分类与信息不匹配将无法通过审核！
        </NoticeBar>
        <List
          style={styles.list}
          renderHeader={
            <View style={styles.listHeader}>
              <Image source={require("./images/icon_merchant.png")} />
              <Text style={styles.listHeaderText}>商家</Text>
            </View>
          }
        >
          {COMPANY.map(data => (
            <Item
              onPress={() => this.fillForm(data.title)}
              style={styles.item}
              arrow="horizontal"
            >
              {data.title}
              <Brief style={styles.brief}>{data.brief}</Brief>
            </Item>
          ))}
        </List>
        <List
          style={styles.list}
          renderHeader={
            <View style={styles.listHeader}>
              <Image source={require("./images/icon_user.png")} />
              <Text style={styles.listHeaderText}>非商户（游客及个人）</Text>
            </View>
          }
        >
          {PERSON.map(data => (
            <Item
              onPress={() => this.fillForm(data.title)}
              style={styles.item}
              arrow="horizontal"
            >
              {data.title}
              <Brief style={styles.brief}>{data.brief}</Brief>
            </Item>
          ))}
        </List>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  list: {
    marginTop: 20
  },
  item: {
    paddingTop: 10
  },
  listHeader: {
    flexDirection: "row",
    paddingLeft: 15,
    paddingBottom: 10,
    alignItems: "center"
  },
  listHeaderText: {
    marginLeft: 5
  },
  brief: {
    fontSize: 12,
    paddingBottom: 10
  }
})

export default CompanyOrPerson
