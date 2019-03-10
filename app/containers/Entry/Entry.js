import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, TouchableOpacity, Text } from "react-native"
import LocationBtn from "../../components/LocationBtn/LocationBtn"

// import { NavigationActions } from 'react-navigation'

import IndustryEntry from "./IndustryEntry"
import SecondEntry from "./SecondEntry"
import RegisterEntry from "./RegisterEntry"
import PaperEntry from "./PaperEntry"

@connect()
class Entry extends Component {
  static navigationOptions = ({ navigation }) => {
    if (navigation.state.params.id !== "download") {
      return {
        headerRight: <LocationBtn />
      }
    } 
      return null
    
  };

  constructor(props) {
    super(props)
    this.state = {
      id: ""
    }
  }

  componentWillMount() {
    const { id } = this.props.navigation.state.params
    this.setState({ id })
  }

  render() {
    const { id } = this.state

    // 二手市场
    if (id === "smarket") {
      return (
        <View style={styles.container}>
          <SecondEntry id={id} />
        </View>
      )
    }

    // 图纸下载
    if (id === "download") {
      return (
        <View style={styles.container}>
          <PaperEntry id={id} />
        </View>
      )
    }

    // 资质、注册市场
    if (id === "aptitude" || id === "reg") {
      return (
        <View style={styles.container}>
          <RegisterEntry id={id} />
        </View>
      )
    }

    // 各行业入口
    return (
      <View style={styles.container}>
        <IndustryEntry id={id} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 40,
    // paddingLeft: 20,
    // paddingRight: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#eeeeee"
  }
})

export default Entry
