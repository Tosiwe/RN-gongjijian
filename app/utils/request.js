/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { Toast } from "@ant-design/react-native"
import Storage from "./storage"
// import { AsyncStorage } from 'react-native'

export default function request(url, options) {
  
  return Storage.get("auth").then(auth => {

    if (!auth && !options.body.noNendAuth  ) {
      Toast.info("请先登录")
      return null
    }

    if(options.body && options.body.noNendAuth){
      delete options.body.noNendAuth
    }

    if(options.body||options.body!==""){
      options.body = JSON.stringify(options.body)
    }else{
      delete options.body
    }
    

    options.headers = {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: auth,
      // "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjNjljYTAtZmJjZi0xMWU4LWJhY2ItOGZhN2Y5YWVmNGY0IiwicGhvbmUiOiIxODMyODQwNjY4NSJ9LCJpYXQiOjE1NDY0NDY4MDN9.q354vlOk6oN1vMw8Kzq-XlyREa9ZTNSo6GdrwnBbZX8",
      ...options.headers
    }

    return (
      fetch(url, options)
        // eslint-disable-next-line consistent-return
        .then(response => {
          if (response.status === 500) {
            console.log("error", response)
          } else {
            console.log("response------------", response)
            return response.json()
          }
        })
        .catch(
          error =>
            // console.log("error------------", error)
            // callback(error);
            null
        )
    )
  })
}
