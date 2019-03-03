/* eslint-disable no-param-reassign */
import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, Text, FlatList,TouchableOpacity } from "react-native"
import { List, ActivityIndicator, } from "@ant-design/react-native"
// import {NavigationActions} from "react-navigation"
import { screenHeight, primaryColor } from "../../styles/common"
import ListItem from "../../components/ListIem/ListItem"
import { getPosition } from "../../utils/utils"
// import { list } from './data'

const { Item } = List

@connect(({app})=>({...app}))
class IndustryEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: "hBuilding",
      loading: true,
      list: [],
      params: {
        distance: 0,
        classifyId: props.id
      }
    }
  }

  componentDidMount() {
    this.getDemandList()
    // this.getInfoList()
    
    this.setState({ activeKey: this.props.id })
  }

  getDemandList = (pn = 1) => {
    delete this.state.params.subClassifyId
    const that = { ...this }
    getPosition(that).then(result => {
      if (result.isSuccess) {
        const {province,city,...params}=result.params
        this.state.params = params
        console.log("getDemandList", params)
        this.props.dispatch({
          type: "app/getDemandListLoc",
          payload: params,
          callback: res => {
            this.setState({ loading: false })

            if (res.msg === "OK") {
              let demandList = []
              if (pn !== 1) {
                demandList = [...this.state.demandList, ...res.result]
              } else {
                demandList = res.result
              }
              this.setState({
                list: demandList
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


  getInfoList = (pn = 1) => {
    const that = { ...this }

    getPosition(that).then(result => {
      if (result.isSuccess) {
        const {province,city,...params}=result.params
        this.state.params = params
        console.log("getInfoList", params)
        this.props.dispatch({
          type: "app/getInfoListLoc",
          payload: params,
          callback: res => {
            this.setState({ loading: false })
            if (res.msg === "OK") {
              let infoList = []
              if (pn !== 1) {
                infoList = [...this.state.infoList, ...res.result]
              } else {
                infoList = res.result
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

  // 左侧点击
  onPress = key => {
    const { id } = this.props
    this.setState({ activeKey: key, loading: true })

    if (key === id) {
      this.getDemandList()
    } else {
      this.state.params.subClassifyId = key
      this.getInfoList()
    }
  };

  render() {
    // const { type } = this.props
    const { activeKey, loading, list={} } = this.state
    const { id } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <List renderHeader={<Text style={styles.title}>需求</Text>}>
            <Item
              onPress={() => this.onPress(id)}
              style={[styles.item, activeKey === id ? styles.active : ""]}
            >
              <Text
                style={[
                  styles.itemText,
                  activeKey === id ? styles.activeText : ""
                ]}
              >
                需求
              </Text>
            </Item>
          </List>
          <List renderHeader={<Text style={styles.title}>商家</Text>}>
            <Item
              onPress={() => this.onPress("company")}
              style={[
                styles.item,
                activeKey === "company" ? styles.active : ""
              ]}
            >
              <Text
                style={[
                  styles.itemText,
                  activeKey === "company" ? styles.activeText : ""
                ]}
              >
                公司
              </Text>
            </Item>
            <Item
              onPress={() => this.onPress("material")}
              style={[
                styles.item,
                activeKey === "material" ? styles.active : ""
              ]}
            >
              <Text
                style={[
                  styles.itemText,
                  activeKey === "material" ? styles.activeText : ""
                ]}
              >
                材料供应
              </Text>
            </Item>
            <Item
              onPress={() => this.onPress("rent")}
              style={[styles.item, activeKey === "rent" ? styles.active : ""]}
            >
              <Text
                style={[
                  styles.itemText,
                  activeKey === "rent" ? styles.activeText : ""
                ]}
              >
                设备租赁
              </Text>
            </Item>
          </List>
          <List renderHeader={<Text style={styles.title}>个人</Text>}>
            <Item
              onPress={() => this.onPress("talent")}
              style={[styles.item, activeKey === "talent" ? styles.active : ""]}
            >
              <Text
                style={[
                  styles.itemText,
                  activeKey === "talent" ? styles.activeText : ""
                ]}
              >
                人才
              </Text>
            </Item>
            <Item
              onPress={() => this.onPress("team")}
              style={[styles.item, activeKey === "team" ? styles.active : ""]}
            >
              <Text
                style={[
                  styles.itemText,
                  activeKey === "team" ? styles.activeText : ""
                ]}
              >
                施工队伍
              </Text>
            </Item>
            <Item
              onPress={() => this.onPress("project")}
              style={[
                styles.item,
                activeKey === "project" ? styles.active : ""
              ]}
            >
              <Text
                style={[
                  styles.itemText,
                  activeKey === "project" ? styles.activeText : ""
                ]}
              >
                项目信息
              </Text>
            </Item>
          </List>
        </View>
        <View style={styles.right}>
          <ActivityIndicator animating={loading} />
          {list.length ? (
            <FlatList data={list} renderItem={this.renderItem} />
          ) : (
            <Text style={{ textAlign: "center", fontSize: 16, marginTop: 20 }}>
              暂无数据
            </Text>
          )}
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
    paddingLeft: 20,
    paddingTop: 10,
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
    borderLeftColor: primaryColor
  },
  activeText: {
    color: primaryColor
  },
  itemText: {
    fontSize: 14
  }
})

export default IndustryEntry
