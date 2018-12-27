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
import { list } from "./data"

const tabs = [{ title: "资质" }, { title: "注册人员" }]

@connect()
class RegisterEntry extends Component {
  //   constructor(props) {
  //     super(props)
  //   }

  renderItem = ({ item }) => (
    <View style={styles.wrap}>
      <Text style={styles.title}>现有一名工程师</Text>
      <View style={styles.info}>
        <Text style={styles.infoText}>沧州市</Text>
        <Text style={styles.infoText}>15小时前</Text>
      </View>
    </View>
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
        </Tabs>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    paddingHorizontal: 10
  },
  content: {
    // backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 10,
    paddingHorizontal:10,
  },
  wrap: {
    borderWidth: 1,
    borderColor: "#efefef",
    backgroundColor: "#fff",
    shadowColor: "#ddd",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius:10,
  },
  title: {
    // textAlign: "center",
    fontSize: 16,
    marginBottom:10,
  },
  info: {
    flexDirection: "row"
  },
  infoText: {
    color: "#727272",
    fontSize: 12,
    marginRight: 30
  }
})

export default RegisterEntry
