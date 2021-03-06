/* eslint-disable semi */
/* eslint-disable react/sort-comp */
import React, { Component } from "react";
import { connect } from "react-redux";

import { StyleSheet, ScrollView, Text, View, KeyboardAvoidingView } from "react-native";
import {
  Toast,
  List,
  InputItem,
  WhiteSpace,
  ActivityIndicator
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
      animating: false,
      tip:"发布",

      params: {
        title: "",
        desc: "",
        contact: "",
        phone: "",
        qq: "",
        wechat: "",
        picture1: "",
        picture2: "",
        picture3: "",
        picture4: "",
        classifyId: "",

        attchments: [],
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
      Toast.info("请填写标题", 3, null, false);
      return false;
    }
    if (params.contact === "") {
      Toast.info("请填写联系人", 3, null, false);
      return false;
    }
    if (params.phone === "") {
      Toast.info("请填写电话", 3, null, false);
      return false;
    }
    return true;
  };

  onSave = () => {
    if (this.isLegal()) {
      this.setState({ animating: true , tip:"保存"});
      const {params:oldParams} = this.state
      if(oldParams.province&&oldParams.city){
        this.props.dispatch({
          type: "app/saveInfoDraft",
          payload: oldParams,
          callback: res => {
            if (res.msg === "OK") {
              Toast.success("发布成功！", 3, this.goHome,false)
            }
            this.setState({ animating: false })
          }
        })
        return
      }
      getPosition({ ...this },Toast,false,true)
        .then(result => {
          if (result.isSuccess) {
            this.state.params = result.params;
            const {shortAdcode,... params}  = result.params
            this.props.dispatch({
              type: this.state.isReg
                ? "app/saveInfoDraft"
                : "app/saveDemandDraft",
              payload: params,
              callback: res => {
                if (res.msg === "OK") {
                  Toast.success("信息保存成功", 3, this.goHome,false);
                }
                this.setState({ animating: false });
              }
            });
          } else {
            this.setState({ animating: false });
          }
        })
        .catch(error => {
          this.setState({ animating: false });
        });
    }
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
    if (this.isLegal()) {
      this.setState({ animating: true, tip:"发布" });
      const {params:oldParams} = this.state
      if(oldParams.province&&oldParams.city){
        this.props.dispatch({
          type: "app/saveInfo",
          payload: oldParams,
          callback: res => {
            if (res.msg === "OK") {
              Toast.success("发布成功！", 3, this.goHome,false)
            }
            this.setState({ animating: false })
          }
        })
        return
      }
      getPosition(that, Toast,false,true)
        .then(result => {
          if (result.isSuccess) {
            this.state.params = result.params;
            const {shortAdcode,... params}  = result.params
            console.log("Publish Demand", params)
            this.props.dispatch({
              type: this.state.isReg ? "app/saveInfo" : "app/saveDemand",
              payload: params,
              callback: res => {
                if (res.msg === "OK") {
                  Toast.success("信息上传成功，系统管理员将在1-24小时之内审核！", 3, this.goHome,false);
                }
                this.setState({ animating: false });
              }
            });
          } else {
            this.setState({ animating: false });
          }
        })
        .catch(error => {
          this.setState({ animating: false });
        });
    }
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
    const { isReg ,tip} = this.state;
    // 选择发布分类
    return (
      <ScrollView
        style={styles.wrap}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // onScrollEndDrag={this.handleScrollEnd}
      >
        <ActivityIndicator
          animating={this.state.animating}
          text={`正在${tip}`}
          toast
          size="small"
        />
        <Text style={styles.title}>
          {isReg ? "注册人员、资质" : "注册人员、资质、（所有行业）需求"}
        </Text>
        <KeyboardAvoidingView behavior='padding'>

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
        <View style={{ height: 100 }} />
        <Buttons onPublish={this.onPublish} onSave={this.onSave} />
        </KeyboardAvoidingView>
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
