/* eslint-disable react/no-unused-state */
import React, { Component } from "react"
import { StyleSheet, View, ScrollView, Text,Image } from "react-native"
import { connect } from "react-redux"
import { ActivityIndicator, Progress } from "@ant-design/react-native"
import Bottom from "./PaperBottom"

import { statusBarHeight } from "../../styles/common"

@connect()
class PaperDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paperPrice: "-",
      refreshing: false,
      percent: 0
    }
  }

  onRefresh = (refreshing, percent = 10) => {
    this.setState({ refreshing, percent })
  };

  render() {
    const { data = {} } = this.props.navigation.state.params
    const {percent}=this.state
    const Td = props => (
      <View style={styles.td}>
        <Text style={styles.tdLabel}>{props.label}</Text>
        <Text style={styles.tdText}>{props.text}</Text>
      </View>
    )
    const source =  data.thumbUrl
    ? { uri: data.thumbUrl }
    : require("../../containers/Account/images/logo.jpg")

    return (
      <View style={styles.home}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={this.handleScrollEnd}
        >
          <Progress style={{width:"100%",backgroundColor:"#FFF",height:10 }} percent={percent}/>
          <Image style={{width:"100%", height: 200,resizeMode:'contain'}} source={source} />
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
            <Text numberOfLines={10} style={styles.detailText}>
              {data.desc || "-"}
            </Text>
          </View>
          <ActivityIndicator
            animating={this.state.refreshing}
            text="下载中..."
            toast
            size="small"
          />
          <View style={[styles.row, styles.bottomRow]} />
        </ScrollView>
        <Bottom data={data} onRefresh={this.onRefresh} onProgress={(p)=>this.setState({percent:p})}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    // paddingTop: statusBarHeight,
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
    color: "#727272",
    height: 150
  },
  bottomRow: {
    height: 80
  }
})

export default PaperDetail
