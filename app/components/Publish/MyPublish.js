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
import { Modal } from "@ant-design/react-native"
import Icon from "react-native-vector-icons/AntDesign"
import { NavigationActions } from "react-navigation"

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
    text: "已删除"
  }
}

@connect(({ app }) => ({ ...app }))
class MyPublish extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    if (params.ids) {
      return {
        headerRight: (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate({
                routeName: "FormInfo",
                params
              })
            }
          >
            <Icon name="plus" style={{ fontSize: 20, marginRight: 20 }} />
          </TouchableOpacity>
        )
      }
    }
    return null
  };

  constructor(props) {
    super(props)
    this.state = {
      infoList: [],
      infoPageNum: 0
    }
  }

  componentDidMount() {
    this.getInfoList()
  }

  getInfoList = (pn = 1) => {
    const { ids } = this.props.navigation.state.params
    const type = ids ? "app/getInfoListById" : "app/getInfoList"
    this.props.dispatch({
      type,
      payload: {
        ...ids,
        pn,
        ps: 10
      },
      callback: res => {
        if (res.msg === "OK") {
          let infoList = []
          if (pn !== 1) {
            infoList = [...this.state.infoList, ...res.result.data]
          } else {
            infoList = res.result.data
          }
          this.setState({
            infoList,
            infoPageNum: pn
          })
        }
      }
    })
  };

  onAction = (state, id) => {
    if (Number(state) === 0) {
      // 发布
      this.props.dispatch({
        type: "app/reviewInfo",
        payload: { id },
        callback: res => {
          if (res.msg === "OK") {
            this.getInfoList()
          }
        }
      })
    } else {
      // 下架
      this.props.dispatch({
        type: "app/draftInfo",
        payload: { id },
        callback: res => {
          if (res.msg === "OK") {
            this.isCanLoadMore = true
            this.refresh()
          }
        }
      })
    }
  };

  showDeleteModal = id => {
    Modal.alert("删除", "您确定要删除吗？", [
      {
        text: "取消",
        // onPress: () => modal.close(),
        style: "cancel"
      },
      { text: "确认", onPress: () => this.onDelete(id) }
    ])
  };

  onDelete = id => {
    // 删除
    this.props.dispatch({
      type: "app/deleteInfo",
      payload: { id },
      callback: res => {
        if (res.msg === "OK") {
          this.isCanLoadMore = true
          this.refresh()
        }
      }
    })
  };

  refresh = (pn = 1) => {
     // 等待页面布局完成以后，在让加载更多
     if (this.isCanLoadMore) {
      this.getInfoList(pn)
      this.isCanLoadMore = false // 加载更多时，不让再次的加载更多
    }
    
  };

  
  toDetail = data => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Detail",
        params: {
          name: data.title,
          data
        }
      })
    )
  };

  renderItem = ({ item }) => (
    <View style={styles.card} full>
      <TouchableOpacity
        disabled={item.state === 3 && true}
        onPress={() => this.toDetail(item)}
        style={styles.carBody}
      >
        <View style={{ width: 70, height: 70, padding: 5 }}>
          <Image
            // resizeMode="contain"
            style={styles.carImg}
            source={
              item.picture1
                ? { uri: item.picture1 }
                : require("../../containers/Account/images/logo.png")
            }
          />
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDes} ellipsizeMode="tail" numberOfLines={2}>
            {item.desc}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.carFoot}>
        <TouchableOpacity
          style={styles.btn}
          disabled={item.state === 3 && true}
        >
          <Text style={styles.btnText}>刷新</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={item.state === 3 && true}
          style={[styles.btn, styles.midBtn]}
          onPress={() => this.onAction(item.state, item.id)}
        >
          <Text style={styles.btnText}>{RECORD_STATE[item.state].text}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          disabled={item.state === 3 && true}
          onPress={() => this.showDeleteModal(item.id)}
        >
          <Text style={styles.btnText}>删除</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  render() {
    const { infoList, infoPageNum } = this.state
    const { fetching } = this.props
    // const { type: publishType, ids } = this.props.navigation.state.params

    // 选择发布分类
    return (
      <View style={styles.container}>
        <FlatList
          data={infoList}
          renderItem={this.renderItem}
          onRefresh={this.refresh}
          refreshing={fetching}
          onEndReachedThreshold={0.2}
          onEndReached={() => this.refresh(infoPageNum + 1)}
          onContentSizeChange={() => {
            this.isCanLoadMore = true // flatview内部组件布局完成以后会调用这个方法
          }}
        />
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
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingVertical: 10,
    backgroundColor: "#FFF",
    marginBottom: 10
  },
  carBody: {
    flexDirection: "row",
    paddingHorizontal: 10
  },
  carImg: {
    width: 60,
    height: 60
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
