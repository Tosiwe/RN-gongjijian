/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import {
  View,
  StyleSheet,
  Image,
  ScrollView
} from "react-native"
import { List,ActivityIndicator } from "@ant-design/react-native"
import { connect } from "react-redux"
import moment from "moment"

const { Item } = List
const {Brief} = Item

const PAY_MAP = {
  0: require(`./images/icon_recharge.png`),
  1: require(`./images/icon_consumption.png`)
}
@connect(({ app }) => ({ ...app }))
class PayRecords extends Component {
  constructor(props) {
    super(props)
    this.state = {
      joinList: []
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: "app/getOrderList",
      callback: res => {
        if (res.msg === "OK") {
          this.setState({ joinList: res.result.data })
        }
      }
    })
  }

  render() {
    const { joinList } = this.state
    return (
      <ScrollView style={styles.wrap}>
      <ActivityIndicator animating={this.props.fetching} text="正在加载" />
        <List style={styles.list}>
          {joinList.map(item => (
            <Item
              thumb={
                <Image style={styles.icon} source={PAY_MAP[item.expense]} />
              }
              key={item.id}
              label={10}
              extra={`${item.amount}元`}
            >
              {item.subject}
              <Brief>{ moment( item.createTime).format("YYYY-MM-DD HH:mm:ss")}</Brief>
            </Item>
          ))}
        </List>
        <View style={styles.bottom} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#fff"
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
    height: 30,
    marginRight: 10
  },
  text: {
    fontSize: 16
  },
  bottom: {
    height: 60,
    borderRadius: 20
  }
})
export default PayRecords
