/* eslint-disable no-underscore-dangle */
import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, FlatList } from "react-native"
import { Modal,Toast } from "@ant-design/react-native"
import ListItem from "../../components/ListIem/ListItem"

@connect(({ app }) => ({ ...app }))
class MyDownload extends Component {
  static navigationOptions = {
    title: "我的下载"
  };

  constructor(props) {
    super(props)
    this.state = {
      likeList: [],
      pageNum:1
    }
  }

  componentDidMount() {
    this.getDownList()
  }

  getDownList = (pn = 1) => {
    this.props.dispatch({
      type: "app/getDownList",
        payload: {
          pn,
          ps: 10
        },
      callback: res => {
        if (res.msg === "OK" && res.result.data.length) {
          let likeList = []
          if (pn !== 1) {
            likeList = [...this.state.likeList, ...res.result.data]
          } else {
            likeList = res.result.data
          }
          this.setState({
            likeList,
            pageNum:pn
          })
        }
      }
    })
  };

  refresh = (pn = 1) => {
    this.getDownList(pn)
  };

  remove = data => {
    Modal.alert("移除", "您确定要移除吗？", [
      {
        text: "取消"
      },
      {
        text: "确认",
        onPress: () => this.delete(data)
      }
    ])
  };

  delete = data => {
    this.props.dispatch({
      type: "app/deleteDownload",
      payload: {
        id: data.id
      },
      callback:res=>{
        Toast.success("删除成功", 2,  this.refresh(), false)
      }
    })
  };

  renderItem = ({ item }) => (
    <View style={{ paddingHorizontal: 10 }}>
      <ListItem data={item} isDownload onRemove={this.remove} />
    </View>
  );

  render() {
    const { likeList ,pageNum} = this.state
    const { fetching } = this.props
    // 选择发布分类
    return (
      <View style={styles.container}>
        {/* {likeList.length && ( */}
        <FlatList
          data={likeList}
          renderItem={this.renderItem}
          onRefresh={this.refresh}
          refreshing={fetching}
          onEndReachedThreshold={0.2}
          onEndReached={() => this.refresh(pageNum+1)}
        />
        {/* )} */}
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
    paddingVertical: 10
  },
  carBody: {
    flexDirection: "row",
    paddingHorizontal: 10
  },
  carImg: {
    flex: 1,
    width: 70,
    height: 70
  },
  cardRight: {
    flex: 5,
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

export default MyDownload
