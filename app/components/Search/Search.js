import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { SearchBar } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"
import { screenWidth } from "../../styles/common"

@connect()
class Search extends Component {
  constructor() {
    super()
    this.state = {
      params: {
        ps:10,
        distance:0,
      },
      hotSearchList: []
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: "app/searchHotList",
      // payload: result.params,
      callback: res => {
        if (res.msg === "OK") {
          const list =[]
          res.result.forEach(item=>{
            if(item.keyword) list.push(item)
          })
          this.setState({ hotSearchList: list })
        }
      }
    })
  }

  goBack = () => {
    this.props.dispatch(NavigationActions.back({ routeName: "Home" }))
  };

  toSearch = v => {
    const { params } = this.state
    params.keyword = v
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "SearchResult",
        params:{
          params,
          name:"搜索结果"
        }
      })
    )
    
  };

  render() {
    const { hotSearchList } = this.state
    return (
      <View style={styles.container}>
        <SearchBar
          showCancelButton
          onCancel={this.goBack}
          onSubmit={this.toSearch}
        />
        <View style={styles.wrap}>
          {/* <View style={styles.history}>
            <Text style={styles.title}>历史搜索</Text>
            <View style={styles.tags}>
              {hotSearchList.map(item => (
                <TouchableOpacity
                  onPress={() => this.toSearch(item.keyword)}
                  key={Math.random()}
                  style={styles.tag}
                >
                  <Text style={styles.tagText}>{item.keyword}</Text>
                </TouchableOpacity>
              ))}
            </View>
              </View> */}
          <View> 
            <Text style={styles.title}>热门搜索</Text>
            <View style={styles.tags}>
            {hotSearchList.map(item => (
                <TouchableOpacity
                  onPress={() => this.toSearch(item.keyword)}
                  key={Math.random()}
                  style={styles.tag}
                >
                  <Text style={styles.tagText}>{item.keyword}</Text>
                </TouchableOpacity>
              ))}
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
    paddingTop: 10,
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
    paddingTop: 30,
    marginBottom:20,
  },
  history: {
    marginBottom: 40
  },
  title: {
    marginBottom: 10,
    fontWeight: "bold"
  },
  tags: {
    width:'100%',
    flexWrap: "wrap",
    flexDirection: "row"
  },
  tag: {
    borderRadius: 10,
    backgroundColor: "#eee",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight:5,
    marginBottom:5,
  }
})

export default Search
