import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { NavigationActions } from "react-navigation"
import { Tabs } from "@ant-design/react-native"

const tabs = [
  { title: "公司" },
  { title: "材料供应" },
  { title: "设备租赁" },
  { title: "人才" },
  { title: "施工队伍" },
  { title: "项目信息" }
]

@connect()
class IndustryEntry extends Component {
  //   constructor(props) {
  //     super(props)
  //   }

  render() {
    const { type } = this.props
    return (
      <View style={styles.container}>
        <Tabs 
        tabs={tabs} 
        styles={{topTabBarSplitLine:"#000"}}
        tabBarUnderlineStyle={{ backgroundColor: "#FF7720" }} 
        // renderTab={tab=>(<Text style={{color:"red",borderBottomWidth:0}}>123</Text>   )}
        >
          <View style={styles.content}>
            <Text>Content of First Tab</Text>
          </View>
          <View style={styles.content}>
            <Text>Content of Second Tab</Text>
          </View>
          <View style={styles.content}>
            <Text>Content of Third Tab</Text>
          </View>
          <View style={styles.content}>
            <Text>Content of First Tab</Text>
          </View>
          <View style={styles.content}>
            <Text>Content of Second Tab</Text>
          </View>
          <View style={styles.content}>
            <Text>Content of Third Tab</Text>
          </View>
        </Tabs>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    content:{
        backgroundColor:"#FFF",
        flex:1,
    }
})

export default IndustryEntry
