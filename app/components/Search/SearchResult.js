/* eslint-disable no-param-reassign */
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
      list: {},
      activeKey:"hbuilding"
    }
  }

  componentDidMount() {
    const tabs = []
    ENTRY_ARRAY.forEach((item, index) => {
      if (index < 12) {
        tabs.push({ title: item.text, ...item })
      }
    })
    this.setState({ tabs }, this.getList)
  }


  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(this.state.geoCode) !== JSON.stringify(nextProps.geoCode)
    ) {
      this.state.geoCode = nextProps.geoCode
      this.setState({ loading: true })
      this.getList(1, nextProps.geoCode,true)
    }
  }

  

  getList = (pageNum=1,geoCode,forceUpdate) => {
    if(pageNum===this.state.pageNum&&!forceUpdate){
      return
    }

    if(forceUpdate||pageNum===1){
      this.state.distance=0
    }
    if(this.state.distance===0){
      pageNum=1
    }

    // debugger
    this.setState({loading:true})
    const { params } = this.props.navigation.state.params
    params.classifyId = this.state.activeKey
    this.state.params = params
    getPosition({ ...this }, Toast,geoCode).then(result => {
      const payload = {
        keyword: result.params.keyword,
        classifyId:result.params.classifyId,
        ps: result.params.ps,
        pn:pageNum,
        distance: this.state.distance||0,
        lat: result.params.latitude,
        lng: result.params.longitude
      }

      if (result.params.adcode !== "000000"&& result.params.shortAdcode !=="00") {
        payload.adcode = Number(result.params.shortAdcode || result.params.adcode.substring(0, 2))
      }
      if (result.isSuccess) {
        this.props.dispatch({
          type: "app/search",
          payload,
          callback: res => {
            if (res.msg === "OK") {
              let rList=[]
              if (pageNum !== 1) {
                rList = [...this.state.list[params.classifyId], ...res.result]
              } else {
                rList = res.result
              }
              const { list } = this.state
              const newList = { ...list }
              newList[params.classifyId] = rList
              const dist =res.result? Math.round( res.result[res.result.length-1]&&res.result[res.result.length-1].dist):0
             
              if(res.result.length){
                this.setState({ list: newList,pageNum,distance :dist+1})
              }else{
                this.setState({ list: newList})
              }
            }
            this.setState({loading:false})
          }
        })
      }
    })
  };

  renderItem = ({ item }) => <ListItem data={item} />;

  changeTab=tab=>{
    this.setState({ loading: true })
    this.state.activeKey = tab.id
    this.getList(tab.id,null,1,true)
  }

  render() {
    const { tabs, list, loading,pageNum,activeKey='hbuilding' } = this.state
    return (
      <View style={styles.container}>
      <Tabs
        tabs={tabs}
        styles={{ topTabBarSplitLine: "#000" }}
        tabBarUnderlineStyle={{ backgroundColor: "#FF7720" }}
        onChange={this.changeTab}
      >
        <View style={styles.content}>
          {loading && <ActivityIndicator animating={loading} />}

          {(list[activeKey]&&list[activeKey].length) ? (
            <FlatList 
            data={list[activeKey]}
             renderItem={this.renderItem} 
             onRefresh={this.getList}
             refreshing={loading}
             onEndReachedThreshold={0.2}
             onEndReached={() => this.getList(pageNum+1)}
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
    flex:1,
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

export default SearchResult
