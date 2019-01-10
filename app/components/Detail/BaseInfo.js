import React, { Component } from "react"
import { StyleSheet, View, Image, Text } from "react-native"
import { connect } from "react-redux"
import Icon from "react-native-vector-icons/AntDesign"

@connect()
class BaseInfo extends Component {
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

    const form = () => {
      const { type } = this.props
      if (type === 1) {
        return (
          <View style={styles.row}>
            <Td label="注册人员名称" text="二级结构师" />
          </View>
        )
      }

      if(type === 2){
        return (
          <View style={styles.row}>
            <Td label="资质名称" text="建筑三承资质" />
          </View>
        )
      }

      if (type === 3) {
        return (
          <View>
            <View style={styles.row}>
              <Td label="设备名称" text="房屋建筑设计" />
              <Td label="品牌" text="房屋建筑设计" />
            </View>
            <View style={styles.row}>
              <Td label="型号规格" text="房屋建筑设计" />
              <Td label="租赁单位" text="房屋建筑设计" />
            </View>
            <View style={styles.row}>
              <Td label="租赁价格" text="房屋建筑设计" />
            </View>
          </View>
        )
      }

      return (
        <View style={styles.row}>
          <Td label="企业认证" text="房屋建筑设计" />
        </View>
      )
      
    }
    return (
      <View style={styles.BaseInfo}>
        {form()}
        <View style={styles.row}>
          <Td label="地域" text="河北" />
          <View style={styles.locWrap}>
            <Image
              style={styles.location}
              source={require("./images/icon_location.png")}
            />
            <Text style={{ color: "#FF7725",fontSize:12 }}>位置</Text>
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
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <Text>查看附件</Text>
          <Icon name="right" style={{ color: "#727272" }} />
        </View>
        <View style={[styles.row, styles.bottomRow]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    borderTopWidth: 1,
    // borderBottomWidth: 1,
    borderColor: "#DDD",
    paddingVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent:"space-between"
  },
  td: {
    flexDirection: "row"
  },
  tdLabel: {
    color: "#727272",
    marginRight: 10,
    width: 50,
    fontSize:12
  },
  tdText: {
    fontSize:12
  },
  locWrap: {
    position: "absolute",
    right: 10,
    marginTop:5,
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
    marginHorizontal: 20
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
    paddingHorizontal:10,
    fontSize:12,
    color: "#727272"
  },
  bottomRow: {
    height: 80
  }
})

export default BaseInfo
