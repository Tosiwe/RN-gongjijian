import React, { Component } from 'react'
import { connect } from 'react-redux'

import { StyleSheet, View, Text, Image, FlatList } from 'react-native'
import { Tabs } from '@ant-design/react-native'
import { list } from './data'
import { screenWidth } from '../../styles/common'

const tabs = [
  { title: '房建' },
  { title: '钢结构' },
  { title: '桥梁隧道' },
  { title: '高速公路' },
  { title: '铁路' },
  { title: '园林' },
  { title: '装修装饰' },
  { title: '光伏电建' },
  { title: '船舶港口' },
]

@connect()
class PaperEntry extends Component {
  //   constructor(props) {
  //     super(props)
  //   }

  renderItem = ({ item }) => (
    <View style={styles.wrap}>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.infoText}>
          {item.des}
        </Text>
      </View>
      <Image style={styles.img} source={{ uri: item.url }} />
    </View>
  )

  render() {
    // const { type } = this.props
    return (
      <View style={styles.container}>
        <Tabs
          tabs={tabs}
          styles={{ topTabBarSplitLine: '#000' }}
          tabBarUnderlineStyle={{ backgroundColor: '#FF7720' }}
          // renderTab={tab=>(<Text style={{color:"red",borderBottomWidth:0}}>123</Text>   )}
        >
          <View style={styles.content}>
            <FlatList data={list} renderItem={this.renderItem} />
          </View>
          <View style={styles.content}>
            <FlatList data={list} renderItem={this.renderItem} />
          </View>
          <View style={styles.content}>
            <FlatList data={list} renderItem={this.renderItem} />
          </View>
          <View style={styles.content}>
            <FlatList data={list} renderItem={this.renderItem} />
          </View>
          <View style={styles.content}>
            <FlatList data={list} renderItem={this.renderItem} />
          </View>
          <View style={styles.content}>
            <FlatList data={list} renderItem={this.renderItem} />
          </View>
          <View style={styles.content}>
            <FlatList data={list} renderItem={this.renderItem} />
          </View>
          <View style={styles.content}>
            <FlatList data={list} renderItem={this.renderItem} />
          </View>
          <View style={styles.content}>
            <FlatList data={list} renderItem={this.renderItem} />
          </View>
        </Tabs>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 10,
  },
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
  wrap: {
    flexDirection: 'row',
    // borderTopWidth: 1,
    // borderTopColor: "#DDD",
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    padding: 10,
  },
  info: {
    width: screenWidth - 100,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  infoText: {
    color: '#727272',
    fontSize: 12,
  },
  img: {
    width: 30,
    height: 30,
    marginLeft: 20,
  },
})

export default PaperEntry
