import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { NavigationActions } from "react-navigation"

import IndustryEntry from "./IndustryEntry"
import SecondEntry from "./SecondEntry"
import RegisterEntry from "./RegisterEntry"
import PaperEntry from "./PaperEntry"

@connect()
class Entry extends Component {
  static navigationOptions ={
    title:"123",
    headerLeftContainerStyle:{color:"#000"},
  }
  
  constructor(props) {
    super(props)
    this.state = {
      type: 0
    }
  }

  componentWillMount() {
    const { type } = this.props.navigation.state.params
    this.setState({ type })
  }

  render() {
    const { type } = this.state
    // 各行业入口
    if (type < 9) {
      return (
        <View style={styles.container}>
          <IndustryEntry type={type} />
        </View>
      )
    }

    // 二手市场
    if (type === 9) {
      return (
        <View style={styles.container}>
         <SecondEntry type={type}/>
        </View>
      )
    }

    // 图纸下载
    if (type === 12) {
      return (
        <View style={styles.container}>
          <PaperEntry type={type} />
        </View>
      )
    }

    // 资质、注册人员
      return (
        <View style={styles.container}>
          <RegisterEntry type={type} />
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 40,
    // paddingLeft: 20,
    // paddingRight: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#eeeeee"
  }
})

export default Entry
