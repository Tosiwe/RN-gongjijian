import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import { connect } from "react-redux"
import { List, InputItem } from "@ant-design/react-native"
import moment from "moment"
import { primaryColor, iconSize } from "../../styles/common"
import ImagePicker from "../../components/ImagePicker/ImagePicker"


@connect(({ app }) => ({ ...app }))
class UserVerify extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {}

  render() {
    // const {  } = this.state

    return (
      <View style={styles.container}>
        <List>
          <InputItem
            label="姓名"
            clear
            onChange={value => this.onChange(value, "name")}
            style={styles.item}
          />
          <InputItem
            label="身份证号"
            clear
            onChange={value => this.onChange(value, "id")}
            style={styles.item}
          />
        </List>
        <ImagePicker />
        <ImagePicker />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    width: iconSize,
    height: iconSize
  },
  payBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40
  },
  wrap: {
    justifyContent: "center",
    // width: 130,
    height: 180,
    borderWidth: 2,
    borderColor: "#EEE",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FFF"
  },
  activeWrap: {
    justifyContent: "center",
    // width: 130,
    height: 180,
    borderWidth: 2,
    borderColor: "#E7BC85",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FFF7E5"
  },
  content: {
    flex: 1,
    padding: 5
  },
  text: {
    textAlign: "center"
  },
  title: {
    fontSize: 18
  },
  price: {
    color: "#C99A2E",
    fontSize: 24
  },
  des: {
    height: 80
  },
  rcmBg: {
    right: 0,
    width: 60,
    height: 30,
    position: "absolute"
  },
  rcmTxt: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center"
  },
  btn: {
    marginTop: 20,
    height: 50,
    backgroundColor: "#D4B87C",
    marginHorizontal: 16,
    borderRadius: 25
  },
  btnBg: {
    width: "100%",
    height: 50
  },
  btnText: {
    lineHeight: 50,
    fontSize: 20,
    textAlign: "center",
    color: "#FFF"
  }
})

export default UserVerify
