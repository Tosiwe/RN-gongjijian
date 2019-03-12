import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, Text, FlatList } from "react-native"
import { Tabs, Toast,ActivityIndicator } from "@ant-design/react-native"
// import { list } from "./data"
import { screenWidth } from "../../styles/common"
import { ENTRY_ARRAY } from "../../utils/dataDic"
import { getPosition } from "../../utils/utils"
import ListItem from "../ListIem/ListItem"
import LocationBtn from '../LocationBtn/LocationBtn'

@connect(({ app }) => ({ ...app }))
class SearchResult extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <LocationBtn  />
    )
  });

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
    this.setState({loading:true})
    const { params } = this.props.navigation.state.params
    if (!params.classifyId) {
      params.classifyId = classifyId
    }
    // this.setState({ pageKey: classifyId })
    this.state.params = params
    getPosition({ ...this }, Toast).then(result => {
      const payload = {
        keyword: result.params.keyword,
        classifyId:result.params.classifyId,
        ps: result.params.ps,
        distance: result.params.distance,
        lat: result.params.latitude,
        lng: result.params.longitude
      }

      if (result.params.adcode !== "000000") {
        payload.adcode = Number(result.params.shortAdcode || result.params.adcode.substring(0, 2))
      }
      if (result.isSuccess) {
        this.props.dispatch({
          type: "app/search",
          payload,
          callback: res => {
            if (res.msg === "OK") {
              const { list } = this.state
              const newList = { ...list }
              newList[params.classifyId] = res.result
              this.setState({ list: newList })
            }
            this.setState({loading:false})
          }
        })
      }
    })
  };

  renderItem = ({ item }) => <ListItem data={item} />;

  render() {
    const { tabs, list, loading } = this.state
    return (
      <View style={styles.container}>
        <Tabs
          tabs={tabs}
          onChange={tab => this.getList(tab.id)}
          // page={pageKey || "hbuilding"}
          styles={{ topTabBarSplitLine: "#000" }}
          tabBarUnderlineStyle={{ backgroundColor: "#FF7720" }}
        >
          {tabs.map(item => (
            <View key={item.id} style={styles.content}>
              <ActivityIndicator animating={loading} />
              {list[item.id] ? (
                <FlatList data={list[item.id]} renderItem={this.renderItem} />
              ) : (
                <Text
                  style={{ textAlign: "center", fontSize: 16, marginTop: 20 }}
                >
                  暂无数据
                </Text>
              )}
            </View>
          ))}
        </Tabs>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF"
    // paddingHorizontal: 10
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
