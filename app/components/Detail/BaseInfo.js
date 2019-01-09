import React, { Component } from "react"
import { StyleSheet, View, Image, Text } from "react-native"

import { connect } from "react-redux"

@connect()
class BaseInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // refreshing: false
    }
  }

  render() {
    const Td = (props) => (
      <View style={styles.td}>
        <Text style={styles.tdLabel}>{props.label}</Text>
        <Text style={styles.tdText}>{props.text}</Text>
      </View>
    )

    return (
      <View style={styles.BaseInfo}>
        <View style={styles.row}>
          <Td label="业务名称" text="房屋建筑设计"/>
        </View>
        <View style={styles.row}>
          <Td label="地域" text="河北"/>
          <View style={styles.locWrap}>
            <Image style={styles.location} source={require("./images/icon_location.png")} />
          </View>
        </View>
        <View style={styles.row} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    borderTopWidth: 1,
    // borderBottomWidth: 1,
    borderColor:"#DDD",
    paddingVertical: 20,
    marginHorizontal:20,
    flexDirection:"row"
  },
  td: {
    flexDirection: "row"
  },
  tdLabel: {
    color: "#727272",
    marginRight: 10,
    width:60,
  },
  tdText: {},
  locWrap:{
    position:"absolute",
    right:10
  },
  location:{
    width:30,
    height:30,
  }
})

export default BaseInfo
