import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View } from "react-native"
import { Toast } from "@ant-design/react-native"
import Entries from "../Entries/Entries"

@connect()
class Publish extends Component {
  componentDidMount() {
    alert(
      this.props.navigation.state.params.type === 1 ? "发布需求" : "发布信息"
    )
  }

  fillForm = el => {
    Toast.info(el.type)
  };

  render() {
    // 选择发布分类
    return (
      <View style={styles.wrap}>
        <Entries columnNum={4} onPress={this.fillForm} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 20,
    
  }
})

export default Publish
