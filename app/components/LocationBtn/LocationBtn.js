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
@connect()
class LocationBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ["城市"]
    }
  }

  componentDidMount() {
    const that = { ...this }
    getPosition(that, Toast).then(res => {
      if (res.isSuccess) {
        this.setState({ name: [res.params.city] })
      }
    })
  }

  getArea = () => {
    const { name } = this.state
    if (name.length < 2) {
      return name[0]
    }

    if (name[1] === "市辖区") {
      return name[0]
    }
    return name[1]
  };

  onChangeArea = v => {
    const { onChange } = this.props
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
