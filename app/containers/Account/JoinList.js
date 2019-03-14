/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native"
import { List } from "@ant-design/react-native"
import Icon from "react-native-vector-icons/AntDesign"
import { connect } from "react-redux"
import { NavigationActions } from "react-navigation"
import { INS_MAP } from "../../utils/dataDic"

const { Item } = List
@connect(({ app }) => ({ ...app }))
class JoinList extends Component {
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
      this.setState({ settleList: nextSettleList })
    }
  }

  ToSettle = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Settle",
        params: {
          name: "入驻行业"
        }
      })
    )
  };

  toVip = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: "Vip" }))
  };


  toMyPublish = item => {
    const ids = {
      classifyId: item.classifyId,
      subClassifyId: item.subClassifyId
    }
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "MyPublish",
        params: {
          ids,
          name: `${INS_MAP[item.classifyId].name}-${
            INS_MAP[item.subClassifyId].name
          }`
        }
      })
    )
  };

  render() {
    const { settleList } = this.state
    const { userFinance={} } = this.props
    return (
      <View style={styles.wrap}>
        <View style={styles.listHeader}>
          <View style={{ flexDirection: "row", marginLeft: 5 }}>
            <Image source={require("./images/icon_join.png")} />
            <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 20 }}>
              我的入驻
            </Text>
            <TouchableOpacity
            style={{ flexDirection: "row" ,marginLeft:10}}
            activeOpacity={1}
            onPress={userFinance.superVip ? null: this.toVip}
          >
            <Text style={{ fontSize: 14, color: "#009688" }}>{userFinance.superVip ? '已是超级商家': '成为超级商家'}</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={this.ToSettle}
          >
            <Text style={{ fontSize: 14, color: "orange" }}>继续入驻</Text>
            <Icon name="plus" color="orange" size={14} />
          </TouchableOpacity>
        </View>
        <List style={styles.list}>
          {settleList.map(item => {
            if (item.state === 1) {
              return (
                <Item
                  key={item.id}
                  thumb={
                    <Image
                      style={styles.icon}
                      source={INS_MAP[item.classifyId].icon}
                    />
                  }
                  onPress={() => this.toMyPublish(item)}
                  arrow="horizontal"
                >
                  {`${INS_MAP[item.classifyId].name}-${
                    INS_MAP[item.subClassifyId].name
                  }`}
                </Item>
              )
            }
            return null
          })}
        </List>
        <View style={styles.bottom} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: "#FFF",
    borderRadius: 10,
    top: -100
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    marginBottom: 15
  },
  icon: {
    width: 30,
    height: 30
  },
  text: {
    fontSize: 16
  },
  bottom: {
    height: 60,
    borderRadius: 20
  }
})
export default JoinList
