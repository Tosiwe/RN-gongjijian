/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Carousel } from '@ant-design/react-native'
import { adsList } from './data'
import { screenWidth } from '../../styles/common'

class Ads extends Component {
  render() {
    return (
      <Carousel style={this.props.noRadius ? "":styles.ads} selectedIndex={2} autoplay infinite>
        {adsList.map(item => (
          <View style={styles.containerHorizontal} key={Math.random()}>
            <Image
              style={styles.item}
              imageStyle={{ borderRadius: 20 }}
              source={{
                uri: item.url,
              }}
            />
          </View>
        ))}
      </Carousel>
    )
  }
}
const styles = StyleSheet.create({
  ads: {
    borderRadius: 20,
  },

  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  item: {
    width: screenWidth,
    height: 200,
    // borderWidth: 1,
  },
})
export default Ads
