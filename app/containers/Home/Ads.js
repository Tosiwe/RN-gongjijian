/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from 'react'
import { View, StyleSheet,Text } from "react-native"
import { Carousel } from "antd-mobile-rn"

class Ads extends Component {

  render() {
    return (
        <Carousel
          style={styles.ads}
          selectedIndex={2}
          autoplay
          infinite
        >
        <View style={[styles.containerHorizontal, { backgroundColor: 'red' }]}>
              <Text>Carousel 1</Text>
            </View>
            <View style={[styles.containerHorizontal, { backgroundColor: 'blue' }]}>
              <Text>Carousel 2</Text>
            </View>
            <View style={[styles.containerHorizontal, { backgroundColor: 'yellow' }]}>
              <Text>Carousel 3</Text>
            </View>
            <View style={[styles.containerHorizontal, { backgroundColor: 'aqua' }]}>
              <Text>Carousel 4</Text>
            </View>
        </Carousel>
    )
  }
}
const styles = StyleSheet.create({
  ads:{},
  
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  }
})
export default Ads
