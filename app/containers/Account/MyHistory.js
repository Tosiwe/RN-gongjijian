/* eslint-disable no-underscore-dangle */
import React, { Component } from "react"
import { connect } from "react-redux"
import { Toast } from "@ant-design/react-native"
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text
} from "react-native"
import ListItem from "../../components/ListIem/ListItem"

@connect(({ app }) => ({ ...app }))
class MyHistory extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity onPress={() => navigation.state.params.navigatePress()}>
        <Text style={{ fontSize: 16, marginRight: 20 }}>清空</Text>
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props)
    this.state = {
      likeList: [],
      pageNum: 1
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ navigatePress: this.clear })

    this.getBookmark(1)
  }

  clear = () => {
    this.props.dispatch({
      type: "app/historyClean",
      callback: res => {
        Toast.success("清空成功", 3, this.getBookmark(1), false)
      }
    })
  };

  getBookmark = (pn = 1) => {
    // 等待页面布局完成以后，在让加载更多
    if (this.isCanLoadMore) {
      this.props.dispatch({
        type: "app/getHistory",
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
              pageNum:pn
            })
          }
        }
      })
      this.isCanLoadMore = false // 加载更多时，不让再次的加载更多
    }
  };


  renderItem = ({ item }) => (
    <View style={{ paddingHorizontal: 10 }}>
      <ListItem data={item} />
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
          onEndReachedThreshold={0.2}
          onEndReached={() => this.getBookmark(pageNum+1)}
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
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingVertical: 10
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

export default MyHistory
