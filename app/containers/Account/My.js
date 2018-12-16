/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, StyleSheet } from "react-native"
import { Grid, Toast } from "antd-mobile-rn"
import { myList } from "./data"

class My extends Component {
  render() {
    return (
      <View>
        <Grid
          data={myList}
          hasLine={false}
          columnNum={4}
          onClick={el => Toast.info(el.text, 1)}
          styles={styles}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    backgroundColor: "#ddd",
    marginBottom: 5
  },
  text: {
    fontSize: 16
  }
})
export default My
