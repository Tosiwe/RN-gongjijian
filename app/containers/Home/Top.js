/* eslint-disable prefer-destructuring */
/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/AntDesign"

import { Picker, List, Button } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"
import { connect } from "react-redux"

const area = require("./data.json")

const FOUR_CITY = ["11", "50", "31", "12"]
@connect()
class Top extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: [],
      area: "城市"
    }
  }

  onChangeArea = v => {
    const provice = v[0]
    const city = v[1]
    let label = ""
    area.forEach(item => {
      if (item.value === provice) {
        if (FOUR_CITY.includes(provice)) {
          label = item.label
        } else {
          item.children.forEach(i => {
            if (i.value === city) {
              label = i.label
            }
          })
        }
      }
    })
    this.setState({ area: label.substr(0, label.length - 1) })
  };

  toSearch = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: "Search" }))
  };

  render() {
    return (
      <View style={styles.top}>
        <Picker
          data={area}
          cols={2}
          value={this.state.value}
          onChange={this.onChangeArea}
        >
          <AreaBtn area={this.state.area} />
        </Picker>

        <TouchableOpacity style={styles.searchBar} onPress={this.toSearch}>
          <Icon
            name="search1"
            size={16}
            color="#000000"
            style={{ width: 20 }}
          />
          <Text style={{ color: "#636363", fontSize: 14 }}>搜索</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const AreaBtn = props => (
  <TouchableOpacity style={styles.cityButton} onPress={props.onPress}>
    <Text style={{ fontSize: 14, marginLeft: 5 }}>{props.area}</Text>
    <Icon name="down" size={14} color="#000" />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    height: 40,
    backgroundColor: "#fff",
    marginBottom: 10
  },
  cityButton: {
    height: 40,
    width: 73,
    flexDirection: "row",
    alignItems: "center"
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingLeft: 3,
    height: 30,
    margin: 5,
    borderRadius: 30
    // shadowColor: '#000',
    // shadowOffset: { width: -1, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    // elevation: 4
  }
})
export default Top
