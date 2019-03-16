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
import {  Modal } from "@ant-design/react-native"
import Icon from "react-native-vector-icons/AntDesign"


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
        if (res.msg === "OK"&& res.result.data.length) {
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
          this.refresh()
        }
      }
    })
  };

  refresh = (pn = 1) => {
    this.getInfoList(pn)
  };

  renderItem = ({ item }) => (
    <View style={styles.card} full>
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
          <Text
            style={styles.btnText}
            onPress={() => this.showDeleteModal(item.id)}
          >
            删除
          </Text>
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
          onEndReachedThreshold={1}
          onEndReached={() => this.refresh(infoPageNum+1)}
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
