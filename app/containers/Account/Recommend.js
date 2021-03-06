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
import { Tabs } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"

const tabs = [{ title: "推荐" }, { title: "系统通知" }]

@connect(({ app }) => ({ ...app }))
class Recommend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      noticeList: [],
      recList: [],
      tabKey: 0
      //   demandPageNum: 0,
      //   infoPageNum: 0
    }
  }

  componentDidMount() {
    
    const { data } = this.props.navigation.state.params

    this.state.tabKey = data.type === "notice" ? 1 : 0
  
    this.refresh()
    // } else {
    //   this.getSysList()
    //   this.getRecList()
    // }
  }

  componentWillReceiveProps(){

  }


  getSysList = (pn = 1) => {

    // if( JSON.stringify(this.state.oldPayload) === JSON.stringify(payload)){
    //   return null
    // }
    // this.state.oldPayload = payload

    this.props.dispatch({
      type: "app/noticeList",
      //   payload: {
      //     pn,
      //     ps: 10
      //   },
      callback: res => {
        if (res.msg === "OK") {
          let noticeList = []
          if (pn !== 1) {
            noticeList = [...this.state.noticeList, ...res.result.data]
          } else {
            noticeList = res.result.data
          }
          this.setState({
            noticeList
            // demandPageNum: res.result.pn
          })
        }
      }
    })

    // return null
  };

  getRecList = (pn = 1) => {
    // const { ids } = this.props.navigation.state.params
    this.props.dispatch({
      type: "app/recommendList",
      // payload: {
        // ...ids
        // pn,
        // ps: 10
      // },
      callback: res => {
        if (res.msg === "OK") {
          let recList = []
          if (pn !== 1) {
            recList = [...this.state.recList, ...res.result.data]
          } else {
            recList = res.result.data
          }
          this.setState({
            recList
            // infoPageNum: res.result.pn
          })
        }
      }
    })
  };

  refresh = (pn = 1) => {
    const { tabKey } = this.state
    if (tabKey === 0) {
      this.getRecList(pn)
    } else {
      this.getSysList(pn)
    }
  };

  read = (item, isRec) => {
    const { dispatch } = this.props
    const payload = { id: item.id }
    if(item.readed){
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: "MessageDetail",
          params: {
            name: item.title,
            data: item
          }
        })
        )
        return null
    }
    if (isRec) {
      dispatch({
        type: "app/recommendRead",
        payload,
        callback: () => {
          this.props.dispatch(
            NavigationActions.navigate({
              routeName: "MessageDetail",
              params: {
                name: item.title,
                data: item
              }
            })
          )
        }
      })
    } else {
      dispatch({
        type: "app/noticeRead",
        payload,
        callback: () => {
          this.props.dispatch(
            NavigationActions.navigate({
              routeName: "MessageDetail",
              params: {
                name: item.title,
                data: item
              }
            })
          )
        }
      })
    }
  };

  renderItem = (item, isRec) => (
    <TouchableOpacity onPress={() => this.read(item, isRec)} style={styles.card}>
      <View style={styles.carBody}>
        <Image
          resizeMode="contain"
          style={styles.carImg}
          source={item.pictureUrl?{uri:item.pictureUrl} :require("../../containers/img/img_logo.png")}
        />
        <View style={styles.cardRight}>
          <Text style={styles.cardTitle}>{item.title||"通知"}</Text>
          <Text style={styles.cardDes} ellipsizeMode="tail" numberOfLines={2}>
            {item.desc||"详情"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  onChange = index => {
    if (index === 0) {
      this.getRecList(1)
    } else {
      this.getSysList(1)
    }
    this.state.tabKey = index
  };

  render() {
    const { noticeList=[], recList=[], tabKey=0 } = this.state
    const { fetching } = this.props

    // 选择发布分类
    return (
      <View style={styles.container}>
        <Tabs
          page={tabKey}
          tabs={tabs}
          initialPage={0}
          styles={{ topTabBarSplitLine: "#000" }}
          onChange={(data, index) => {
            this.onChange(index)
          }}
          tabBarUnderlineStyle={{ backgroundColor: "#FF7720" }}
        >
          <View style={styles.content}>
            <FlatList
              data={recList}
              renderItem={({item}) => this.renderItem(item, true)}
              onRefresh={this.refresh}
              refreshing={fetching}
              // onEndReachedThreshold={0.2}
              // onEndReached={() => this.refresh(1)}
            />
          </View>
          <View style={styles.content}>
            <FlatList
              data={noticeList}
              renderItem={({item}) => this.renderItem(item)}
              onRefresh={this.refresh}
              refreshing={fetching}
              // onEndReachedThreshold={0.2}
              // onEndReached={() => this.refresh(1)}
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
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingVertical: 10,
    backgroundColor: "#FFF"
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
    flex:1,
    paddingHorizontal: 20,
    paddingRight:20,
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

export default Recommend
