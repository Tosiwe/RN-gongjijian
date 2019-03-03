/* eslint-disable react/no-unused-state */
import React, { Component } from "react"
import { StyleSheet, View, ScrollView, Text } from "react-native"
import { connect } from "react-redux"

import Bottom from "./Bottom"

import { statusBarHeight } from "../../styles/common"
// import Pics from "../../containers/Home/Ads"

@connect()
class PaperDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paperPrice: "-"
    }
  }

  componentDidMount() {
    // this.props.dispatch({
    //   type: "app/getPriceList",
    //   callback: res => {
    //     if (res.msg === "OK") {
    //       this.setState({ paperPrice: res.result.paper })
    //     }
    //   }
    // })
  }

  render() {
    const { data = {}, type = "paper" } = this.props.navigation.state.params
    const Td = props => (
      <View style={styles.td}>
        <Text style={styles.tdLabel}>{props.label}</Text>
        <Text style={styles.tdText}>{props.text}</Text>
      </View>
    )
    return (
      <View style={styles.home}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={this.handleScrollEnd}
        >
          <View style={[styles.row, styles.border]}>
            <Text style={styles.title}>{data.title}</Text>
          </View>
          <View style={styles.border}>
            <View style={styles.row}>
              <Td label="图纸大小" text={data.size || "-"} />
              <Td label="图纸价格" text={`${data.price}元` || "-"} />
            </View>
            <View style={styles.row}>
              <Td label="图纸作者" text={data.author || "-"} />
              <Td label="下载次数" text={data.downloads || "0"} />
            </View>
            <View style={styles.row}>
              <Td label="图纸出处" text={data.source || "-"} />
            </View>
          </View>
          <View style={styles.DetailRow}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.detailLeft} />
              <Text style={styles.detailTitle}>详情介绍</Text>
            </View>
            <Text style={styles.detailText}>{data.desc || "-"}</Text>
          </View>
          <View style={[styles.row, styles.bottomRow]} />
        </ScrollView>
        <Bottom type={type} data={data} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    paddingTop: statusBarHeight,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 20,
    fontWeight: "500"
  },
  row: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  // border: {
  //   borderTopWidth: 1,
  //   borderColor: "#DDD"
  // },
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
    paddingVertical: 20
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
