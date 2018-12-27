import React, { Component } from "react"
import { connect } from "react-redux"

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native"
import { NavigationActions } from "react-navigation"
import { Tabs } from "@ant-design/react-native"
import ListItem from "./ListItem"

const tabs = [
  { title: "二手钢材" },
  { title: "二手木材" },
  { title: "二手机械" }
]

const list = [
  {
    id: Math.random(),
    url: "https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png",
    title: "Meet hotel",
    des:
      "《海王》是一部轻灵、浅显、奢华的娱乐片，轻灵与浅显，是对《海王》最喜欢的优点。《海王》是一部轻灵、浅显、奢华的娱乐片，轻灵与浅显，是对《海王》最喜欢的优点。《海王》是一部轻灵、浅显、奢华的娱乐片，轻灵与浅显，是对《海王》最喜欢的优点。《海王》是一部轻灵、浅显、奢华的娱乐片，轻灵与浅显，是对《海王》最喜欢的优点。《海王》是一部轻灵、浅显、奢华的娱乐片，轻灵与浅显，是对《海王》最喜欢的优点。"
  },
  {
    id: Math.random(),
    url: "https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png",
    title: "McDonald's invites you",
    des:
      "《海王》是一部轻灵、浅显、奢华的娱乐片，轻灵与浅显，是对《海王》最喜欢的优点。"
  },
  {
    id: Math.random(),
    url: "https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png",
    title: "Eat the week",
    des:
      "《海王》是一部轻灵、浅显、奢华的娱乐片，轻灵与浅显，是对《海王》最喜欢的优点。"
  },
  {
    id: Math.random(),
    url: "https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png",
    title: "Meet hotel",
    des:
      "《海王》是一部轻灵、浅显、奢华的娱乐片，轻灵与浅显，是对《海王》最喜欢的优点。"
  }
]
@connect()
class SecondEntry extends Component {
  //   constructor(props) {
  //     super(props)
  //   }

  renderItem = ({ item }) => (
    <ListItem
      id={item.id}
      onPressItem={this.onPressItem}
      //   selected={!!this.state.selected.get(item.id)}
      title={item.title}
      url={item.url}
      des={item.des}
    />
  );

  render() {
    const { type } = this.props
    return (
      <View style={styles.container}>
        <Tabs
          tabs={tabs}
          styles={{ topTabBarSplitLine: "#000" }}
          tabBarUnderlineStyle={{ backgroundColor: "#FF7720" }}
          // renderTab={tab=>(<Text style={{color:"red",borderBottomWidth:0}}>123</Text>   )}
        >
          <View style={styles.content}>
            <FlatList data={list} renderItem={this.renderItem} />
          </View>
          <View style={styles.content}>
            <FlatList data={list} renderItem={this.renderItem} />
          </View>
          <View style={styles.content}>
            <FlatList data={list} renderItem={this.renderItem} />
          </View>
        </Tabs>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:10,
    backgroundColor:"#FFF"
  },
  content: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop:20,
  }
})

export default SecondEntry
