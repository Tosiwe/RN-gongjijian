import React, { Component } from "react"
import { StyleSheet, View, Image, Text, TouachableOpacity } from "react-native"
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

  checkFile=()=>{
    console.log(23)
  }

  render() {
    const { data={} } = this.props
    const Td = props => (
      <View style={styles.td}>
        <Text style={styles.tdLabel}>{props.label}</Text>
        <Text style={styles.tdText}>{props.text}</Text>
      </View>
    )

    const form = () => {
      const { classifyId } = data
      if (classifyId === "reg") {
        return (
          <View style={styles.row}>
            <Td label="注册人员名称" text={data.extraName || "-"} />
          </View>
        )
      }

      if (classifyId === "aptitude") {
        return (
          <View style={styles.row}>
            <Td label="资质名称" text={data.extraName || "-"} />
          </View>
        )
      }

      if (classifyId === "smarket") {
        return (
          <View>
            <View style={styles.row}>
              <Td label="设备名称" text={data.extraName || "-"} />
              <Td label="品牌" text={data.extraBrand || "-"} />
            </View>
            <View style={styles.row}>
              <Td label="型号规格" text={data.extraSpec || "-"} />
              <Td label="租赁单位" text={data.extraUnit || "-"} />
            </View>
            <View style={styles.row}>
              <Td label="租赁价格" text={data.extraPrice || "-"} />
            </View>
          </View>
        )
      }

      return (
        <View style={styles.row}>
          <Td label="企业认证" text={data.text || "-"} />
        </View>
      )
    }
    return (
      <View style={styles.BaseInfo}>
        {form()}
        <View style={styles.row}>
          <Td label="地域" text={data.region || "-"} />
          <View style={styles.locWrap}>
            {/* <Image
              style={styles.location}
              source={require("./images/icon_location.png")}
            />
            <Text style={{ color: "#FF7725", fontSize: 12 }}>位置</Text> */}
          </View>
        </View>

        <View style={styles.DetailRow}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.detailLeft} />
            <Text style={styles.detailTitle}>详情介绍</Text>
          </View>
          <Text style={styles.detailText}>{data.desc}</Text>
        </View>
        {/* <TouachableOpacity
          style={[styles.row, { justifyContent: "space-between" }]}
          onPress={this.checkFile}
        >
          <Text>查看附件</Text>
          <Icon name="right" style={{ color: "#727272" }} />
        </TouachableOpacity> */}
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
    justifyContent: "space-between"
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
    paddingHorizontal: 10,
    fontSize: 12,
    color: "#727272"
  },
  bottomRow: {
    height: 80
  }
})

export default BaseInfo
