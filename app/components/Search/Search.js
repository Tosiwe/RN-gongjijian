import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { SearchBar } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"
import { screenWidth } from "../../styles/common"

@connect()
class Search extends Component {
  static navigationOptions = {
    title: "Detail"
  };

  goBack = () => {
    this.props.dispatch(NavigationActions.back({ routeName: "Home" }))
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchBar showCancelButton onCancel={this.goBack} />
        <View style={styles.wrap}>
          <View style={styles.history}>
            <Text style={styles.title}>历史搜索</Text>
            <View style={styles.tags}>
              <TouchableOpacity style={styles.tag}>
                <Text style={styles.tagText}>123</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.title}>热门搜索</Text>
            <View style={styles.tags}>
              <TouchableOpacity style={styles.tag}>
                <Text style={styles.tagText}>123</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  },
  wrap: {
    borderRadius: 20,
    flex: 1,
    width: screenWidth - 40,
    backgroundColor: "#FFF",
    padding: 20,
    paddingTop: 30
  },
  history: {
    marginBottom: 40
  },
  title: {
    marginBottom: 10,
    fontWeight: "bold"
  },
  tags: {
    flexDirection: "row"
  },
  tag: {
    borderRadius: 10,
    backgroundColor: "#eee",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10
  }
})

export default Search
