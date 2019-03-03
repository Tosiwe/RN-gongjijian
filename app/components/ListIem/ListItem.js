/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native"
import { NavigationActions } from "react-navigation"
import { connect } from "react-redux"
import moment from "moment"
import {INS_MAP} from "../../utils/dataDic"

@connect()
class ListItem extends Component {
  toDetail = () => {
    const { data } = this.props
    console.log("List Item",data)
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Detail",
        params: {
          name: data.title,
          data
        }
      })
    )
  };

  render() {
    const { data } = this.props
    return (
      <TouchableOpacity style={styles.container} key={data.id} onPress={this.toDetail}>
        <View style={styles.wrap}>
          <View style={styles.left}>
            <Image source={{ uri: data.picture1 }} style={styles.img} />
          </View>
          <View style={styles.right}>
            <Image source={INS_MAP[data.classifyId].icon } style={styles.icon}/>
            <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1} >{data.title}</Text>
            <Text ellipsizeMode="tail" numberOfLines={2} style={styles.des}>
              {data.desc}
            </Text>
            <View style={{flexDirection:'row', justifyContent:"space-between"}}>
              <Text style={{fontSize:12}}>{moment(data.updateTime).format("YYYY-MM-DD HH:mm:ss")}</Text>
              <Text style={{fontSize:12}} ellipsizeMode="tail" numberOfLines={1} >{data.city||"区域：未知"}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    marginVertical:5,
  },
  wrap: {
    flexDirection: "row",
    paddingVertical: 10,
    flex: 1,
    borderTopWidth:1,
    borderTopColor:'#EEEEEE',
  },
  left: {
    width: 75,
    height: 70
  },
  right: {
    height: 70,
    flex: 1
  },
  img: {
    width: 70,
    height: 70,
    backgroundColor: "#ddd",
    marginBottom: 5
  },
  title: {
    fontWeight:'400',
    fontSize: 16,
    // marginBottom: 5
  },
  des: {
    height: 30,
    fontSize: 12,
    color: "#727272"
  },
  icon:{
    width:20,
    height:20,
    right:0,
    position:"absolute",
  }
})
export default ListItem
