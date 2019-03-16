import React, { Component } from "react"
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from "react-native"
import { connect } from "react-redux"

@connect(({ app }) => ({ ...app }))
class LikeBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collected: false,
      time: 0
    }
  }

  componentDidMount() {
    this.state.time = 0
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.time === 0 &&
      nextProps.data.collected !== undefined &&
      this.state.collected !== nextProps.data.collected
    ) {
      this.setState({ collected: nextProps.data.collected })
      this.state.time += 1
    }
  }

  // 收藏
  like = () => {
    const { likeType } = this.props
    const { id } = this.props.data
    const { collected, } = this.state
    const ActionType = collected ? "app/cancelBookmark" : "app/saveBookmark"
    const payload = {recordId:id}
    if(!collected) payload.type= Number(likeType)
    this.props.dispatch({
      type: ActionType,
      payload,
      callback: res => {
        if (res.msg === "OK") {
          this.setState({ collected: !collected })
        }
      }
    })
  };


  render() {
    const { collected,  } = this.state

    return (
        <TouchableOpacity style={styles.cBtn} onPress={this.like}>
        <Image
          style={styles.cImg}
          source={
            collected
              ? require("./images/icon_collection_pressed.png")
              : require("./images/icon_collection.png")
          }
        />
        <Text style={styles.cText}>收藏</Text>
      </TouchableOpacity>
      )
  }
}

const styles = StyleSheet.create({
  cText: {
    color: "#727272",
    fontSize: 12
  },
  cBtn: {
    alignItems: "center",
    height: 60,
    justifyContent: "center"
  },
  cImg: {
    width: 20
  },
})

export default LikeBtn
