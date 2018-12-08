/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, StyleSheet, Dimensions, Image } from "react-native"
import { Carousel } from "antd-mobile-rn"
import { adsList } from "./data"

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
const { width } = Dimensions.get("window")
const styles = StyleSheet.create({
  ads: {},

  containerHorizontal: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 200
  },
  item: {
    width,
    height: 200
  }
})
export default Ads
