/* eslint-disable no-unused-expressions */
/* eslint-disable default-case */
/** 获取地理位置（经纬度） */
import { PermissionsAndroid } from "react-native"

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

export const getPosition = (that, Toast,geoCode, forceUpdate) =>
  new Promise((resole, reject) => {
    const grand = requestExternalStoragePermission()
    if (!grand) {
      resole()
      return
    }

    const { params } = that.state

     
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
        that.props.dispatch({
          type: "app/getGeoCode",
          payload,
          callback: res => {
            if (res.msg === "OK") {
              newParams = { ...newParams, ...res.result }
              // newParams.adcode = Number(newParams.adcode.substring(0,2))
              // this.state.params = newParams;
              resole({ isSuccess: true, params: newParams })
            } else {
              resole()
              Toast && Toast.info("获取定位失败")
            }
          }
        })
      },
      error => {
        console.warn(`失败：${JSON.stringify(error.message)}`)
        Toast && Toast.info(`失败：${JSON.stringify(error.message)}`)
        reject(error)
      },
      {
        // 提高精确度，但是获取的速度会慢一点
        // enableHighAccuracy: true,
        // 设置获取超时的时间20秒
        timeout: 20000,
        // 示应用程序的缓存时间，每次请求都是立即去获取一个全新的对象内容
        maximumAge: 1000
      }
    )
  })
