/* eslint-disable no-plusplus */
/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import {
  StyleSheet,
  Image,
  FlatList,
  View,
  RefreshControl,
  Text
} from "react-native"
import { WingBlank, List, Toast } from "antd-mobile-rn"
import { homeList } from "./data"

// const { Item } = List
// const { Brief } = Item

class MsgList extends Component {
  render() {
    return (
      <View style={styles.wrap}>
        <Text style={styles.title}>- 猜你喜欢 -</Text>
        <FlatList
          data={homeList}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image style={styles.itemImg} source={{ uri: item.url }} />
              <View style={{flex:1}}>
                <View style={styles.itemTitle}>
                  <Text style={{ fontSize: 18 }}> {item.title}</Text>
                  <Image style={styles.itemIcon} source={{ uri: item.url }} />
                </View>
                <Text style={styles.itemDes}>{item.des}</Text>
              </View>
            </View>
          )}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10
  },
  item: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderStyle: "solid"
  },
  itemImg: {
    width: 70,
    height: 70,
    marginRight: 10
  },
  itemIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    position:"absolute",
    right:0,
  },
  itemTitle: {
    maxHeight: 18,
    flexDirection: "row",
    marginBottom: 5,
    position:"relative",
  },
  itemDes: {
    fontSize: 14,
    color: "#999",
    maxHeight: 45
  },
  title: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5
  }
})
export default MsgList
