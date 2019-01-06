/* eslint-disable no-unused-expressions */
import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, TouchableOpacity, Text } from "react-native"

@connect()
class Buttons extends Component {
  componentDidMount() {
    // alert(
    //   this.props.navigation.state.params.type === 1 ? "发布需求" : "发布信息"
    // )
  }

  onSave = () => {
    const { onSave } = this.props
    onSave && onSave()
  };

  onPublish = () => {
    const { onPublish } = this.props
    onPublish && onPublish()
  };

  render() {
    // 选择发布分类
    return (
        <View style={styles.btns}>
          <TouchableOpacity
            style={[styles.btn, styles.leftBtn]}
            onPress={this.onSave}
          >
            <Text style={styles.LeftBtnText}>保存</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.rightBtn]}
            onPress={this.onPublish}
          >
            <Text style={styles.rightBtnText}>发布</Text>
          </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  btns: {
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical:10,
    backgroundColor:"#FFF",
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FF7725",
    alignItems: "center"
  },
  leftBtn: {
    flex: 1,
    marginRight: 10
  },
  rightBtn: {
    flex: 2,
    marginLeft: 10,
    backgroundColor: "#FF7725"
  },
  rightBtnText: {
    color: "#FFF"
  },
  LeftBtnText: {
    color: "#FF7725"
  }
})

export default Buttons
