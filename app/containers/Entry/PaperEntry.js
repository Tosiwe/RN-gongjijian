import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { NavigationActions } from "react-navigation"

@connect()
class PaperEntry extends Component {

//   constructor(props) {
//     super(props)
//   }

  render() {
    const { type } = this.props
    return (
      <View style={styles.container}>
        <Text>PaperEntry {type}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#eeeeee"
  }
})

export default PaperEntry
