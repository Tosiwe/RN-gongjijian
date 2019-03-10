/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/AntDesign"

import { Picker, Toast } from "@ant-design/react-native"
import { connect } from "react-redux"
import { getPosition } from "../../utils/utils"

const area = require("./data.json")

// const FOUR_CITY = ["11", "50", "31", "12"]
@connect(({ app }) => ({ ...app }))
class LocationBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ["全国"]
    }
  }

  componentDidMount() {
    const that = { ...this }
    const { geoCode } = this.props
    if (geoCode) {
      this.setState({ name: [geoCode.city] })
    } else {
      getPosition(that, Toast).then(res => {
        if (res.isSuccess) {
          this.setState({ name: [res.params.city] })
        }
      })
    }
  }

  getArea = () => {
    const { geoCode } = this.props
    let name = []
    if(geoCode){
      name = [geoCode.city]
    }else{
       name  = this.state.name
    }
    
    if (name.length < 2) {
      return name[0]
    }

    if (name[1] === "市辖区") {
      return name[0]
    }
    return name[1]
  };

  onChangeArea = v => {
    const { onChange,cols,geoCode } = this.props
    const provice = v[0]
    const city = v[1]
    const label = []
    area.forEach(item => {
      if (item.value === provice) {
        label.push(item.label)
        item.children.forEach(i => {
          if (i.value === city) {
            label.push(i.label)
          }
        })
      }
    })
    if (onChange) {
      onChange({ code: v, name: label })
    }
    if(cols!==1){
      const code = {...geoCode}
      code.provice = label[0]
      code.city = label[1]
      code.shortAdcode = v[0]
      this.props.dispatch({
        type:"app/updateState",
        payload:{
          geoCode:code
        }
      })
    }
   
    this.setState({ name: label })
  };

  render() {
    const { button, cols } = this.props

    return (
      <Picker data={area} cols={cols || 2} onChange={this.onChangeArea}>
        {button || (
          <TouchableOpacity style={styles.cityButton}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ fontSize: 14, marginLeft: 5 }}
            >
              {this.getArea()}
            </Text>
            <Icon name="down" size={14} color="#000" />
          </TouchableOpacity>
        )}
      </Picker>
    )
  }
}

const styles = StyleSheet.create({
  cityButton: {
    height: 40,
    width: 73,
    flexDirection: "row",
    alignItems: "center"
  }
})
export default LocationBtn
