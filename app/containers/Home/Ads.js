/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, StyleSheet, Image,TouchableWithoutFeedback ,Linking} from "react-native"
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

  onOpen=(url)=>{
    const {isAds}= this.props
    if(isAds){
      Linking.openURL(url).catch(err => console.error('An error occurred', err))
    }
  }

  render() {
    const {data}= this.props
    const { list } = this.state
    const imgList =data||list
    return (
      <Carousel
        style={this.props.noRadius ? "" : styles.ads}
        selectedIndex={2}
        autoplay
        infinite
      >
        {imgList.length ? (
          imgList.map(item => (
            <TouchableWithoutFeedback onPress={()=>this.onOpen(item.link)} style={styles.containerHorizontal} key={Math.random()}>
              <Image
                style={this.props.noRadius?styles.detaiTtem:styles.item }
                imageStyle={{ borderRadius: 20 }}
                source={{
                  uri: item.url
                }}
              />
            </TouchableWithoutFeedback>
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
    height: 200,
  },
  detaiTtem: {
    width: screenWidth,
    height: 200,
    resizeMode:'contain'
  },
  block:{
    backgroundColor: "#DDD"
  },
})
export default Ads
