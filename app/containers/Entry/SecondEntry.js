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
import ListItem from "../../components/ListIem/ListItem"

import {list} from "./data"

const tabs = [
  { title: "二手钢材" },
  { title: "二手木材" },
  { title: "二手机械" }
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
