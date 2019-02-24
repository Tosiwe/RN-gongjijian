/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, StyleSheet, Image } from "react-native"
import { Carousel } from "@ant-design/react-native"
import { connect } from "react-redux"
// import { adsList } from "./data"
import { screenWidth } from "../../styles/common"

@connect()
class Ads extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  componentDidMount = () => {
    this.props.dispatch({
      type: "app/bannerList",
      callback: res => {
        if (res.msg === "OK") {
          this.setState({
            list: res.result.data
          })
        }
      }
    })
  };

  render() {
    const { list } = this.state
    return (
      <Carousel
        style={this.props.noRadius ? "" : styles.ads}
        selectedIndex={2}
        autoplay
        infinite
      >
        {list.length ? (
          list.map(item => (
            <View style={styles.containerHorizontal} key={Math.random()}>
              <Image
                style={styles.item}
                imageStyle={{ borderRadius: 20 }}
                source={{
                  uri: item.url
                }}
              />
            </View>
          ))
        ) : (
          <Image
            style={[styles.item, styles.block]}
            imageStyle={{ borderRadius: 20 }}
          />
        )}
      </Carousel>
    )
  }
}
const styles = StyleSheet.create({
  ads: {
    borderRadius: 20
  },

  containerHorizontal: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 200
  },
  item: {
    width: screenWidth,
    height: 200
    // borderWidth: 1,
  },
  block:{
    backgroundColor: "#DDD"
  },
})
export default Ads
