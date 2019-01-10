import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text
} from "react-native"

import { connect } from "react-redux"

import Auth from "./Auth"
import BaseInfo from "./BaseInfo"
import Bottom from "./Bottom"
import Pics from "../../containers/Home/Ads"

import { statusBarHeight, iconSize } from "../../styles/common"

@connect()
class PaperDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // refreshing: false
    }
  }

  render() {
    const Td = props => (
      <View style={styles.td}>
        <Text style={styles.tdLabel}>{props.label}</Text>
        <Text style={styles.tdText}>{props.text}</Text>
      </View>
    )
    const { msgList } = this.state
    return (
      <View style={styles.home}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={this.handleScrollEnd}
        >
          <View style={[styles.row,styles.border]}>
            <Td label="企业认证" text="房屋建筑设计" />
          </View>
          <View style={styles.border}>
            <View style={styles.row}>
              <Td label="设备名称" text="房屋建筑设计" />
              <Td label="品牌" text="房屋建筑设计" />
            </View >
            <View style={styles.row}>
              <Td label="型号规格" text="房屋建筑设计" />
              <Td label="租赁单位" text="房屋建筑设计" />
            </View>
            <View style={styles.row}>
            <Td label="租赁价格" text="房屋建筑设计" />
            </View>
          </View>
          <View style={styles.DetailRow}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.detailLeft} />
              <Text style={styles.detailTitle}>详情介绍</Text>
            </View>
            <Text style={styles.detailText}>
              是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。
              几度夕阳红。白发渔樵江渚
              是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。
              几度夕阳红。白发渔樵江渚
            </Text>
          </View>
          <View style={[styles.row, styles.bottomRow]} />
        </ScrollView>
        <Bottom />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    paddingTop: statusBarHeight,
    paddingHorizontal:10,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  row: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  border:{
    borderTopWidth: 1,
    borderColor: "#DDD",
  },
  td: {
    flexDirection: "row"
  },
  tdLabel: {
    color: "#727272",
    marginRight: 10,
    width: 50,
    fontSize: 12
  },
  tdText: {
    fontSize: 12
  },
  locWrap: {
    position: "absolute",
    right: 10,
    marginTop: 5
  },
  location: {
    width: 25,
    height: 25
  },
  DetailRow: {
    borderTopWidth: 1,
    // borderBottomWidth: 1,
    borderColor: "#DDD",
    paddingVertical: 20,
  },
  detailLeft: {
    width: 3,
    height: 15,
    backgroundColor: "#FF7725",
    borderRadius: 5
  },
  detailTitle: {
    padding: 10
  },
  detailText: {
    paddingHorizontal: 10,
    fontSize: 12,
    color: "#727272"
  },
  bottomRow: {
    height: 80
  }
})

export default PaperDetail
