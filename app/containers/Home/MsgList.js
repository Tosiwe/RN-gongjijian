/* eslint-disable no-plusplus */
/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import {
  StyleSheet,
  FlatList,
  View,
  ImageBackground,
  Text,
  TouchableOpacity
} from "react-native"
import { connect } from "react-redux"
import {Toast}from "@ant-design/react-native"
import Icon from "react-native-vector-icons/AntDesign"
import ListItem from "../../components/ListIem/ListItem"

@connect()
class MsgList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      refreshing: false,
    }
  }

  componentDidMount = () => {
    this.getList()
  };
  
componentWillReceiveProps(nextProps){
  if(nextProps.guesslikePage !== this.state.guesslikePage){
    this.state.guesslikePage = nextProps.guesslikePage
    this.getList(nextProps.guesslikePage)
  }
}

  getList = (pn = 1) => {
    const { list } = this.state
    this.setState({ refreshing: true })
    this.props.dispatch({
      type: "app/guesslikeList",
      payload: {
        ps: 20,
        pn
      },
      callback: res => {
        if (res.msg === "OK" && res.result && res.result.length) {
          const newList = [...list, ...res.result]
          this.setState({
            list: newList
          })
        }
        this.setState({ refreshing: false })
      }
    })
  };

  renderItem = ({ item }) => <ListItem data={item} isGuessLike />;

  render() {
    const { list, refreshing } = this.state
    return (
      <View style={styles.wrap}>
        <View style={styles.head}>
          <TouchableOpacity style={styles.reload} onPress={()=>this.getList(1)}>
            <Icon name="reload1" size={20} />
          </TouchableOpacity>
          <ImageBackground
            style={styles.imgBg}
            source={require("../../images/title_bg.png")}
          >
            <Text style={styles.title}>猜你喜欢</Text>
          </ImageBackground>
        </View>

        <FlatList
          // style={{ backgroundColor: "#EEE" }}
          refreshing={refreshing}
          data={list}
          renderItem={this.renderItem}
          onRefresh
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  reload: {
    position: "absolute",
    left: 5,
    top: 13
  },
  wrap: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  head: {
    // flexDirection: "row",
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
