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
import { Tabs, Toast } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"
import { screenWidth } from "../../styles/common"

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

@connect(({ app }) => ({ ...app }))
class PaperEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      list: [],
      params: {
        classifyId: "hbuilding",
        pn: 1,
        ps: 20
      }
    }
  }

  componentDidMount() {
    this.getPeperList()
  }

  changeTab = tab => {
    this.state.params.classifyId = tab.id
    this.state.pageNum = 1
    this.getPeperList(1, true)
  };

  getPeperList = (pn = 1, forceUpdate) => {
    if (this.state.pageNum === pn && !forceUpdate) {
      return
    }
    
    const { params } = this.state
    const pa={...params}
    // this.state.pageNum = pn
    pa.pn = pn
    this.setState({ loading: true })
    this.props.dispatch({
      type: "app/paperList",
      payload: pa,
      callback: res => {
        this.setState({ loading: false })
        if (res.msg === "OK") {
          let infoList = []
          if (pn !== 1) {
            infoList = [...this.state.list, ...res.result.data]
          } else {
            infoList = res.result.data
          }
          if (pn !== 1 && !res.result.data.length) {
            return
          }
          this.setState({
            list: infoList,
            pageNum:pn
          })
        }
      }
    })
  };

  onPressItem = data => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "PaperDetail",
        params: {
          name: "图纸详情",
          data,
          type: "paper"
        }
      })
    )
  };

  renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[index === 0 && styles.top, styles.wrap]}
      onPress={() => this.onPressItem(item)}
    >
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.infoText}>
          {item.desc}
        </Text>
      </View>
      <Image
        style={styles.img}
        resizeMode="contain"
        source={require("../img/img_drawing.png")}
      />
    </TouchableOpacity>
  );

  render() {
    const { list, loading, pageNum = 0 } = this.state
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
              <FlatList
                data={list}
                renderItem={this.renderItem}
                 onRefresh={()=>{
                   setTimeout( this.getPeperList)
                  }}
                 refreshing={loading}
                onEndReachedThreshold={0.2}
                onEndReached={() => this.getPeperList(pageNum + 1)}
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
  top: {
    borderTopWidth: 1,
    borderTopColor: "#DDD"
  },
  content: {
    backgroundColor: "#FFF",
    // flex: 1,
    paddingHorizontal: 10
  },
  container: {
    backgroundColor: "#FFF"
  },
  wrap: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    padding: 10
  },
  info: {
    width: screenWidth - 100
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  infoText: {
    color: "#727272",
    fontSize: 12
  },
  img: {
    top: 5,
    width: 30,
    height: 30,
    marginLeft: 20
  }
})

export default PaperEntry
