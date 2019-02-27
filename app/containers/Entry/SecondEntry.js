import React, { Component } from "react"
import { connect } from "react-redux"

import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text
} from "react-native"
import { Tabs ,Toast} from "@ant-design/react-native"
import {NavigationActions} from "react-navigation"
import ListItem from "../../components/ListIem/ListItem"
import { getPosition } from "../../utils/utils"

const tabs = [
  { id: "ndssteel", title: "二手钢材" },
  { id: "ndswood", title: "二手木材" },
  { id: "ndsmach", title: "二手机械" }
]

@connect()
class SecondEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      list: [],
      params: {
        subClassifyId: props.id
      }
    }
  }


  componentDidMount(){
    this.getInfoList()
  }

  getInfoList = (pn = 1) => {
    const that = { ...this }

    getPosition(that).then(result => {
      if (result.isSuccess) {
        this.state.params = result.params
        console.log("getInfoList", result.params)
        this.props.dispatch({
          type: "app/getInfoListLoc",
          payload: result.params,
          callback: res => {
            this.setState({ loading: false })
            if (res.msg === "OK") {
              let infoList = []
              if (pn !== 1) {
                infoList = [...this.state.infoList, ...res.result.data]
              } else {
                infoList = res.result.data
              }
              this.setState({
                list: infoList
                // infoPageNum: res.result.pn
              })
            }
          }
        })
      }else{
        this.setState({ loading: false })
      }
    }).catch(error=>{
      this.setState({ loading: false })
    })
  };


  renderItem = ({ item }) => (
    <ListItem
      data={item}
    />
  );

  changeTab = tab => {
    this.setState({ loading: true })

    this.state.params.subClassifyId = tab.id
    this.getInfoList()
  };

  render() {
    const { list, loading } = this.state
    return (
      <View style={styles.container}>
        <Tabs
          tabs={tabs}
          styles={{ topTabBarSplitLine: "#000" }}
          tabBarUnderlineStyle={{ backgroundColor: "#FF7720" }}
          onChange={this.changeTab}
        >
          <View style={styles.content}>
            <ActivityIndicator animating={loading} />
            {list.length ? (
              <FlatList data={list} renderItem={this.renderItem} />
            ) : (
              <Text
                style={{ textAlign: "center", fontSize: 16, marginTop: 20 }}
              >
                暂无数据
              </Text>
            )}
          </View>
        </Tabs>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "#FFF"
  },
  content: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 20
  }
})

export default SecondEntry
