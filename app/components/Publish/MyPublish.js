/* eslint-disable no-underscore-dangle */
import React, { Component } from "react"
import { connect } from "react-redux"

import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity
} from "react-native"
import { Tabs, Card } from "@ant-design/react-native"

const tabs = [{ title: "我的需求" }, { title: "我的信息" }]

const RECORD_STATE = {
  0: {
    state: "草稿",
    text: "发布"
  },
  1: {
    state: "待审核",
    text: "下架"
  },
  2: {
    state: "已发布",
    text: "下架"
  },
  3: {
    state: "删除",
    text: ""
  }
}

@connect(({ app }) => ({ ...app }))
class MyPublish extends Component {
  constructor(props) {
    super(props)
    this.state = {
      demandList: [],
      infoList: [],
      tabKey: 0,
      demandPageNum: 0,
      infoPageNum: 0
    }
  }

  componentDidMount() {
    this.state.tabKey = this.props.navigation.state.params.type === 1 ? 0 : 1
    this.getDemandList()
    this.getInfoList()
  }

  getDemandList = (pn = 1) => {
    this.props.dispatch({
      type: "app/getDemandList",
    //   payload: {
    //     pn,
    //     ps: 10
    //   },
      callback: res => {
        if (res.msg === "OK") {
            let demandList=[]
            if(pn!==1){
                demandList=[...this.state.demandList,...res.result.data]
            }else{
                demandList=res.result.data
            }
          this.setState({
            demandList,
            demandPageNum: res.result.pn
          })
        }
      }
    })
  };

  getInfoList = (pn = 1) => {
    this.props.dispatch({
      type: "app/getInfoList",
    //   payload: {
    //     pn,
    //     ps: 10
    //   },
      callback: res => {
        if (res.msg === "OK") {
            let infoList=[]
            if(pn!==1){
                infoList=[...this.state.infoList,...res.result.data]
            }else{
                infoList=res.result.data
            }
          this.setState({
            infoList,
            infoPageNum: res.result.pn
          })
        }
      }
    })
  };

  onAction = (state, id) => {
    const { tabKey } = this.state

    if (Number(state) === 0) {
      // 发布
      this.props.dispatch({
        type: tabKey === 0 ? "app/reviewDemand" : "app/reviewInfo",
        payload: { id },
        callback: res => {
          if (res.msg === "OK") {
            if (tabKey === 0) {
              this.getDemandList()
            } else {
              this.getInfoList()
            }
          }
        }
      })
    } else {
      // 下架
      this.props.dispatch({
        type: tabKey === 0 ? "app/draftDemand" : "app/draftInfo",
        payload: { id },
        callback: res => {
          if (res.msg === "OK") {
            this.refresh()
          }
        }
      })
    }
  };

  onDelete = id => {
    const { tabKey } = this.state
    // 删除
    this.props.dispatch({
      type: tabKey === 0 ? "app/deleteDemand" : "app/deleteInfo",
      payload: { id },
      callback: res => {
        if (res.msg === "OK") {
          this.refresh()
        }
      }
    })
  };

  refresh = (pn=1) => {
    const { tabKey } = this.state
    if (tabKey === 0) {
      this.getDemandList(pn)
    } else {
      this.getInfoList(pn)
    }
  };

  renderItem = ({ item }) => (
    <Card style={styles.card} full>
      <Card.Body>
        <View style={styles.carBody}>
          <Image
            resizeMode="contain"
            style={styles.carImg}
            source={require("../../containers/img/img_logo.png")}
          />
          <View style={styles.cardRight}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDes} ellipsizeMode="tail" numberOfLines={2}>
              {item.desc}
            </Text>
          </View>
        </View>
        <View style={styles.carFoot}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>刷新</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.midBtn]}
            onPress={() => this.onAction(item.state, item.id)}
          >
            <Text style={styles.btnText}>{RECORD_STATE[item.state].text}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText} onPress={() => this.onDelete(item.id)}>
              删除
            </Text>
          </TouchableOpacity>
        </View>
      </Card.Body>
    </Card>
  );

  render() {
    const { demandList, infoList, demandPageNum, infoPageNum } = this.state
    const { fetching } = this.props
    const { type: publishType } = this.props.navigation.state.params
    // 选择发布分类
    return (
      <View style={styles.container}>
        <Tabs
          tabs={tabs}
          initialPage={publishType === 1 ? 0 : 1}
          styles={{ topTabBarSplitLine: "#000" }}
          onChange={(data, index) => {
            this.state.tabKey = index
          }}
          tabBarUnderlineStyle={{ backgroundColor: "#FF7720" }}
        >
          <View style={styles.content}>
            <FlatList
              data={demandList}
              renderItem={this.renderItem}
              onRefresh={this.refresh}
              refreshing={fetching}
              onEndReachedThreshold={1}
              onEndReached={() => this.refresh(demandPageNum + 1)}
            />
          </View>
          <View style={styles.content}>
            <FlatList
              data={infoList}
              renderItem={this.renderItem}
              onRefresh={this.refresh}
              refreshing={fetching}
              onEndReachedThreshold={1}
              onEndReached={() => this.refresh(infoPageNum + 1)}
            />
          </View>
        </Tabs>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: "#EEE"
  },
  card: {
    marginBottom: 10
  },
  carBody: {
    flexDirection: "row",
    paddingHorizontal: 10
  },
  carImg: {
    width: 70,
    height: 70
  },
  cardRight: {
    paddingHorizontal: 20
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  cardDes: {
    paddingVertical: 10
  },
  carFoot: {
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    marginHorizontal: 5,
    paddingTop: 10,
    flexDirection: "row",
    flex: 1
  },
  btn: {
    flex: 1,
    paddingVertical: 5,
    alignContent: "center"
  },
  midBtn: {
    borderColor: "#EEE",
    borderLeftWidth: 1,
    borderRightWidth: 1
  },
  btnText: {
    fontSize: 16,
    textAlign: "center"
  }
})

export default MyPublish
