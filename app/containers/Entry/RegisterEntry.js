import React, { Component } from "react"
import { connect } from "react-redux"

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native"
import { Tabs, Toast } from "@ant-design/react-native"
import { NavigationActions } from "react-navigation"
import { getPosition } from "../../utils/utils"

const tabs = [
  { title: "资质", id: "aptitude" },
  { title: "注册人员", id: "reg" }
]

@connect(({ app }) => ({ ...app }))
class RegisterEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      list: [],
      params: {
        pn:1,
        ps:50,
        distance: 0,
        classifyId: props.id
      },
      geoCode: {}

    }
  }

  componentDidMount() {
    this.getInfoList()
  }


  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(this.state.geoCode) !== JSON.stringify(nextProps.geoCode)
    ) {
      this.state.geoCode = nextProps.geoCode
      this.setState({loading:true})
      this.getInfoList(1,nextProps.geoCode)
    }
  }

  onPressItem = item => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Detail",
        params: {
          name: item.title,
          data: item
        }
      })
    )
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.onPressItem(item)}
      style={styles.wrap}
    >
      <Text style={styles.title}>{item.title || "现有一名工程师"}</Text>
      <View style={styles.info}>
        <Text style={styles.infoText}>{item.city || "未知"}</Text>
        <Text style={styles.infoText}>{item.timeStamp || "未知"}</Text>
      </View>
    </TouchableOpacity>
  );

  getInfoList = (pn = 1,geoCode) => {
    const that = { ...this }

    getPosition(that,Toast,geoCode)
      .then(result => {
        if (result.isSuccess) {
          const { province, city, ...params } = result.params
          params.lng = params.longitude
          params.lat = params.latitude
          delete params.longitude
          delete params.latitude
          if (params.adcode === "000000") {
            delete params.adcode
          } else {
            params.adcode =   params.shortAdcode || params.adcode.substring(0, 2)
          }
          if(params.adcode === "00"){
            delete params.adcode
          }
          delete  params.shortAdcode

          this.state.params = params
          console.log("getInfoList 注册资质", params)
          this.props.dispatch({
            type: "app/getInfoListLoc",
            payload: params,
            callback: res => {
              this.setState({ loading: false })
              if (res.msg === "OK") {
                let infoList = []
                if (pn !== 1) {
                  infoList = [...this.state.infoList, ...res.result]
                } else {
                  infoList = res.result
                }
                this.setState({
                  list: infoList
                  // infoPageNum: res.result.pn
                })
              }
            }
          })
        } else {
          this.setState({ loading: false })
        }
      })
      .catch(error => {
        this.setState({ loading: false })
      })
  };

  changeTab = tab => {
    this.setState({ loading: true })

    this.state.params.classifyId = tab.id
    this.getInfoList()
  };

  render() {
    const { id } = this.props
    const { loading, list=[] } = this.state
    return (
      <View style={styles.container}>
        <Tabs
          tabs={tabs}
          styles={{ topTabBarSplitLine: "#000" }}
          tabBarUnderlineStyle={{ backgroundColor: "#FF7720" }}
          initialPage={id === "aptitude" ? 0 : 1}
          onChange={this.changeTab}
          // renderTab={tab=>(<Text style={{color:"red",borderBottomWidth:0}}>123</Text>   )}
        >
          <View style={styles.content}>
            <ActivityIndicator animating={loading} />
            {list.length ? (
              <FlatList data={list} renderItem={this.renderItem} />
            ) : (
              <Text
                style={{ textAlign: "center", fontSize: 16, marginTop: 20 }}
              >
                暂无数据
              </Text>
            )}
          </View>
        </Tabs>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    paddingHorizontal: 10
  },
  content: {
    // backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  wrap: {
    borderWidth: 1,
    borderColor: "#efefef",
    backgroundColor: "#fff",
    shadowColor: "#ddd",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10
  },
  title: {
    fontSize: 16,
    marginBottom: 10
  },
  info: {
    flexDirection: "row"
  },
  infoText: {
    color: "#727272",
    fontSize: 12,
    marginRight: 30
  }
})

export default RegisterEntry
