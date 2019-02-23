import request from "../utils/request"

// 获取通知列表
export async function noticeList(params) {
    return request(`http://118.24.107.177:7001/user/notice/list`, {
        method: "POST",
        body: params,
    })
  }

// 消息已读记录
export async function noticeRead(params) {
    return request(`http://118.24.107.177:7001/notice/read`, {
        method: "POST",
        body: params,
    })
  }
  

// 获取推荐列表
export async function recommendList(params) {
    return request(`http://118.24.107.177:7001/recommend/list`, {
        method: "POST",
        body: params,
    })
  }
  

// 推荐已读
export async function recommendRead(params) {
    return request(`http://118.24.107.177:7001/recommend/read`, {
        method: "POST",
        body: params,
    })
  }

// 获取图纸列表
export async function paperList(params) {
    return request(`http://118.24.107.177:7001/paper/list`, {
        method: "POST",
        body: params,
    })
  }

// 下载图纸
export async function downloadPaper(params) {
    return request(`http://118.24.107.177:7001/paper/download`, {
        method: "POST",
        body: params,
    })
  }

// token
export async function getUploadToken(params) {
    return request(`http://118.24.107.177:7001/upload/getToken`, {
        method: "POST",
        body: params,
    })
  }

// 城市
export async function getGeoCode(params) {
    return request(`http://118.24.107.177:7001/common/geo/coder`, {
        method: "POST",
        body: params,
    })
  }
