/* eslint-disable no-unused-expressions */
/* eslint-disable default-case */
/** 获取地理位置（经纬度） */
import { PermissionsAndroid , Platform} from "react-native"
import { Toast as m } from "@ant-design/react-native"

const requestExternalStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "请开启定位权限",
        message:
          "查询数据需要位置信息哦"
      }
    )
    return granted
  } catch (err) {
    console.error("Failed to request permission ", err)
    return null
  }
}

export const getPosition = (that, t,geoCode, forceUpdate,k) =>
  new Promise((resole, reject) => {
   
    const Toast = t||m
    const { params } = that.state

    if(Platform.OS==="android"){
      requestExternalStoragePermission().then(
      res=>{
        if (res==="never_ask_again"||res==="denied") {
          resole({ isSuccess: true, params:{
            ...params,
            city: "沧州市",
            province: "河北省",
          } })
          
        }
      }
    )
    }
    
     
    if(!forceUpdate && that.props.geoCode){
      let newParams={}
      if(geoCode){
        newParams= { ...params, ...geoCode }
      }else{
         newParams = { ...params, ...that.props.geoCode }
      }
      // newParams.adcode = Number(newParams.adcode.substring(0,2))
      // this.state.params = newParams;
      resole({ isSuccess: true, params: newParams })
      return
    }

   
    /** 获取地理位置 */
    navigator.geolocation.getCurrentPosition(
      position => {
        // console.warn('成功：' + JSON.stringify(position));
        //  position.coords
        // 经度：positionData.longitude
        // 纬度：positionData.latitude
        // const { params } = this.state;
        let newParams = { ...params }
        const { longitude, latitude } = position.coords
        newParams.longitude = longitude
        newParams.latitude = latitude
        const payload ={
          lng: longitude,
          lat: latitude,
        }
        if(forceUpdate){
          payload.forceUpdate = forceUpdate
        }
        // Toast.info(`获取到经纬度了${longitude }${latitude}`)
        if(k){
          Toast.info("router did")
        }
        that.props.dispatch({
          type: "app/getGeoCode",
          payload,
          callback: res => {
            if(k){
              Toast.info("router did")
            }
            if (res.msg === "OK") {
              newParams = { ...newParams, ...res.result }
              // newParams.adcode = Number(newParams.adcode.substring(0,2))
              // this.state.params = newParams;
              console.log("getGeoCode",res.result)
              resole({ isSuccess: true, params: newParams })

            } else {
              resole()
              Toast && Toast.info("获取定位失败", 1, null, false)
            }
          }
        })
      },
      error => {
        console.warn(`失败：${JSON.stringify(error.message)}`)
        resole({ isSuccess: true, params:{
          ...params,
          city: "沧州市",
          province: "河北省",
        } })
      },
      {
        // 提高精确度，但是获取的速度会慢一点
        enableHighAccuracy: false,
        // 设置获取超时的时间20秒
        timeout: 5000,
        // 示应用程序的缓存时间，每次请求都是立即去获取一个全新的对象内容
        maximumAge: 1000
      }
    )
  })
