/* eslint-disable react/sort-comp */
import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View } from "react-native"
import {  Modal } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"

import Entries from "../Entries/Entries"


@connect()
class Settle extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  toSettleForm=(id,sid)=>{
      this.props.dispatch(NavigationActions.navigate({
          routeName:"SettleForm",
          params:{
              name:"新建入驻",
              classifyId:id,
              subClassifyId:sid,
          }
      }))
  }

  fillForm = (id) => {
    Modal.operation([
      { text: "公司", onPress: () => this.toSettleForm(id,"company") },
      { text: "材料供应", onPress: () => this.toSettleForm(id,"material") },
      { text: "设备租赁", onPress: () => this.toSettleForm(id,"rent") }
    ])
  };

  render() {
    // 选择发布分类
    return (
      <View style={styles.wrap}>
          <Entries columnNum={3} itemStyle={styles.itemStyle} onPress={ele=>this.fillForm(ele.id)} isSettle/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10
  },
  itemStyle:{
      height:80
  }
})

export default Settle
