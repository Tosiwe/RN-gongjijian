import React, { Component } from "react"
import { connect } from "react-redux"

import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text
} from "react-native"
import { Tabs, Toast } from "@ant-design/react-native"
import ListItem from "../../components/ListIem/ListItem"
import { getPosition } from "../../utils/utils"

const tabs = [
  { id: "ndssteel", title: "二手钢材" },
  { id: "ndswood", title: "二手木材" },
  { id: "ndsmach", title: "二手机械" }
]

@connect(({ app }) => ({ ...app }))
class SecondEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      list: [],
      params: {
        pn: 1,
        ps: 20,
        distance: 0,
        classifyId: "smarket",
        subClassifyId: "ndssteel"
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
            subClassifyId:result.params.subClassifyId,
            ps: result.params.ps,
            pn,
            distance: this.state.distance||0,
            lat: result.params.latitude,
            lng: result.params.longitude
          }
          if (result.params.adcode && result.params.adcode !== "000000" || result.params.shortAdcode &&result.params.shortAdcode !=="00") {
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

  renderItem = ({ item }) => <ListItem data={item} />;

  changeTab = tab => {
    this.setState({ loading: true })

    this.state.params.subClassifyId = tab.id
    this.getInfoList(1, null,true)
  };

  render() {
    const { list = [], loading,pageNum } = this.state
    return (
      <View style={styles.container}>
        <Tabs
          tabs={tabs}
          styles={{ topTabBarSplitLine: "#000" }}
          tabBarUnderlineStyle={{ backgroundColor: "#FF7720" }}
          onChange={this.changeTab}
        >
          <View style={styles.content}>
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
        </Tabs>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 10,
    backgroundColor: "#FFF"
  },
  content: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10
  }
})

export default SecondEntry
