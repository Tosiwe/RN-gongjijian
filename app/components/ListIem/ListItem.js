/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

class ListItem extends Component {
  render() {
    const { url, title, des, id } = this.props
    return (
      <View style={styles.wrap} key={id}>
        <View style={styles.left}>
          <Image source={{ uri: url }} style={styles.img} />
        </View>
        <View style={styles.right}>
          <Text style={styles.title}>{title}</Text>
          <Text ellipsizeMode="tail" numberOfLines={2} style={styles.des}>
            {des}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    marginBottom: 15,
    flex: 1,
  },
  left: {
    width: 65,
    height: 60,
  },
  right: {
    height: 60,
    flex: 1,
  },
  img: {
    width: 60,
    height: 60,
    backgroundColor: '#ddd',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  des: {
    height: 40,
    fontSize: 12,
    color: '#727272',
  },
})
export default ListItem
