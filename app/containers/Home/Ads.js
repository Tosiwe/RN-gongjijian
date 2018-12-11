/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, StyleSheet, Image } from "react-native"
import { Carousel } from "antd-mobile-rn"
import { adsList } from "./data"
import {screenWidth} from '../../styles/common'

class Ads extends Component {
  render() {
    return (
      <Carousel style={styles.ads} selectedIndex={2} autoplay infinite>
        {adsList.map(item => (
          <View style={styles.containerHorizontal}>
            <Image
              style={styles.item}
              source={{
                uri: item.url
              }}
            />
          </View>
        ))}
      </Carousel>
    )
  }
}
const styles = StyleSheet.create({
  ads: {},

  containerHorizontal: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 200
  },
  item: {
    width:screenWidth,
    height: 200
  }
})
export default Ads
