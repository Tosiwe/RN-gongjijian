/* eslint-disable no-underscore-dangle */
import React, { Component } from "react"
import { connect } from "react-redux"
import { Modal, Toast } from "@ant-design/react-native"
import { StyleSheet, View, FlatList } from "react-native"
import ListItem from "../../components/ListIem/ListItem"

@connect(({ app }) => ({ ...app }))
class MyLike extends Component {
  static navigationOptions = {
    title: "我的收藏"
  };

  constructor(props) {
    super(props)
    this.state = {
      likeList: [],
      pageNum: 0
    }
  }

  componentDidMount() {
    this.getBookmark()
  }

  getBookmark = (pn = 1) => {
    this.props.dispatch({
      type: "app/getBookmark",
      payload: {
        pn,
        ps: 20
      },
      callback: res => {
        if (res.msg === "OK") {
          let likeList = []
          if (pn !== 1) {
            likeList = [...this.state.likeList, ...res.result.data]
          } else {
            likeList = res.result.data
          }
          this.setState({
            likeList,
            pageNum: pn
          })
        }
      }
    })
  };

  refresh = (pn = 1) => {
    // 等待页面布局完成以后，在让加载更多
    if (this.isCanLoadMore) {
      this.getBookmark(pn)
      this.isCanLoadMore = false // 加载更多时，不让再次的加载更多
    }
  };

  onRemove = data => {
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
      type: "app/cancelBookmark",
      payload: {
        recordId: data.id
      },
      callback: res => {
        Toast.success("删除成功", 3, this.refresh(), false)
      }
    })
  };

  renderItem = ({ item }) => (
    <View style={{ paddingHorizontal: 10 }}>
      <ListItem data={item} isMylike onRemove={this.onRemove} />
    </View>
  );

  render() {
    const { likeList, pageNum } = this.state
    const { fetching } = this.props
    // 选择发布分类
    return (
      <View style={styles.container}>
        <FlatList
          data={likeList}
          renderItem={this.renderItem}
          onRefresh={this.refresh}
          refreshing={fetching}
          onEndReachedThreshold={0.01}
          onEndReached={() => this.refresh(pageNum + 1)}
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
    height: "100%"
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

export default MyLike
