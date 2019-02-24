import React, { Component } from "react"
import { connect } from "react-redux"

import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native"
import { Tabs,Toast } from "@ant-design/react-native"
import {NavigationActions} from "react-navigation"
import { screenWidth } from "../../styles/common"
import { getPosition } from "../../utils/utils"

const tabs = [
  {
    id: "hbuilding",
    title: "房建"
  },
  {
    id: "steel",
    title: "钢结构"
  },
  {
    id: "bridge",
    title: "桥梁隧道"
  },
  {
    id: "expressway",
    title: "高速公路"
  },
  {
    id: "railway",
    title: "铁路工程"
  },
  {
    id: "gardens",
    title: "园林古建筑"
  },
  {
    id: "decorate",
    title: "装修装饰"
  },
  {
    id: "water",
    title: "水电工程"
  },
  {
    id: "ship",
    title: "船舶港口"
  }
]

@connect()
class PaperEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      list: [],
      params: {
        classifyId: props.id
      }
    }
  }



  componentDidMount(){
    this.getPeperList()
  }


  changeTab = tab => {
    this.state.params.subClassifyId = tab.id
    this.getPeperList()
  };

  getPeperList = (pn = 1) => {
    const that = { ...this }
    this.setState({ loading: true })
    getPosition(that).then(result => {
      if (result.isSuccess) {
        this.state.params = result.params
        console.log("getPeperList", result.params)
        this.props.dispatch({
          type: "app/paperList",
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
      } else {
        this.setState({ loading: false })
      }
    }).catch(err=>{
      Toast.fail("失败：无法获取定位，请设置获取定位权限")
    })
  };



  onPressItem = data => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "PaperDetail",
        params:{
          name:data.name,
          data
        }
      })
    )
  };


  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.wrap}>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.infoText}>
          {item.desc}
        </Text>
      </View>
      <Image style={styles.img} source={{ uri: item.picture1 }} />
    </TouchableOpacity>
  );

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
  content: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 10
  },
  container: {
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

export default PaperEntry
