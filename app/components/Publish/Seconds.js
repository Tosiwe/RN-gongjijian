import React, { Component } from "react"
import { connect } from "react-redux"
import { NavigationActions } from "react-navigation"

import { StyleSheet, View, Image, Text } from "react-native"
import { List, NoticeBar } from "@ant-design/react-native"

const { Item } = List
const { Brief } = Item

const COMPANY = [
  { title: "二手钢材", brief: "资质办理、资质挂靠等" },
  { title: "二手机械", brief: "注册人员相关" },
  { title: "二手木材", brief: "注册人员相关" }
]

@connect()
class Seconds extends Component {
  fillForm = title => {
    const { type, name } = this.props.navigation.state.params
    const { dispatch } = this.props
    dispatch(
      NavigationActions.navigate({
        routeName: "FormInfo",
        params: { type, name, title }
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

export default Seconds
