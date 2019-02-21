/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable default-case */
/* eslint-disable func-names */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/**
 * Created by FOX on 2017/4/17.
 */
/**
 * 直传文件
 * formInput对象如何配置请参考七牛官方文档“直传文件”一节
 */
const uploadFile = function(
  uri,
  token,
  formInput,
  uploadComplete,
) {
  let oloaded
  return new Promise((resolve, reject) => {
    if (
      typeof uri !== "string" ||
      uri === "" ||
      typeof formInput.key === "undefined"
    ) {
      reject && reject(null)
      return
    }
    if (uri[0] === "/") {
      uri = `file://${uri}`
    }
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function() {
      console.log(`${xhr.toString()}qiniu================neeed`)
      switch (xhr.readyState) {
        case 0:
          // alert("请求未初始化");
          callbackFailure(0)
          break
        case 1:
          callBackSuccess(1)
          break
        case 2:
          callBackSuccess(2)
          break
        case 3:
          break
        case 4:
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            // var data = xhr.responseText;
            // var message = xhr.response;
            if (xhr.status == 200) {
              callBackSuccess(200)
            }
          } else if (xhr.status == 401) {
            callbackFailure(401)
          } else if (xhr.status == 614) {
            callbackFailure(614)
          } else if (xhr.status == 631) {
            callbackFailure(631)
          }

          break
      }
    }
    xhr.open("POST", "http://up-z1.qiniup.com")
    xhr.onload = () => {
      if (xhr.status !== 200) {
        reject && reject(xhr)
        return
      }
      resolve && resolve(xhr)
    }
    xhr.onload = uploadComplete // 请求完成
    xhr.onerror = uploadFailed // 请求失败
    xhr.upload.onprogress = evt => {
      oloaded = evt.loaded // 重新赋值已上传文件大小，用以下次计算
      console.log(
        `qinniu+==================================${Math.round(
          (oloaded / evt.total) * 100
        )}`
      )
      callbackUpDate(Math.round((oloaded / evt.total) * 100))
    }

    const formdata = new FormData()
    formdata.append("key", formInput.key)
    formdata.append("token", token)
    if (typeof formInput.type === "undefined")
      formInput.type = "application/octet-stream"
    if (typeof formInput.name === "undefined") {
      const filePath = uri.split("/")
      if (filePath.length > 0) formInput.name = filePath[filePath.length - 1]
      else formInput.name = ""
    }
    formdata.append("file", {
      uri,
      type: formInput.type,
      name: formInput.name
    })
    // xhr.upload.onprogress = (event) => {
    //   onprogress && onprogress(event, xhr);
    // };
    xhr.upload.onloadstart = () => {
      // 上传开始执行方法
      oloaded = 0 // 设置上传开始时，以上传的文件大小为0
      console.log(`qinniu+==================================oloaded${oloaded}`)
    }
    xhr.send(formdata)
  })
}

 
// 上传失败
function callBackSuccess(evt) {}
function callbackFailure(evt) {}
function callbackUpDate(evt) {}
function uploadFailed(evt) {}
// 发送管理和fop命令,总之就是不上传文件
function post(uri, adminToken, content) {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  const payload = {
    headers,
    method: "POST",
    dataType: "json",
    timeout: 3600000
  }
  if (typeof content === "undefined") {
    payload.headers["Content-Length"] = 0
  } else {
    // carry data
    payload.body = content
  }

  if (adminToken) {
    headers.Authorization = adminToken
  }

  return fetch(uri, payload)
}

export default uploadFile
