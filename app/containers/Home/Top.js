/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from 'react'
import { View, StyleSheet,Text ,TouchableOpacity,TextInput} from "react-native"
import Icon from "react-native-vector-icons/AntDesign"

class Top extends Component {

  render() {
    return (
      <View style={styles.top}>
        <TouchableOpacity style={styles.cityButton} onPress={this.onPress}>
          <Icon name="down" size={10} color="#000" />
          <Text>城市</Text>
        </TouchableOpacity>
        <TextInput style={styles.searchBar}>
          <Icon
            name="search1"
            size={16}
            color="#999"
            style={{ marginRight: 10 }}
          />
        </TextInput>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    top: {
        flexDirection: "row",
        height: 40,
        backgroundColor:'#fff',
        paddingLeft:10,
        paddingRight:10,
      },
      cityButton: {
        height: 40,
        width: 40,
        flexDirection: "row",
        alignItems: "center"
      },
      searchBar: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#999",
        paddingLeft: 3,
        height:30,
        margin: 5,
        borderRadius: 10,
        borderStyle: "solid"
        // backgroundColor:'blue',
      },
})
export default Top
