/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, ScrollView, StyleSheet, Text } from "react-native"
import { List, Checkbox } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"

import { connect } from "react-redux"
import { ENTRY_ARRAY } from "../../utils/dataDic"

const { CheckboxItem } = Checkbox

@connect(({ app }) => ({ ...app }))
class ProfileSetting extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    // this.props.dispatch({
    //   type: "app/getProfile",
    //   callback: res => {
    //     if (res.msg === "OK") {
    //       const { nick } = res.result
    //       this.setState({ nick })
    //     }
    //   }
    // })
  }

  toSet = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Setting",
        params: { name: "设置" }
      })
    )
  };

  render() {
    return (
      <ScrollView>
        <List style={{ marginTop: 20 }}>
        <List.Item extra={<Switch checked />}>On(controlled)</List.Item>
        <List.Item extra={<Switch />}>Off(controlled)</List.Item>
        <List.Item
          extra={
            <Switch
              checked={this.state.checked}
              onChange={this.onSwitchChange}
            />
          }
        >
          onChange event, switch status: {this.state.checked ? 'open' : 'close'}
        </List.Item>
        <List.Item extra={<Switch disabled />}>disabled</List.Item>
        <List.Item extra={<Switch color="red" checked />}>color</List.Item>
      </List>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    item:{
        fontSize:18,
        marginLeft:10
    }
})
export default ProfileSetting
