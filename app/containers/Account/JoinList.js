/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { List, Toast } from "antd-mobile-rn"
import Icon from "react-native-vector-icons/AntDesign"
import { joinList } from "./data"

const { Item } = List
const { Brief } = Item

class JoinList extends Component {
  render() {
      
    return (
      <View>
        <View style={styles.listHeader}>
          <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:17,color:"#006030"}}>我的入住</Text>
          </View>
          <TouchableOpacity style={{flexDirection:'row'}}>
            <Text style={{fontSize:17, color:'orange'}} >继续入住</Text> <Icon name="plus" color="orange" size={17} />
          </TouchableOpacity>
        </View>
        <List>
          {joinList.map(item => (
            <Item key={Math.random()} thumb={item.url} arrow="horizontal">
              {item.title}
            </Item>
          ))}
        </List>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    listHeader:{
        flexDirection:'row',
        justifyContent:"space-between",
        paddingLeft:10,
        paddingRight:10,
        marginTop:20,
        marginBottom:15,
    },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: "#ddd",
    marginBottom: 5
  },
  text: {
    fontSize: 16
  }
})
export default JoinList
