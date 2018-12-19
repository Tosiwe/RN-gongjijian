/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { StyleSheet,View } from "react-native"
import { Grid, WingBlank, Toast } from "@ant-design/react-native"
import { entriesData } from "./data"

class Entries extends Component {
  render() {
    return (
        <View style={styles.wrap}>
          <Grid
            data={entriesData}
            hasLine={false}
            columnNum={5}
            itemStyle={{ width: 80, height: 80 }}
            onPress={el => Toast.info(el.text, 1)}
            styles={styles}
          />
        </View>
    )
  }
}
const styles = StyleSheet.create({
  wrap: {
      backgroundColor:'#fff',
      marginTop:10,
      marginBottom:10,
      paddingTop:10,
      paddingBottom:10,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: "#ddd",
    marginBottom: 5
  }
})
export default Entries
