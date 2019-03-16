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
        pn:1,
        ps:50,
        distance: 0,
        classifyId: 'smarket',
        subClassifyId: 'ndssteel'
      },
      geoCode:{}
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
      this.setState({loading:true})
      this.getInfoList(1,nextProps.geoCode)
    }
  }

  getInfoList = (pn = 1,geoCode) => {
    const that = { ...this }

    getPosition(that,Toast,geoCode)
      .then(result => {
        if (result.isSuccess) {
          const {province, city,...params} =result.params
          params.lng = params.longitude
          params.lat = params.latitude
          delete params.longitude
          delete params.latitude
          if (params.adcode === "000000") {
            delete params.adcode
          } else {
            params.adcode =   params.shortAdcode || params.adcode.substring(0, 2)
          }
          if(params.adcode === "00"){
            delete params.adcode
          }
          delete  params.shortAdcode
          this.state.params = params
          console.log("getInfoList 二手", params)
          this.props.dispatch({
            type: "app/getInfoListLoc",
            payload: params,
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
    this.getInfoList()
  };

  render() {
    const { list=[], loading } = this.state
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
