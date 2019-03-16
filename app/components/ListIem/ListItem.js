/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native"
import { Button, Modal } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"
import { connect } from "react-redux"
import moment from "moment"
import { INS_MAP } from "../../utils/dataDic"

@connect()
class ListItem extends Component {
  toDetail = () => {
    const { isDownload ,isMylike} = this.props
    if (isDownload) return
    const { data } = this.props
    console.log("List Item", data)
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Detail",
        params: {
          name: data.title,
          data,
          isMylike,
        }
      })
    )
  };

  remove = () => {
    const { data, onRemove } = this.props
    onRemove && onRemove(data)
  };

  render() {
    const { data, isDownload, isMylike, isGuessLike } = this.props
    let source = data.picture1
      ? { uri: data.picture1 }
      : require("../../containers/Account/images/logo.jpg")
    if (isDownload) {
      source =  data.thumbUrl
        ? { uri: data.thumbUrl }
        : require("../../containers/Account/images/logo.jpg")
    }
    return (
      <TouchableOpacity
        style={styles.container}
        key={data.id}
        onPress={this.toDetail}
        activeOpacity={1}
      >
        <View style={styles.wrap}>
          <View style={styles.left}>
            <Image source={source} style={styles.img} />
          </View>
          <View style={styles.right}>
            {!isMylike && (
              <Image
                source={
                  INS_MAP[data.classifyId] && INS_MAP[data.classifyId].icon
                }
                style={styles.icon}
              />
            )}
            <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
              {data.title}
            </Text>
            <Text ellipsizeMode="tail" numberOfLines={2} style={styles.des}>
              {isDownload ? data.fileName : data.desc}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between",marginTop:5 }}
            >
              <Text style={{ fontSize: 12 }}>
                {moment(data.updateTime || data.createTime).format(
                  "YYYY-MM-DD"
                )}
              </Text>
              {!isDownload && !isMylike && (
                <Text
                  style={{ fontSize: 12 }}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {data.city || "区域：未知"}
                </Text>
              )}
              {!isDownload && !isMylike  && (
                <Text
                  style={{ fontSize: 12 }}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {data.dist
                    ? data.dist > 1000
                      ? `${Math.round(data.dist / 1000)}公里`
                      : `${Math.round(data.dist)}米`
                    : "距离：未知"}
                </Text>
              )}
            </View>
          </View>
          {(isDownload || isMylike) && (
            <View style={styles.extra}>
              <Button type="primary" size="small" onPress={this.remove}>
                删除
              </Button>
            </View>
          )}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5
  },
  wrap: {
    flexDirection: "row",
    paddingVertical: 10,
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE"
  },
  left: {
    width: 75,
    height: 70
  },
  right: {
    height: 70,
    flex: 1
  },
  img: {
    width: 70,
    height: 70,
    backgroundColor: "#ddd",
    marginBottom: 5
  },
  title: {
    fontWeight: "400",
    fontSize: 16,
    paddingRight:20
    // marginBottom: 5
  },
  des: {
    height: 30,
    fontSize: 12,
    color: "#727272"
  },
  icon: {
    width: 20,
    height: 20,
    right: 0,
    position: "absolute"
  },
  extra: {
    marginLeft: 10,
    justifyContent: "center"
  }
})
export default ListItem
