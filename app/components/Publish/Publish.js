import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View } from "react-native"
// import { Toast } from '@ant-design/react-native'
import { NavigationActions } from "react-navigation"
import Entries from "../Entries/Entries"

@connect()
class Publish extends Component {
  componentDidMount() {
    // alert(
    //   this.props.navigation.state.params.type === 1 ? "发布需求" : "发布信息"
    // )
  }

  fillForm = el => {
    const { type: publishType } = this.props.navigation.state.params
    const { dispatch } = this.props
    if (publishType === 1) {
      // 发布需求
      dispatch(
        NavigationActions.navigate({
          routeName: "FormDemand",
          params: { type: el.type, name: "信息编辑" }
        })
      )
    } else if (el.type === 9) {
      // 发布二手信息
      dispatch(
        NavigationActions.navigate({
          routeName: "Seconds",
          params: { type: el.type, name: el.text }
        })
      )
    } else if (el.type === 10 || el.type === 11) {
      // 发布资质信息
      dispatch(
        NavigationActions.navigate({
          routeName: "FormDemand",
          params: { type: el.type, name: "信息编辑" }
        })
      )
    } else {
      // 发布信息
      dispatch(
        NavigationActions.navigate({
          routeName: "CompanyOrPerson",
          params: { type: el.type, name: el.text }
        })
      )
    }
  };

  render() {
    // 选择发布分类
    return (
      <View style={styles.wrap}>
        <Entries columnNum={4} onPress={this.fillForm} isPublish />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 20
  }
})

export default Publish
