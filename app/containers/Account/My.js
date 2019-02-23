/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native"
// import { Toast } from "@ant-design/react-native"
import { connect } from "react-redux"
import { NavigationActions } from "../../utils"

@connect(({ app }) => ({ ...app }))

class My extends Component {
  toEntry = key => {
    const map={
      0:{type:"MyPublish", name:"我的发布"},
      1:{type:"MyLike", name:"我的收藏"},
      2:{type:"MyDownload", name:"我的下载"},
      3:{type:"MyHistory", name:"我的历史"},
    }
    this.props.dispatch(NavigationActions.navigate({ routeName: map[key].type ,params:{name:map[key].name}}))
  };

  render() {
    return (
      <View style={styles.wrap}>
        {/* <ImageBackground> */}
        <TouchableOpacity style={styles.item} onPress={() => this.toEntry(0)}>
          <Image source={require("./images/icon_tool_release.png")} />
          <Text style={styles.itemText}>我的发布</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => this.toEntry(1)}>
          <Image source={require("./images/icon_tool_collection.png")} />
          <Text style={styles.itemText}>我的收藏</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => this.toEntry(2)}>
          <Image source={require("./images/icon_tool_download.png")} />
          <Text style={styles.itemText}>我的下载</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => this.toEntry(3)}>
          <Image source={require("./images/icon_tool_history.png")} />
          <Text style={styles.itemText}>历史记录</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#ddd",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
    marginHorizontal: 16,
    top: -100
  },
  item: {
    flex: 1,
    alignItems: "center"
  },
  itemText: {
    fontSize: 12,
    color: "#727272"
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: "#ddd",
    marginBottom: 5
  },
  text: {
    fontSize: 16
  }
})
export default My
