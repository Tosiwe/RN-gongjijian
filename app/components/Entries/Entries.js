/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { StyleSheet, Image, TouchableOpacity, Text } from "react-native"
import { Grid } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"
import { connect } from "react-redux"

const ENTRY_ARRAY = [
  {
    id: "hbuilding",
    text: "房建",
    icon: <Image source={require(`../../images/icon_building_b.png`)} />
  },
  {
    id: "steel",
    text: "钢结构",
    icon: <Image source={require(`../../images/icon_structure_b.png`)} />
  },
  {
    id: "bridge",
    text: "桥梁隧道",
    icon: <Image source={require(`../../images/icon_tunnel_b.png`)} />
  },
  {
    id: "expressway",
    text: "高速公路",
    icon: <Image source={require(`../../images/icon_highspeed_b.png`)} />
  },
  {
    id: "railway",
    text: "铁路工程",
    icon: <Image source={require(`../../images/icon_railway_b.png`)} />
  },
  {
    id: "gardens",
    text: "园林古建筑",
    icon: <Image source={require(`../../images/icon_garden_b.png`)} />
  },
  {
    id: "decorate",
    text: "装修装饰",
    icon: <Image source={require(`../../images/icon_decoration_b.png`)} />
  },
  {
    id: "water",
    text: "水电工程",
    icon: <Image source={require(`../../images/icon_hydropower_b.png`)} />
  },
  {
    id: "ship",
    text: "船舶港口",
    icon: <Image source={require(`../../images/icon_ship_b.png`)} />
  },
  {
    id: "smarket",
    text: "二手市场",
    icon: <Image source={require(`../../images/icon_second_b.png`)} />
  },
  {
    id: "aptitude",
    text: "资质",
    icon: <Image source={require(`../../images/icon_aptitude_b.png`)} />
  },
  {
    id: "reg",
    text: "注册人员",
    icon: <Image source={require(`../../images/icon_register_b.png`)} />
  },
  {
    id: "download",
    text: "图纸下载",
    icon: <Image source={require(`../../images/icon_download_b.png`)} />
  }
]

@connect()
class Entries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // data: [],
    }
  }

  componentDidMount() {
    // 发布页面移除 "图纸下载"
    // const { isPublish } = this.props
    // const data = [...ENTRY_ARRAY]
    // if (isPublish) {
    //   data.pop()
    // }
    // this.setState({ data })
  }

  // 默认点击进入各个频道
  toEntry = el => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Entry",
        params: { id: el.id, name: el.text }
      })
    )
  };

  render() {
    const { columnNum, onPress, itemStyle, isSettle, isPublish } = this.props
    // const { data } = this.state
    const dataSorce = [...ENTRY_ARRAY]
    if (isSettle) {
      dataSorce.splice(dataSorce.length - 4, dataSorce.length)
    }
    if (isPublish) {
      dataSorce.pop()
    }
    return (
      <Grid
        itemStyle={itemStyle}
        styles={{ styles }}
        data={dataSorce}
        columnNum={columnNum || 5}
        hasLine={false}
        renderItem={el => (
          <TouchableOpacity
            style={styles.item}
            onPress={onPress ? () => onPress(el) : () => this.toEntry(el)}
          >
            {el.icon}
            <Text style={styles.itemText}>{el.text}</Text>
          </TouchableOpacity>
        )}
      />
    )
  }
}
const styles = StyleSheet.create({
  item: {
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
