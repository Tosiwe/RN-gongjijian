/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { StyleSheet, View, Image } from "react-native"
import { Grid } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"
import { connect } from "react-redux"

const ENTRY_ARRAY = [
  {
    type: 0,
    text: "房建",
    icon: <Image source={require(`../../images/icon_building_b.png`)} />
  },
  {
    type: 1,
    text: "钢结构",
    icon: <Image source={require(`../../images/icon_structure_b.png`)} />
  },
  {
    type: 2,
    text: "桥梁隧道",
    icon: <Image source={require(`../../images/icon_tunnel_b.png`)} />
  },
  {
    type: 3,
    text: "高速公路",
    icon: <Image source={require(`../../images/icon_highspeed_b.png`)} />
  },
  {
    type: 4,
    text: "铁路工程",
    icon: <Image source={require(`../../images/icon_railway_b.png`)} />
  },
  {
    type: 5,
    text: "园林古建筑",
    icon: <Image source={require(`../../images/icon_garden_b.png`)} />
  },
  {
    type: 6,
    text: "装修装饰",
    icon: <Image source={require(`../../images/icon_decoration_b.png`)} />
  },
  {
    type: 7,
    text: "水电工程",
    icon: <Image source={require(`../../images/icon_hydropower_b.png`)} />
  },
  {
    type: 8,
    text: "船舶港口",
    icon: <Image source={require(`../../images/icon_ship_b.png`)} />
  },
  {
    type: 9,
    text: "二手市场",
    icon: <Image source={require(`../../images/icon_second_b.png`)} />
  },
  {
    type: 10,
    text: "资质",
    icon: <Image source={require(`../../images/icon_aptitude_b.png`)} />
  },
  {
    type: 11,
    text: "注册人员",
    icon: <Image source={require(`../../images/icon_register_b.png`)} />
  },
  {
    type: 12,
    text: "图纸下载",
    icon: <Image source={require(`../../images/icon_download_b.png`)} />
  }
]

@connect()
class Entries extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // 默认点击进入各个频道
  toEntry = el => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Entry",
        params: { type: el.type, name: el.text }
      })
    )
  };

  render() {
    const { columnNum, onPress } = this.props
    return (
      <View style={styles.wrap}>
        <Grid
          data={ENTRY_ARRAY}
          columnNum={columnNum || 5}
          hasLine={false}
          onPress={onPress || this.toEntry}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
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
