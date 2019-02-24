/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image,ScrollView } from "react-native"
import { List } from "@ant-design/react-native"
import Icon from "react-native-vector-icons/AntDesign"
import { connect } from "react-redux"
import { NavigationActions } from "react-navigation"
import { INS_MAP } from "../../utils/dataDic"

const { Item } = List
@connect(({ app }) => ({ ...app }))
class PayRecords extends Component {
  constructor(props) {
    super(props)
    this.state = {
      joinList: []
    }
  }

  componentDidMount() {
    debugger
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
        <List style={styles.list}>
          {joinList.map(item => (
            <Item
              key={item.id}
              label={10}
              //   onPress={() => this.toMyPublish(item)}
              //   arrow="horizontal"
              extra={`${item.amount}元`}
            >
              {item.subject}
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
export default PayRecords
