/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native"
import {NavigationActions} from "react-navigation"
import { connect } from "react-redux"

@connect()
class ListItem extends Component {

  toDetail=()=>{
      const {title} = this.props
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: "Detail",
          params: { name:title }
        })
      )
  }

  render() {
    const { url, title, des, id } = this.props
    return (
      <TouchableOpacity key={id} onPress={this.toDetail}>
        <View style={styles.wrap}>
          <View style={styles.left}>
            {/* <Image source={{ uri: url }} style={styles.img} /> */}
          </View>
          <View style={styles.right}>
            <Text style={styles.title}>{title}</Text>
            <Text ellipsizeMode="tail" numberOfLines={2} style={styles.des}>
              {des}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    marginBottom: 15,
    flex: 1
  },
  left: {
    width: 65,
    height: 60
  },
  right: {
    height: 60,
    flex: 1
  },
  img: {
    width: 60,
    height: 60,
    backgroundColor: "#ddd",
    marginBottom: 5
  },
  title: {
    fontSize: 16,
    marginBottom: 5
  },
  des: {
    height: 40,
    fontSize: 12,
    color: "#727272"
  }
})
export default ListItem
