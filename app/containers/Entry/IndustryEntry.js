import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { NavigationActions } from "react-navigation"
import { List } from "@ant-design/react-native"
import { screenHeight } from "../../styles/common"

const {Item} = List

const tabs = [
  { title: "公司" },
  { title: "材料供应" },
  { title: "设备租赁" },
  { title: "人才" },
  { title: "施工队伍" },
  { title: "项目信息" }
]

@connect()
class IndustryEntry extends Component {
  //   constructor(props) {
  //     super(props)
  //   }

  render() {
    const { type } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <List style={{fontSize:12,backgroundColor:"#E1E1E1"}} renderHeader="商家">
            <Item style={styles.item}>
              <Text>公司</Text>
            </Item>
            <Item style={styles.item}>
              <Text style={styles.itemText}>材料供应</Text>
            </Item>
            <Item style={styles.item}>
              <Text style={styles.itemText}>设备租赁</Text>
            </Item>
          </List>
          <List style={{fontSize:12,backgroundColor:"#E1E1E1"}} renderHeader="个人">
            <Item style={styles.item}>
              <Text style={styles.itemText}>人才</Text>
            </Item>
            <Item style={styles.item}>
              <Text style={styles.itemText}>施工队伍</Text>
            </Item>
            <Item style={styles.item}>
              <Text style={styles.itemText}>项目信息</Text>
            </Item>
          </List>
        </View>
        <View style={styles.right}>
          <View>123</View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    // width:50,

    flexDirection: "row"
  },
  left: {
    width: 90,
    height:screenHeight,
    backgroundColor:"#EFEFEF"
  },
  right: {
    flex: 1
  },
  item:{
    backgroundColor:"#EFEFEF"
  },
  itemText: {
    fontSize: 14,
  }
})

export default IndustryEntry
