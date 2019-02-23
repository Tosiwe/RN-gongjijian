/* eslint-disable semi */
/* eslint-disable react/sort-comp */
import React, { Component } from "react";
import { connect } from "react-redux";

import { StyleSheet, ScrollView, Text } from "react-native";
import { Toast, List, InputItem, WhiteSpace } from "@ant-design/react-native";
import { NavigationActions } from "react-navigation";
// import ImagePicker from 'react-native-image-picker'
import BaseInfo from "./BaseInfo";
import Buttons from "./Buttons";
import { createAction } from "../../utils";

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

        file: "",
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
    this.state.params.classifyId = id;
  }

  isLegal = () => {
    const { params } = this.state;
    if (params.title === "") {
      Toast.info("请填写标题");
      return false;
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
    this.getPosition().then(response => {
      const { params } = this.state;
      if (this.isLegal()) {
        this.props.dispatch({
          type: "app/saveDemandDraft",
          payload: params,
          callback: res => {
            if (res.msg === "OK") {
              Toast.success("保存成功！", 1, this.goHome);
            }
          }
        });
      }
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
    this.getPosition().then(response => {
      const { params } = this.state;
      if (this.isLegal()) {
        this.props.dispatch({
          type: "app/saveDemand",
          payload: params,
          callback: res => {
            if (res.msg === "OK") {
              Toast.success("发布成功！", 1, this.goHome);
            }
          }
        });
      }
    });
  };

  /** 获取地理位置（经纬度） */
  getPosition = () =>
    new Promise((resole, reject) => {
      /** 获取地理位置 */
      navigator.geolocation.getCurrentPosition(
        position => {
          // console.warn('成功：' + JSON.stringify(position));
          //  position.coords
          // 经度：positionData.longitude
          // 纬度：positionData.latitude
          const { params } = this.state;
          let newParams = { ...params };
          const { longitude, latitude } = position;
          newParams.longitude = longitude;
          newParams.latitude = latitude;
          this.props.dispatch({
            type: "app/getGeoCode",
            payload: {
              lng: longitude,
              lat: longitude
            },
            callback: res => {
              if (res.msg === "OK") {
                newParams = { ...newParams, ...res.result };
                this.state.params = newParams;
                resole();
              }
            }
          });
        },
        error => {
          console.warn(`失败：${JSON.stringify(error.message)}`);
          reject();
        },
        {
          // 提高精确度，但是获取的速度会慢一点
          enableHighAccuracy: true,
          // 设置获取超时的时间20秒
          timeout: 20000,
          // 示应用程序的缓存时间，每次请求都是立即去获取一个全新的对象内容
          maximumAge: 1000
        }
      );
    });

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
    const { id } = this.props.navigation.state.params;

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
          {id === "aptitude" || id === "reg"
            ? "注册人员、资质"
            : "注册人员、资质、（所有行业）需求"}
        </Text>
        <List style={styles.inputBox}>
          <InputItem
            multipleLine={false}
            style={styles.input}
            clear
            onChange={v => this.handleChange(v, "title")}
            maxLength={28}
            placeholder="请输入标题，28个字以内"
          />
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
