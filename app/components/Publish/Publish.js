import React, { Component } from "react"
import { connect } from "react-redux"

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  BackHandler
} from "react-native"
// import { Toast } from '@ant-design/react-native'
import { NavigationActions } from "react-navigation"
import Entries from "../Entries/Entries"

@connect()
class Publish extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate({
            routeName: "MyPublish",
            params: {
              name: "我的发布",
              type: navigation.state.params.type
            }
          })
        }
      >
        <Text style={{ fontSize: 16, marginRight: 20 }}>我的发布</Text>
      </TouchableOpacity>
    )
  });

  fillForm = el => {
    const { type: publishType } = this.props.navigation.state.params
    const { dispatch } = this.props
    if (publishType === 1) {
      // 发布需求全部跳转到FormDemand
      dispatch(
        NavigationActions.navigate({
          routeName: "FormDemand",
          params: { id: el.id, name: `${el.text}-需求编辑` }
        })
      )
    } else if (el.id === "smarket") {
      // 发布二手信息
      dispatch(
        NavigationActions.navigate({
          routeName: "Seconds",
          params: { id: el.id, name: el.text }
        })
      )
    } else if (el.id === "aptitude" || el.id === "reg") {
      // 发布资质信息
      dispatch(
        NavigationActions.navigate({
          routeName: "FormDemand",
          params: { id: el.id, name: el.text }
        })
      )
    } else {
      // 发布信息
      dispatch(
        NavigationActions.navigate({
          routeName: "CompanyOrPerson",
          params: { id: el.id, name: el.text }
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
  },
  right: {
    fontSize: 16,
    marginRight: 10
  }
})

export default Publish
