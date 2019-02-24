/* eslint-disable semi */
/* eslint-disable react/sort-comp */
import React, { Component } from "react";
import { connect } from "react-redux";

import { StyleSheet, ScrollView, Text } from "react-native";
import {
  Toast,
  List,
  InputItem,
  WhiteSpace,
  Result
} from "@ant-design/react-native";
import { NavigationActions } from "react-navigation";
// import ImagePicker from 'react-native-image-picker'
import BaseInfo from "./BaseInfo";
import Buttons from "./Buttons";
import { getPosition } from "../../utils/utils";

@connect(({ app }) => ({ ...app }))
class FormDemand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        title: "",
        desc: "",
        contact: "",
        phone: "",
        region: "",
        qq: "",
        wechat: "",
        picture1: "",
        picture2: "",
        picture3: "",
        picture4: "",
        classifyId: "",

        attchments: "",
        longitude: "",
        latitude: "",
        province: "",
        city: "",
        adcode: ""
      }
    };
  }

  componentDidMount() {
    const { id } = this.props.navigation.state.params;
    if (id === "aptitude" || id === "reg") {
      this.state.isReg = true;
    }

    this.state.params.classifyId = id;
  }

  isLegal = () => {
    const { params } = this.state;
    if (params.title === "") {
      Toast.info("请填写标题");
      return false;
    }
    if (params.title.length < 10) {
      Toast.info("标题字数应在10-28个字")
      return false
    }
    if (params.contact === "") {
      Toast.info("请填写联系人");
      return false;
    }
    if (params.phone === "") {
      Toast.info("请填写电话");
      return false;
    }
    return true;
  };

  onSave = () => {
    getPosition({ ...this }).then(result => {
      if (this.isLegal() && result.isSuccess) {
        this.state.params = result.params;
        this.props.dispatch({
          type: this.state.isReg ? "app/saveInfoDraft" : "app/saveDemandDraft",
          payload: result.params,
          callback: res => {
            if (res.msg === "OK") {
              Toast.success("保存成功！", 1, this.goHome);
            }
          }
        });
      }
    }).catch(err=>{
      Toast.fail("发布失败，无法获取定位，请设置获取定位权限")
    });
  };

  goHome = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Home",
        params: {}
      })
    );
  };

  onPublish = () => {
    const that = { ...this };
    getPosition(that,Toast).then(result => {
      if (this.isLegal() && result.isSuccess) {
        this.state.params = result.params;
        this.props.dispatch({
          type: this.state.isReg ? "app/saveInfo" : "app/saveDemand",
          payload: result.params,
          callback: res => {
            if (res.msg === "OK") {
              Toast.success("发布成功！", 1, this.goHome);
            }
          }
        });
      }
    }).catch(err=>{
      Toast.fail("发布失败，无法获取定位，请设置获取定位权限")
    });
  };

  handleChange = (value, name) => {
    const { params } = this.state;
    let p = { ...params };
    if (name === "baseInfo") {
      p = { ...p, ...value };
    } else {
      p[name] = value;
    }
    this.state.params = p;
  };

  render() {
    const { isReg } = this.state;
    // 选择发布分类
    return (
      <ScrollView
        style={styles.wrap}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // onScrollEndDrag={this.handleScrollEnd}
      >
        <Text style={styles.title}>
          {isReg ? "注册人员、资质" : "注册人员、资质、（所有行业）需求"}
        </Text>
        <List style={styles.inputBox}>
          <InputItem
            multipleLine={false}
            style={styles.input}
            clear
            onChange={v => this.handleChange(v, "title")}
            maxLength={28}
            placeholder="请输入标题，10-28个字"
          />
          {isReg && (
            <InputItem
              multipleLine={false}
              style={styles.input}
              clear
              onChange={v => this.handleChange(v, "extraName")}
              maxLength={28}
              placeholder="人员名称|资质名称"
            />
          )}
        </List>
        <BaseInfo
          onChange={v => this.handleChange(v, "baseInfo")}
          params={this.state.params}
        />
        <Buttons onPublish={this.onPublish} onSave={this.onSave} />
        <WhiteSpace style={styles.bottom} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    paddingTop: 20
  },
  title: {
    paddingHorizontal: 15,
    marginBottom: 20
  },
  inputBox: {
    marginBottom: 10
  },
  input: {
    // fontSize: 10
  },
  uploadImg: {
    width: 40,
    height: 40
  },
  bottom: {
    backgroundColor: "#FFF",
    height: 40
  }
});

export default FormDemand;
