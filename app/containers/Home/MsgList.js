/* eslint-disable no-plusplus */
/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import {
  StyleSheet,
  FlatList,
  View,
  ImageBackground,
  Text
} from "react-native"
import { connect } from "react-redux"
import {NavigationActions} from "react-navigation"
import ListItem from "../../components/ListIem/ListItem"


@connect()

class MsgList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
    }
  }


  renderItem = ({ item }) => (
    <ListItem
      data={item}
    />
  );


componentDidMount=()=>{
  this.props.dispatch({
    type: "app/guesslikeList",
    payload:{
      ps:10,
      pn:1
    },
    callback: res => {
      if (res.msg === "OK") {
        this.setState({
          list: res.result
        })
      }
    }
  })
}

  render() {
    const {list}=this.state
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

        <FlatList data={list} renderItem={this.renderItem} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#fff",
    paddingHorizontal: 10
  },
  head: {
    alignItems: "center",
    marginBottom: 10
  },

  imgBg: {
    width: 100,
    height: 25,
    marginTop: 10,
    justifyContent: "center"
  },
  title: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginTop: 5
  }
})
export default MsgList
