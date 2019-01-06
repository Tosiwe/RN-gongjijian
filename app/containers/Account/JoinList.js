/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { List } from '@ant-design/react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { joinList } from './data'

const { Item } = List

class JoinList extends Component {
  render() {
    return (
      <View style={styles.wrap}>
        <View style={styles.listHeader}>
          <View style={{ flexDirection: 'row', marginLeft: 5 }}>
            <Image source={require('./images/icon_join.png')} />
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 20 }}>
              我的入住
            </Text>
          </View>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 14, color: 'orange' }}>继续入住</Text>
            <Icon name="plus" color="orange" size={14} />
          </TouchableOpacity>
        </View>
        <List style={styles.list}>
          {joinList.map(item => (
            <Item key={Math.random()} thumb={item.url} arrow="horizontal">
              {item.title}
            </Item>
          ))}
        </List>
        <View style={styles.bottom} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
    top: -100,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    marginBottom: 15,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: '#ddd',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
  },
  bottom: {
    height: 60,
    borderRadius: 20,
  },
})
export default JoinList
