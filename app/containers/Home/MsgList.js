/* eslint-disable no-plusplus */
/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import {
  StyleSheet,
  Image,
  FlatList,
  View,
  ImageBackground,
  Text
} from "react-native"
import { WingBlank, List, Toast } from "@ant-design/react-native"
import { homeList } from "./data"
import ListItem from "../../components/ListIem/ListItem"
// const { Item } = List
// const { Brief } = Item

class MsgList extends Component {

  renderItem = ({ item }) => (
    <ListItem
      id={Math.random()}
      onPressItem={this.onPressItem}
      //   selected={!!this.state.selected.get(item.id)}
      title={item.title}
      url={item.url}
      des={item.des}
    />
  );

  render() {
    return (
      <View style={styles.wrap}>
        <View style={styles.head}>
          <ImageBackground
            style={styles.imgBg}
            source={require("../../images/title_bg.png")}
          >
            <Text style={styles.title}>猜你喜欢</Text>
          </ImageBackground>
        </View>

        <FlatList data={homeList} renderItem={this.renderItem} />

      </View>
    )
  }
}
const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#fff",
    paddingHorizontal:10,
  },
  head:{
    alignItems:"center",
    marginBottom:10,
  },
  
  imgBg: {
    width: 100,
    height: 25,
    marginTop:10,
    justifyContent: "center"
  },
  title: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginTop: 5,
  }
})
export default MsgList
