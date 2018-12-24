/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native"

import { NavigationActions } from "react-navigation"
import { connect } from "react-redux"
import { ENTRY_MAP } from "./data"

@connect()
class Entries extends Component {
 
  constructor(props) {
    super(props)
    this.state = {}
  }

  toEntry = type => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Entry",
        params: { type, name: ENTRY_MAP[type] }
      })
    )
  };

  render() {
    return (
      <View style={styles.wrap}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.item} onPress={() => this.toEntry(0)}>
            <Image source={require("../../images/icon_building_b.png")} />
            <Text style={styles.itemText}>房建</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => this.toEntry(1)}>
            <Image source={require("../../images/icon_structure_b.png")} />
            <Text style={styles.itemText}>钢结构</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => this.toEntry(2)}>
            <Image source={require("../../images/icon_tunnel_b.png")} />
            <Text style={styles.itemText}>桥梁隧道</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => this.toEntry(3)}>
            <Image source={require("../../images/icon_highspeed_b.png")} />
            <Text style={styles.itemText}>高速公路</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => this.toEntry(4)}>
            <Image source={require("../../images/icon_railway_b.png")} />
            <Text style={styles.itemText}>铁路工程</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.item} onPress={() => this.toEntry(5)}>
            <Image source={require("../../images/icon_garden_b.png")} />
            <Text style={styles.itemText}>园林古建筑</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => this.toEntry(6)}>
            <Image source={require("../../images/icon_decoration_b.png")} />
            <Text style={styles.itemText}>装修装饰</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => this.toEntry(7)}>
            <Image source={require("../../images/icon_hydropower_b.png")} />
            <Text style={styles.itemText}>水电工程</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => this.toEntry(8)}>
            <Image source={require("../../images/icon_ship_b.png")} />
            <Text style={styles.itemText}>船舶港口</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => this.toEntry(9)}>
            <Image source={require("../../images/icon_second_b.png")} />
            <Text style={styles.itemText}>二手市场</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => this.toEntry(10)}
          >
            <Image source={require("../../images/icon_aptitude_b.png")} />
            <Text style={styles.itemText}>资质</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => this.toEntry(11)}
          >
            <Image source={require("../../images/icon_register_b.png")} />
            <Text style={styles.itemText}>注册市场</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => this.toEntry(12)}
          >
            <Image source={require("../../images/icon_download_b.png")} />
            <Text style={styles.itemText}>图纸下载</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} />
          <TouchableOpacity style={styles.item} />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10
  },
  row: {
    flexDirection: "row",
    marginBottom: 20
  },
  item: {
    flex: 1,
    alignItems: "center"
  },
  itemText: {
    fontSize: 12
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: "#ddd",
    marginBottom: 5
  }
})
export default Entries
