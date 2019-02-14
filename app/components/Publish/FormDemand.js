/* eslint-disable semi */
/* eslint-disable react/sort-comp */
import React, { Component } from "react"
import { connect } from "react-redux"

import { StyleSheet, ScrollView, Text } from "react-native"
import { Toast, List, InputItem, WhiteSpace } from "@ant-design/react-native"
// import ImagePicker from 'react-native-image-picker'
import BaseInfo from "./BaseInfo"
import Buttons from "./Buttons"
import { createAction } from "../../utils"


@connect(({ app }) => ({ ...app }))
class FormDemand extends Component {
  constructor(props) {
    super(props)
    this.state = {
      params:{
        title:"",
        desc:"",
        contact:"",
        phone:"",
        region:"",
        qq:"",
        wechat:"",
        picture1:"1",
        picture2:"2",
        picture3:"3",
        picture4:"4",
        classifyId:"",
      }
    }
  }

  componentDidMount(){
    const { id } = this.props.navigation.state.params
    this.state.params.classifyId = id
  }

  fillForm = el => {
    Toast.info(el.type)
  };

  isLegal=()=>{
    const {params}= this.state;
    if(params.title === ""){
      Toast.info("请填写标题")
      return false;
    }if (params.contact === ""){
      Toast.info("请填写联系人")
      return false;
    }if(params.phone === ""){
      Toast.info("请填写电话")
      return false;
    }
    return true;
  }

  onSave = () => {
    const {params} = this.state;
    if(true){
      this.props.dispatch(createAction('app/saveDemand')(params)).then((res)=>{
        Toast.info(res)
      })
      console.log('params',params)
    }

  };

  onPublish = () => {
    const {params} = this.state;
    if(true){
      this.props.dispatch(createAction('app/saveDemand')(params)).then((res)=>{
        Toast.info(res)
      })
      console.log('params',params)
    }

  };

  changeTitle=v=>{
    this.state.params.title = v;
  }

  changeBaseInfo=params=>{
    this.setState({params})
  }

  render() {
    const { id } = this.props.navigation.state.params

    // 选择发布分类
    return (
      <ScrollView
        style={styles.wrap}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={this.handleScrollEnd}
      >
        <Text style={styles.title}>
          {id === 'aptitude' || id === 'reg'
            ? "注册人员、资质"
            : "注册人员、资质、（所有行业）需求"}
        </Text>
        <List style={styles.inputBox}>
          <InputItem
            style={styles.input}
            clear
            onChange={this.changeTitle}
            placeholder="请输入标题10~28个字"
          />
        </List>
        <BaseInfo onChange={this.changeBaseInfo} params={this.state.params}/>
        <Buttons onPublish={this.onPublish} onSave={this.onSave} />
        <WhiteSpace style={styles.bottom} />
      </ScrollView>
    )
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
})

export default FormDemand
