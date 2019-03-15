/* eslint-disable react/sort-comp */
import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, Text } from "react-native"
import Picker from "../ImagePicker/ImagePicker"

@connect()
class CommonFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
 

  handleInput=(params,str)=>{
    debugger
  if(str === "bisLicenseUrl"){
    this.props.onChange({bisLicenseUrl:params.picture1})
  }else{
    this.props.onChange(params)
  }
}

  render() {
    // 选择发布分类
    return (
      <View style={styles.wrap}>
        <Text style={{marginTop:15,marginBottom:5, marginLeft:15}}><Text style={{ color: "red" }}>*</Text>营业执照</Text>
        <Picker maxLength={1} onChange={v => this.handleInput(v, "bisLicenseUrl")} />
        <Text style={{marginTop:15,marginBottom:5,marginLeft:15}}>产品图片</Text>
        <Picker maxLength={2} onChange={v => this.handleInput(v, "picture")} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    // marginVertical: 10,
    // backgroundColor: "#FFF"
  }
})

export default CommonFile
