/* eslint-disable no-param-reassign */
import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, Text, FlatList, RefreshControl } from "react-native"
import { List, ActivityIndicator, Toast } from "@ant-design/react-native"
// import {NavigationActions} from "react-navigation"
import { primaryColor } from "../../styles/common"
import ListItem from "../../components/ListIem/ListItem"
import { getPosition } from "../../utils/utils"
// import { list } from './data'

const { Item } = List

@connect(({ app }) => ({ ...app }))
class IndustryEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: "company",
      loading: true,
      list: [],
      params: {
        pn:1,
        ps:20,
        distance: 0,
        classifyId: props.id,
        subClassifyId: "company"
      },
      geoCode: {}
    }
  }

  componentDidMount() {
    this.getInfoList()
    this.state.geoCode = this.props.geoCode
  }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(this.state.geoCode) !== JSON.stringify(nextProps.geoCode)
    ) {
      this.state.geoCode = nextProps.geoCode
      this.setState({ isRefreshing: true })
      this.getInfoList(1, nextProps.geoCode,true)
    }
  }

  getInfoList = (pn = 1, geoCode,forceUpdate) => {
    const that = { ...this }

    if(pn===this.state.pageNum&&!forceUpdate){
      return
    }
    if(forceUpdate||pn===1){
      this.state.distance=0
    }
    if(this.state.distance===0){
      pn=1
    }

    getPosition(that, Toast, geoCode)
      .then(result => {
        if (result.isSuccess) {
          const payload = {
            classifyId:result.params.classifyId,
            subClassifyId:result.params.subClassifyId,
            ps: result.params.ps,
            pn,
            distance: this.state.distance||0,
            lat: result.params.latitude,
            lng: result.params.longitude
          }
          if (result.params.adcode && result.params.adcode !== "000000" && result.params.shortAdcode &&result.params.shortAdcode !=="00") {
            payload.adcode = Number(result.params.shortAdcode || result.params.adcode.substring(0, 2))
            
          }


          this.props.dispatch({
            type: "app/getInfoListLoc",
            payload,
            callback: res => {
              this.setState({ loading: false, isRefreshing: false })
              if (res.msg === "OK") {
                let infoList = []
                if (pn !== 1) {
                  infoList = [...this.state.list, ...res.result]
                } else {
                  infoList = res.result
                }
                const dist = Math.round( infoList[infoList.length-1]&&infoList[infoList.length-1].dist)

                this.setState({
                  list: infoList,
                  pageNum: pn,
                  distance :dist+1
                })
              }
            }
          })
        } else {
          this.setState({ loading: false, isRefreshing: false })
        }
      })
      .catch(error => {
        this.setState({ loading: false, isRefreshing: false })
      })
  };

  renderItem = ({ item }) => (
    <View style={{ paddingHorizontal: 5 }}>
      <ListItem data={item} />
    </View>
  );

  // 左侧点击
  onPress = (key, forceUpdate) => {
    if (forceUpdate) {
      this.setState({ isRefreshing: true }, () => {
        this.state.params.subClassifyId = key
        this.getInfoList(1,null,true)
      })
    } else {
      this.setState({ activeKey: key, loading: true }, () => {
        this.state.params.subClassifyId = key
        this.getInfoList(1,null,true)
      })
    }
  };

  render() {
    const { activeKey, loading, list = {} ,pageNum} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <List>
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
            <FlatList
              style={{ flex: 1 }}
              data={list}
              renderItem={this.renderItem}
              refreshing={this.state.isRefreshing}
              onRefresh={() => this.getInfoList(1)}
              onEndReachedThreshold={0.2}
              onEndReached={() => this.getInfoList(pageNum+1)}
            />
          ) : (
            <Text style={{ textAlign: "center", fontSize: 16, marginTop: 20 }}>
              暂无数据
            </Text>
          )}
          {/* <View style={{ height: 50 }} /> */}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    flex: 1
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
    // height: screenHeight,
    backgroundColor: "#EFEFEF"
  },
  right: {
    flex: 1,
    // height: screenHeight,
    paddingVertical: 20
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
