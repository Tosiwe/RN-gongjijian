import React, { Component } from "react"
import { StyleSheet, View, Text,  } from "react-native"
import { connect } from "react-redux"
import { Toast, Accordion, List } from "@ant-design/react-native"
// import Icon from "react-native-vector-icons/AntDesign"
import { NavigationActions } from "react-navigation"

@connect()
class BaseInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // refreshing: false
    }
  }

  checkFile = () => {
    Toast.info("暂无附件",1,null,false)
  };

  onChange = activeSections => {
    this.setState({ activeSections })
  };

  toPaperDetail = data => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "PaperDetail",
        params: {
          name: "附件详情",
          data,
          typ:"attach"
        }
      })
    )
  };

  render() {
    const { data = {} } = this.props

    console.log("BaseInfo data",data)
    const Td = props => (
      <View style={styles.td}>
        <Text style={styles.tdLabel}>{props.label}</Text>
        <Text style={styles.tdText}>{props.text}</Text>
      </View>
    )

    const form = () => {
      const { classifyId, type, subClassifyId } = data

      if (type === 0 || subClassifyId === "company") {
        return null
      }

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

      if (subClassifyId === "talent") {
        return (
          <View style={styles.row}>
            <Td label="人才名称" text={data.extraName || "-"} />
          </View>
        )
      }

      if (subClassifyId === "team") {
        return (
          <View style={styles.row}>
            <Td label="施工队名称" text={data.extraName || "-"} />
          </View>
        )
      }

      if (subClassifyId === "project") {
        return (
          <View style={styles.row}>
            <Td label="项目名称" text={data.extraName || "-"} />
          </View>
        )
      }
      if (subClassifyId === "rent"||subClassifyId === "material"){
      return (
        <View>
          <View style={styles.row}>
            <Td label={`${subClassifyId ==='material'?'材料':'设备'}名称`} text={data.extraName || "-"} />
            <Td label="品牌" text={data.extraBrand || "-"} />
          </View>
          <View style={styles.row}>
            <Td label="型号规格" text={data.extraSpec || "-"} />
            <Td label="租赁单位" text={data.extraUnit || "-"} />
          </View>
          <View style={styles.row}>
            <Td label="租赁价格" text={`${data.extraPrice}元` || "-"} />
          </View>
        </View>
      )}
      return null
    }

    return (
      <View style={styles.BaseInfo}>
        {form()}
        <View style={styles.row}>
          <Td label="地域" text={data.city || "-"} />
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
        <View style={styles.fileRow}>
          <Accordion
            onChange={this.onChange}
            activeSections={this.state.activeSections}
          >
            <Accordion.Panel
              header={
                <Text style={{ fontSize: 16, lineHeight: 40, flex: 1 }}>
                  查看附件
                </Text>
              }
            >
              <List>
                {data.attach ? (
                  data.attach.map(item => (
                    <List.Item
                      arrow="horizontal"
                      onPress={() => this.toPaperDetail(item)}
                    >
                      {item.title}
                    </List.Item>
                  ))
                ) : (
                  <List.Item>无附件</List.Item>
                )}
              </List>
            </Accordion.Panel>
          </Accordion>
        </View>
        <View style={styles.bottomRow} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  fileRow: {
    paddingHorizontal: 20
  },
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
    color: "#000",
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
    padding: 10,
    fontSize: 16,
    color: "black"
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
