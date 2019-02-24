import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, Text, Image, FlatList } from "react-native"
import { Tabs, Toast } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"
// import { list } from "./data"
import { screenWidth } from "../../styles/common"
import { ENTRY_ARRAY } from "../../utils/dataDic"
import { getPosition } from "../../utils/utils"
import ListItem from "../ListIem/ListItem"

@connect()
class SearchResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: [],
      list: {}
    }
  }

  componentDidMount() {
    const tabs = []
    ENTRY_ARRAY.forEach((item, index) => {
      if (index < 9) {
        tabs.push({ title: item.text, ...item })
      }
    })
    this.setState({ tabs }, this.getList)
  }

  getList = (classifyId = "hbuilding") => {
    const { params } = this.props.navigation.state.params
    if (!params.classifyId) {
      params.classifyId = classifyId
    }
    this.setState({ pageKey: classifyId })

    getPosition({ ...this })
      .then(result => {
        if (result.isSuccess) {
          this.props.dispatch({
            type: "app/search",
            payload: result.params,
            callback: res => {
              if (res.msg === "OK") {
                const { list } = this.state
                const newList = { ...list }
                newList[params.classifyId] = res.result
                this.setState({ list: newList })
              }
            }
          })
        }
      })
      .catch(err => {
        Toast.error("发布失败，无法获取定位，请设置获取定位权限")
      })
  };

  renderItem = ({ item }) => <ListItem data={item} />;

  // renderItem = ({ item }) => (
  //   <View style={styles.wrap}>
  //     <View style={styles.info}>
  //       <Text style={styles.title}>{item.title}</Text>
  //       <Text ellipsizeMode="tail" numberOfLines={1} style={styles.infoText}>
  //         {item.des}
  //       </Text>
  //     </View>
  //     <Image style={styles.img} source={{ uri: item.url }} />
  //   </View>
  // );

  render() {
    const { tabs, list, pageKey } = this.state
    return (
      <View style={styles.container}>
        {list[tabs.id] ? (
          <Tabs
            tabs={tabs}
            onChange={tab => this.getList(tab.id)}
            page={pageKey || "hbuilding"}
            styles={{ topTabBarSplitLine: "#000" }}
            tabBarUnderlineStyle={{ backgroundColor: "#FF7720" }}
          >
            <View key={tabs.id} style={styles.content}>
              <FlatList data={list[tabs.id]} renderItem={this.renderItem} />
            </View>
          </Tabs>
        ) : (
          <Text style={{ textAlign: "center", fontSize: 16, marginTop: 20 }}>
            暂无数据
          </Text>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 10
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 10
  },
  wrap: {
    flexDirection: "row",
    // borderTopWidth: 1,
    // borderTopColor: "#DDD",
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    padding: 10
  },
  info: {
    width: screenWidth - 100
  },
  title: {
    fontSize: 16,
    marginBottom: 5
  },
  infoText: {
    color: "#727272",
    fontSize: 12
  },
  img: {
    width: 30,
    height: 30,
    marginLeft: 20
  }
})

export default SearchResult
