import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, Image, Text } from "react-native"
import { Toast, List } from "@ant-design/react-native"

const { Item } = List
const { Brief } = Item
@connect()
class CompanyOrPerson extends Component {
  fillForm = el => {
    Toast.info(el.type)
  };

  render() {
    // 选择发布分类
    return (
      <View style={styles.wrap}>
        <List
          style={styles.list}
          renderHeader={
            <View style={styles.listHeader}>
              <Image source={require("./images/icon_merchant.png")} />
              <Text style={styles.listHeaderText}>商家</Text>
            </View>
          }
        >
          <Item style={styles.item} arrow="horizontal">
            公司
            <Brief style={styles.brief}>公司简介、公司业务等</Brief>
          </Item>
          <Item style={styles.item} arrow="horizontal">
            租赁
            <Brief style={styles.brief}>租赁相关信息</Brief>
          </Item>
          <Item style={styles.item} arrow="horizontal">
            材料供应
            <Brief style={styles.brief}>租赁相关信息</Brief>
          </Item>
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
          <Item style={styles.item} arrow="horizontal">
            人才
            <Brief style={styles.brief}>人才相关信息</Brief>
          </Item>
          <Item style={styles.item} arrow="horizontal">
            施工队伍
            <Brief style={styles.brief}>施工队伍相关信息</Brief>
          </Item>
          <Item style={styles.item} arrow="horizontal">
            项目信息
            <Brief style={styles.brief}>项目相关信息</Brief>
          </Item>
        </List>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 20
  },
  list: {
    marginBottom: 20
  },
  item: {
    paddingTop:10 
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
    paddingBottom:10
  }
})

export default CompanyOrPerson
