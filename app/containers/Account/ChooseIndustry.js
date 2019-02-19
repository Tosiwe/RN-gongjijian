/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, ScrollView, StyleSheet, Text } from "react-native"
import { List, Switch } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"

import { connect } from "react-redux"
import { ENTRY_ARRAY } from "../../utils/dataDic"

const { Item } = List
@connect(({ app }) => ({ ...app }))
class ChooseIndustry extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: []
    }
  }

  componentDidMount() {
    const list =[]
    ENTRY_ARRAY.forEach(item => {
      list.push({
        text: item.text,
        checked: false
      })
    })

    this.setState({list})

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

  onSwitchChange=(checked,index)=>{
      // eslint-disable-next-line react/no-access-state-in-setstate
      const newList = [...this.state.list]
      newList[index].checked = checked
      this.setState({list:newList})

  }

  render() {
    const { list } = this.state
    return (
      <ScrollView>
        <List>
          {list.map((item, i) => {
            if (i < 12) {
              return (
                <Item extra={<Switch checked={item.checked} onChange={(checked)=>this.onSwitchChange(checked,i)}
                />}>
                  <Text style={styles.item}> {item.text}</Text>
                </Item>
              )
            }
            return null
          })}
        </List>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    fontSize: 18,
    marginLeft: 10
  }
})
export default ChooseIndustry
