/* eslint-disable no-nested-ternary */
import React, { Component } from "react"
import { connect } from "react-redux"

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native"
import { Tabs, Toast } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"
import moment from "moment"
import { getPosition } from "../../utils/utils"

const tabs = [
  { title: "资质", id: "aptitude" },
  { title: "注册人员", id: "reg" }
]

@connect(({ app }) => ({ ...app }))
class RegisterEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      list: [],
      params: {
        pn: 1,
        ps: 20,
        distance: 0,
        classifyId: props.id
      },
      geoCode: {}
    }
  }

  componentDidMount() {
    this.getInfoList()
  }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(this.state.geoCode) !== JSON.stringify(nextProps.geoCode)
    ) {
      this.state.geoCode = nextProps.geoCode
      this.setState({ loading: true })
      this.getInfoList(1, nextProps.geoCode,true)
    }
  }

  onPressItem = item => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Detail",
        params: {
          name: item.title,
          data: item
        }
      })
    )
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.onPressItem(item)}
      style={styles.wrap}
    >
      <Text style={styles.title}>{item.title || "现有一名工程师"}</Text>
      <View style={styles.info}>
        <Text style={styles.infoText}>
          {moment(item.updateTime || item.createTime).format("YYYY-MM-DD")}
        </Text>
        <Text style={styles.infoText}>{item.city || "未知"}</Text>
        <Text style={styles.infoText}>
          {" "}
          {item.dist
            ? item.dist > 1000
              ? `${Math.round(item.dist / 1000)}公里`
              : `${Math.round(item.dist)}米`
            : "距离：未知"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  getInfoList = (pn = 1, geoCode,forceUpdate) => {
    const that = { ...this }

    if(pn===this.state.pageNum&&!forceUpdate){
      return
    }
    if(forceUpdate||pn===1){
      this.state.distance=0
    }

    getPosition(that, Toast, geoCode)
      .then(result => {
        if (result.isSuccess) {
          const payload = {
            classifyId:result.params.classifyId,
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
              this.setState({ loading: false })
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
          this.setState({ loading: false })
        }
      })
      .catch(error => {
        this.setState({ loading: false })
      })
  };

  changeTab = tab => {
    this.setState({ loading: true })

    this.state.params.classifyId = tab.id
    this.getInfoList(1, null,true)
  };

  render() {
    const { id } = this.props
    const { loading, list = [],pageNum=0 } = this.state
    return (
      <View style={styles.container}>
        {/* <Tabs
          tabs={tabs}
          styles={{ topTabBarSplitLine: "#000" }}
          tabBarUnderlineStyle={{ backgroundColor: "#FF7720" }}
          initialPage={id === "aptitude" ? 0 : 1}
          onChange={this.changeTab}
          // renderTab={tab=>(<Text style={{color:"red",borderBottomWidth:0}}>123</Text>   )}
        > */}
          <View style={styles.content}>
            {/* <ActivityIndicator animating={loading} /> */}
            {list.length ? (
              <FlatList 
              data={list} 
              renderItem={this.renderItem}
              onRefresh={this.getInfoList}
              refreshing={loading}
              onEndReachedThreshold={0.2}
              onEndReached={() => this.getInfoList(pageNum+1)}
              />
            ) : (
              <Text
                style={{ textAlign: "center", fontSize: 16, marginTop: 20 }}
              >
                暂无数据
              </Text>
            )}
          </View>
        {/* </Tabs> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 10
  },
  content: {
    // backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 10,
    // paddingHorizontal: 10
  },
  wrap: {
    marginHorizontal:10,
    borderWidth: 1,
    borderColor: "#efefef",
    backgroundColor: "#fff",
    shadowColor: "#eee",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10
  },
  title: {
    fontSize: 16,
    marginBottom: 10
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
