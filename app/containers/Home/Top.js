/* eslint-disable prefer-destructuring */
/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import LocationBtn from "../../components/LocationBtn/LocationBtn"


@connect()
class Top extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // value: [],
    }
  }

  toSearch = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Search' }))
  }

  render() {
    return (
      <View style={styles.top}>
       <LocationBtn showBtn/>
        <TouchableOpacity style={styles.searchBar} onPress={this.toSearch}>
          <Icon
            name="search1"
            size={16}
            color="#000000"
            style={{ width: 20 }}
          />
          <Text style={{ color: '#636363', fontSize: 14 }}>搜索</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#fff',
    marginBottom: 10,
    marginTop: 20,
  },
  cityButton: {
    height: 40,
    width: 73,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    paddingLeft: 3,
    height: 30,
    margin: 5,
    borderRadius: 30,
    backgroundColor: '#fff',
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
})
export default Top
