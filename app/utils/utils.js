/* eslint-disable default-case */
/** 获取地理位置（经纬度） */
export const getPosition = (that, Toast) =>
  new Promise((resole, reject) => {
    const { params } = that.state
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
        newParams.lng = longitude
        newParams.lat = latitude
        that.props.dispatch({
          type: "app/getGeoCode",
          payload: {
            lng: longitude,
            lat: latitude
          },
          callback: res => {
            if (res.msg === "OK") {
              newParams = { ...newParams, ...res.result }
              newParams.adcode = Number(newParams.adcode.substring(0,2))
              // this.state.params = newParams;
              resole({ isSuccess: true, params: newParams })
            } else {
              reject()
              Toast.info("获取定位失败")
            }
          }
        })
      },
      error => {
        console.warn(`失败：${JSON.stringify(error.message)}`)
        Toast.info(`失败：${JSON.stringify(error.message)}`)
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
