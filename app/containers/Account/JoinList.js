/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native"
import { List } from "@ant-design/react-native"
import Icon from "react-native-vector-icons/AntDesign"
import { connect } from "react-redux"
import { INS_MAP } from "../../utils/dataDic"

const { Item } = List
@connect(({ app }) => ({ ...app }))
class JoinList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      joinList: []
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: "app/settleList",
      callback: res => {
        if (res.msg === "OK") {
          this.setState({ joinList: res.result.data })
        }
      }
    })
  }

  render() {
    const { joinList } = this.state
    debugger
    return (
      <View style={styles.wrap}>
        <View style={styles.listHeader}>
          <View style={{ flexDirection: "row", marginLeft: 5 }}>
            <Image source={require("./images/icon_join.png")} />
            <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 20 }}>
              我的入住
            </Text>
          </View>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 14, color: "orange" }}>继续入住</Text>
            <Icon name="plus" color="orange" size={14} />
          </TouchableOpacity>
        </View>
        <List style={styles.list}>
          {joinList.map(item => (
            <Item key={item.id} thumb={<Image style={styles.icon} source={ INS_MAP[item.classifyId].icon}/>} arrow="horizontal">
              {`${INS_MAP[item.classifyId].name}-${
                INS_MAP[item.subClassifyId].name
              }`}
            </Item>
          ))}
        </List>
        <View style={styles.bottom} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: "#FFF",
    borderRadius: 10,
    top: -100
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    marginBottom: 15
  },
  icon: {
    width: 30,
    height: 30,
  },
  text: {
    fontSize: 16
  },
  bottom: {
    height: 60,
    borderRadius: 20
  }
})
export default JoinList
