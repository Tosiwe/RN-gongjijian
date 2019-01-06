import React, { Component } from 'react'
import { connect } from 'react-redux'

import { StyleSheet, View } from 'react-native'
// import { Toast } from '@ant-design/react-native'
import { NavigationActions } from 'react-navigation'
import Entries from '../Entries/Entries'

@connect()
class Publish extends Component {
  componentDidMount() {
    // alert(
    //   this.props.navigation.state.params.type === 1 ? "发布需求" : "发布信息"
    // )
  }

  fillForm = el => {
    const { type } = this.props.navigation.state.params
    const { dispatch } = this.props
    if (type === 1) {
      // 发布需求
      dispatch(
        NavigationActions.navigate({
          routeName: 'FormDemand',
          params: { type: el.type, name: `编辑${el.text}需求` },
        })
      )
    } else {
      // 发布信息
      dispatch(
        NavigationActions.navigate({
          routeName: 'CompanyOrPerson',
          params: { type: el.type, name: el.text },
        })
      )
    }
  }

  render() {
    // 选择发布分类
    return (
      <View style={styles.wrap}>
        <Entries columnNum={4} onPress={this.fillForm} isPublish />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20,
  },
})

export default Publish
