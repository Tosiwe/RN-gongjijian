/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput
} from "react-native"
import Icon from "react-native-vector-icons/AntDesign"

import { Picker, List } from "@ant-design/react-native"

const area = require("./data.json")

class Top extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: [],
      area:'城市'
    }
  }

  onChangeArea=v=>{
    this.setState({area:v})
  }

  render() {
    return (
      <View style={styles.top}>
        {/* <TouchableOpacity style={styles.cityButton} onPress={this.onPress}>
          <Icon name="down" size={10} color="#000" />
          <Text>城市</Text>
         
        </TouchableOpacity> */}
        <List>
          <Picker
            data={area}
            cols={3}
            value={this.state.value}
            onChange={this.onChangeArea}
          >
            <AreaBtn area={this.state.area}/>
          </Picker>
        </List>

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
const AreaBtn = props => (
  <TouchableOpacity style={styles.cityButton} onPress={props.onPress}>
    <Icon name="down" size={10} color="#000" />
    <Text>{props.area}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    height: 40,
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10
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
    height: 30,
    margin: 5,
    borderRadius: 10,
    borderStyle: "solid"
    // backgroundColor:'blue',
  }
})
export default Top
