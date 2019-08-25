/* eslint-disable react/sort-comp */
/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, ScrollView, StyleSheet, Text } from "react-native"
import { List, Switch } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"
import JPushModule from "jpush-react-native"
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
    const list = []

    this.props.dispatch({
      type: "app/followList",
      callback: res => {
        if (res.msg === "OK") {
          const chooseList = res.result

          ENTRY_ARRAY.forEach(item => {
            list.push({
              id: item.id,
              text: item.text,
              checked: chooseList.includes(item.id)
            })
          })

          this.setState({ list })
        }
      }
    })
  }

  toSet = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Setting",
        params: { name: "设置" }
      })
    )
  };

  onSwitchChange = (checked,  index) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const newList = [...this.state.list]
    newList[index].checked = checked

    const ids = []
    newList.forEach(item => {
      if (item.checked) {
        ids.push(item.id)
      }
    })

    this.props.dispatch({
      type: "app/updateFollow",
      payload: {
        ids: ids.join(",")
      },
      callback: res => {
        if (res.msg === "OK") {
          console.log("ok")
        }
      }
    })

    console.log("ids666",ids)
    this.setState({ list: newList },()=>{
      JPushModule.setTags(ids, map => {
        if (map.errorCode === 0) {
          // Toast.info(`Tag operate succeed, tags: ${  map.tags}`)
        } else {
          // Toast.info(`设置tag出错，error code: ${  map.errorCode}`)
        }
      })
    })
  };

  render() {
    const { list } = this.state
    return (
      <ScrollView>
        <List>
          {list.map((item, i) => {
            if (i < 12) {
              return (
                <Item
                  key={item.id}
                  extra={
                    <Switch
                      checked={item.checked}
                      onChange={(checked) =>
                        this.onSwitchChange(checked, i)
                      }
                    />
                  }
                >
                  <Text style={styles.item}> {item.text}</Text>
                </Item>
              )
            }
            return null
          })}
          <Item />
        </List>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    fontSize: 16,
    marginLeft: 10,
    height: 40,
    lineHeight: 40
  }
})
export default ChooseIndustry
