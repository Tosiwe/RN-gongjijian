import React, { Component } from "react"
import { connect } from "react-redux"

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native"
import { NavigationActions } from "react-navigation"
import { List } from "@ant-design/react-native"
import { screenHeight, primaryColor } from "../../styles/common"
import ListItem from "../../components/ListIem/ListItem"
import {list} from "./data"

const { Item } = List

@connect()
class IndustryEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: 0
    }
  }

  onPressItem = id => {
    this.setState(state => {
      const selected = new Map(state.selected)
      selected.set(id, !selected.get(id)) // toggle
      return { selected }
    })
  };

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

  onPress = key => this.setState({ activeKey: key });

  render() {
    const { type } = this.props
    const { activeKey } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <List renderHeader={<Text style={styles.title}>商家</Text>}>
            <Item
              onPress={() => this.onPress(0)}
              style={[styles.item, activeKey === 0 ? styles.active : ""]}
            >
              <Text style={[styles.itemText,activeKey === 0 ? styles.activeText : ""]}>公司</Text>
            </Item>
            <Item
              onPress={() => this.onPress(1)}
              style={[styles.item, activeKey === 1 ? styles.active : ""]}
            >
              <Text style={[styles.itemText,activeKey === 1 ? styles.activeText : ""]}>材料供应</Text>
            </Item>
            <Item
              onPress={() => this.onPress(2)}
              style={[styles.item, activeKey === 2 ? styles.active : ""]}
            >
              <Text style={[styles.itemText,activeKey === 2 ? styles.activeText : ""]}>设备租赁</Text>
            </Item>
          </List>
          <List renderHeader={<Text style={styles.title}>个人</Text>}>
            <Item
              onPress={() => this.onPress(3)}
              style={[styles.item, activeKey === 3 ? styles.active : ""]}
            >
              <Text style={[styles.itemText,activeKey === 3 ? styles.activeText : ""]}>人才</Text>
            </Item>
            <Item
              onPress={() => this.onPress(4)}
              style={[styles.item, activeKey === 4 ? styles.active : ""]}
            >
              <Text style={[styles.itemText,activeKey === 4 ? styles.activeText : ""]}>施工队伍</Text>
            </Item>
            <Item
              onPress={() => this.onPress(5)}
              style={[styles.item, activeKey === 5 ? styles.active : ""]}
            >
              <Text style={[styles.itemText,activeKey === 5 ? styles.activeText : ""]}>项目信息</Text>
            </Item>
          </List>
        </View>
        <View style={styles.right}>
          <FlatList data={list} renderItem={this.renderItem} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "row"
  },
  title: {
    fontSize: 12,
    height: 30,
    color: "#737373",
    paddingLeft:20,
    paddingTop:10,
    backgroundColor: "#E0E0E0"
  },
  left: {
    width: 95,
    height: screenHeight,
    backgroundColor: "#EFEFEF"
  },
  right: {
    flex: 1,
    height: screenHeight,
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  item: {
    backgroundColor: "#EFEFEF",
    borderLeftWidth: 4,
    borderLeftColor: "#EFEFEF"
  },
  active: {
    backgroundColor: "#fff",
    borderLeftWidth: 4,
    borderLeftColor: primaryColor,
  },
  activeText:{
    color:primaryColor,
  },
  itemText: {
    fontSize: 14
  }
})

export default IndustryEntry
