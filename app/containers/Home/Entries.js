/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from 'react'
import { View, StyleSheet,Text ,TouchableOpacity,TextInput} from "react-native"
import { Grid ,WingBlank} from "antd-mobile-rn"
import {entriesData} from "./data"

class Entries extends Component {


  render() {
    return (
      <WingBlank >
          <Grid data={entriesData} hasLine={false}itemStyle={{ width: 40 }} />
    </WingBlank>
    )
  }
}
const styles = StyleSheet.create({
})
export default Entries
