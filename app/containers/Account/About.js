/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, StyleSheet, Text, Image ,TouchableOpacity,Platform,Dimensions} from "react-native"
import { NavigationActions } from "react-navigation"
import * as wechat from "react-native-wechat"
import {Toast,Modal}from "@ant-design/react-native"
import { connect } from "react-redux"
import QRCode from 'react-native-qrcode'



const ScreenWidth = Dimensions.get("window").width // 屏幕宽度
const ScreenHeight = Dimensions.get("window").height // 屏幕宽度

@connect(({ app }) => ({ ...app }))
class About extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: "http://www.npsqsc.com/download.html"
    }
  }

  // componentDidMount() {
  //   this.props.dispatch({
  //     type:"app/getVersionUrl",
  //     callback:res=>{
  //       if(res.status==="OK"){
  //        const url =  res.result.qrUrl
  //       //  const url =  Platform.OS==="ios" ? res.result.iosUrl : res.result.url
  //         this.setState({url})
  //         // Linking.openURL(res.result).catch(err => console.error('An error occurred', err))
  //       }
  //     }
  //   })
  // }

  toSet = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Setting",
        params: { name: "设置" }
      })
    )
  };

  share=()=>{
    Modal.alert("分享", "将下载地址分享到微信", [
      {
        text: "取消"
      },
      {
        text: "去分享",
        onPress: () => {
          wechat
          .isWXAppInstalled()
          .then(isInstalled => {
            if (isInstalled) {
              wechat
                // .shareToSession({
                //   type: "imageUrl",
                //   title: '工机建',
                //   description: '扫码下载工机建',
                //   mediaTagName: "二维码",
                //   imageUrl: base64
                // })
                .shareToSession({
                  type: "text",
                  description: this.state.url
                })
                .catch(error => {
                  console.log(error)
                })
            } else {
              Toast.info("请安装微信", 3, null, false)
            }
          })
          .catch(error => {
            console.log(error)
          })
        }
      }
    ])
    
   
  }

  render() {
    console.log("width",ScreenWidth)
    console.log("Height",ScreenHeight)
    return (
      // <View  style={styles.container}>
      //   <WebView
      //     style={{width:ScreenWidth,height:ScreenHeight,backgroundColor:'gray'}}
      //     source={{uri:'http://www.npsqsc.com/',method: 'GET'}}
      //   />
      // </View>
  

      <View style={styles.wrap}>
        <View style={{ alignItems: "center" }}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("../img/img_logo.png")}
          />
          <Text>v1.2.0</Text>
        </View>
        <View style={{ alignItems: "center", marginTop:20 }}>
        <TouchableOpacity
        onPress={this.share}
        activeOpacity={1}>
          <QRCode
          value={this.state.url}
          size={200}
          bgColor='black'
          fgColor='white'
          />
          </TouchableOpacity>
          
        </View>
        <View style={styles.info}>
          <Text>Copyright@2017-2019</Text>
          <Text>南皮县高品钢结构有限公司 版权所有</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop:20,
  },

  wrap: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#FFF",
    justifyContent: "center"
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom:20,
  },
  info: {
    marginTop:50,
    alignItems: "center"
  }
})
export default About
