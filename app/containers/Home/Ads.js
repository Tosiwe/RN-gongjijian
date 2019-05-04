/* eslint-disable react/prefer-stateless-function */
// native
import React, { Component } from "react"
import { View, StyleSheet, Image,TouchableWithoutFeedback ,Linking, BackHandler, Platform} from "react-native"
import { Carousel } from "@ant-design/react-native"
import { connect } from "react-redux"
// import { adsList } from "./data"
// import {NavigationActions}from "react-navigation"
// import { screenWidth } from "../../styles/common"
import ImageViewer from "../../components/Detail/ImageViewer"

@connect()
class Ads extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  onOpen=(item,index)=>{
    const {isAds}= this.props
    if(isAds){
      Linking.openURL(item.link).catch(err => console.error('An error occurred', err))
    }else{

      this.setState({visible:true,imgaeIndex:index})
        
    }
  }

  render() {
    const {data}= this.props
    const { list ,visible,imgaeIndex} = this.state
    const imgList = data||list||[]
    return (
      <View>
         <Carousel
        style={this.props.noRadius ? "" : styles.ads}
        selectedIndex={2}
        autoplay
        infinite
      >
        {
          imgList.map((item,index) => (
            <TouchableWithoutFeedback onPress={()=>this.onOpen(item,index)} style={styles.containerHorizontal} key={Math.random()}>
              <Image
                style={this.props.noRadius?styles.detailItem:styles.item }
                source={{
                  uri: item.url
                }}
              />
            </TouchableWithoutFeedback>
          ))
        }
      </Carousel>
        <ImageViewer visible={visible} index={imgaeIndex} imgs={imgList} onCancel={()=>this.setState({visible:false})}/>
      </View>
     
    )
  }
}
const styles = StyleSheet.create({
  // ads: {
  //   borderRadius: 20
  // },

  containerHorizontal: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 200
  },
  item: {
    // flexDirection:"row",
    // justifyContent:"center",
    width: '100%',
    height: 200,
    resizeMode:'contain',
    backgroundColor:"#fff"

  },
  detailItem: {
    // flexDirection:"row",
    // justifyContent:"center",
    width: '100%',
    height: 200,
    resizeMode:'contain',
    backgroundColor:"#fff"
  },
  block:{
    backgroundColor: "#DDD"
  },
})
export default Ads
