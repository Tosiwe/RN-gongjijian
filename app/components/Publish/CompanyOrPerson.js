/* eslint-disable no-unused-expressions */
import React, { Component } from "react"
import { connect } from "react-redux"
import { NavigationActions } from "react-navigation"

import { StyleSheet, View, Image, Text } from "react-native"
import { List, NoticeBar, Modal } from "@ant-design/react-native"

const { Item } = List
const { Brief } = Item

const COMPANY = [
  { title: "公司", id: "company", brief: "公司简介、公司业务等" },
  { title: "租赁", id: "rent", brief: "租赁相关信息" },
  { title: "材料供应", id: "material", brief: "材料供应相关信息" }
]

const PERSON = [
  { title: "人才", id: "talent", brief: "人才相关信息" },
  { title: "施工队伍", id: "team", brief: "施工队伍相关信息" },
  { title: "项目信息", id: "project", brief: "项目相关信息" }
]
@connect(({ app }) => ({ ...app }))
class CompanyOrPerson extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settleList: []
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: "app/settleList"
    })
  }

  componentWillReceiveProps(nextProps) {
    const { settleList: nextSettleList } = nextProps

    if (nextSettleList && nextSettleList.length) {
      const newSettleList = []
      nextSettleList.forEach(item=>{
        if(item.state===1)  newSettleList.push(item)
      })
      this.setState({ settleList: newSettleList })
    }
  }

  checkSettle = info => {
    const { settleList } = this.state
    const { id } = this.props.navigation.state.params
    const isSettled = settleList.some(item=>item.classifyId === id && item.subClassifyId === info.id)
    if (isSettled) {
      this.fillForm(info)
    } else {
      this.showDeleteModal(id,info.id)
    }
  };

  showDeleteModal = (id,sid) => {
    Modal.alert("提示", "您目前还未入驻该行业公司，请先入驻", [
      {
        text: "取消",
        // onPress: () => modal.close(),
        style: "取消"
      },
      { text: "马上入驻", onPress: () => this.toSettleForm(id, sid) }
    ])
  };

  toSettleForm = (id, sid) => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "SettleForm",
        params: {
          name: "新建入驻",
          classifyId: id,
          subClassifyId: sid
        }
      })
    )
  };

  fillForm = info => {
    const { name, id } = this.props.navigation.state.params
    const { dispatch } = this.props
    dispatch(
      NavigationActions.navigate({
        routeName: "FormInfo",
        params: {
          name: `${name}-${info.title}`,
          ids: { classifyId: id, subClassifyId: info.id }
        }
      })
    )
  };

  render() {
    // 选择发布分类
    return (
      <View style={styles.wrap}>
        <NoticeBar mode="closable">
          请正确选择发布信息分类，分类与信息不匹配将无法通过审核！
        </NoticeBar>
        <List
          style={styles.list}
          renderHeader={
            <View style={styles.listHeader}>
              <Image source={require("./images/icon_merchant.png")} />
              <Text style={styles.listHeaderText}>商家</Text>
            </View>
          }
        >
          {COMPANY.map(data => (
            <Item
              key={Math.random()}
              onPress={() => {
                  this.fillForm(data)
              }}
              style={styles.item}
              arrow="horizontal"
            >
              {data.title}
              <Brief style={styles.brief}>{data.brief}</Brief>
            </Item>
          ))}
        </List>
        <List
          style={styles.list}
          renderHeader={
            <View style={styles.listHeader}>
              <Image source={require("./images/icon_user.png")} />
              <Text style={styles.listHeaderText}>非商户（游客及个人）</Text>
            </View>
          }
        >
          {PERSON.map(data => (
            <Item
              key={Math.random()}
              onPress={() => this.fillForm(data)}
              style={styles.item}
              arrow="horizontal"
            >
              {data.title}
              <Brief style={styles.brief}>{data.brief}</Brief>
            </Item>
          ))}
        </List>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  list: {
    marginTop: 20
  },
  item: {
    paddingTop: 10
  },
  listHeader: {
    flexDirection: "row",
    paddingLeft: 15,
    paddingBottom: 10,
    alignItems: "center"
  },
  listHeaderText: {
    marginLeft: 5
  },
  brief: {
    fontSize: 12,
    paddingBottom: 10
  }
})

export default CompanyOrPerson
