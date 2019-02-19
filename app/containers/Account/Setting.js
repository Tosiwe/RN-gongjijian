/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native"
import { List } from "@ant-design/react-native"
import Icon from "react-native-vector-icons/AntDesign"
import { connect } from "react-redux"
import { createAction, NavigationActions } from "../../utils"

const settingList = [
  { title: "行业设置", name: "ChooseIndustry" },
  // {title:"清除足迹"},
  // {title:"清空缓存"},
  { title: "关于工基建", name: "About" }
]
const { Item } = List
@connect(({ app }) => ({ ...app }))
class Setting extends Component {
  logout = () => {
    this.props.dispatch(createAction("app/logout")())
  };

  toRoute = name => {
    this.props.dispatch(NavigationActions.navigate({ routeName: name }))
  };

  render() {
    return (
      <View style={styles.wrap}>
        <List style={styles.list}>
          {settingList.map(item => (
            <Item
              style={styles.listItem}
              key={Math.random()}
              onPress={() => this.toRoute(item.name)}
              arrow="horizontal"
            >
             <Text style={styles.text}> {item.title}</Text>
            </Item>
          ))}
        </List>
        <TouchableOpacity onPress={this.logout}>
          <Text style={styles.logout}>退出</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 20,
    backgroundColor: "#FFF",
    borderRadius: 10
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    marginBottom: 15
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: "#ddd",
    marginBottom: 5
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
    height:40,
    lineHeight:40,
  },
  bottom: {
    height: 60,
    borderRadius: 20
  },
  logout: {
    marginTop: 40,
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    padding: 10,
    backgroundColor: "red"
  },
  list: {
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  listItem: {
    // height:60
  }
})
export default Setting
