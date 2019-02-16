import request from "../utils/request"

// 获取下载列表
export async function getDownList(params) {
    return request(`http://118.24.107.177:7001/download/list`, {
        method: "POST",
        body: params,
    })
  }

// 获取用户信息
export async function getProfile() {
    return request(`http://118.24.107.177:7001/profile`, {
        method: "POST",
    })
  }
  
// 修改用户信息
export async function saveProfile(params) {
    return request(`http://118.24.107.177:7001/profile/save`, {
        method: "POST",
        body: params,
    })
  }
  
// 新增收藏
export async function saveBookmark(params) {
    return request(`http://118.24.107.177:7001/bookmark/save`, {
        method: "POST",
        body: params,
    })
  }
  
  
// 收藏列表
export async function getBookmark(params) {
    return request(`http://118.24.107.177:7001/bookmark/list`, {
        method: "POST",
        body: params,
    })
  }
  
  
// 新增历史记录
export async function saveHistory(params) {
    return request(`http://118.24.107.177:7001/history/save`, {
        method: "POST",
        body: params,
    })
  }
  
  
// 历史记录
export async function getHistory(params) {
    return request(`http://118.24.107.177:7001/history/list`, {
        method: "POST",
        body: params,
    })
  }
  
  
// 获取关注行业列表
export async function followList(params) {
    return request(`http://118.24.107.177:7001/follow/classify/list`, {
        method: "POST",
        body: params,
    })
  }
  
  
  
// 修改关注行业列表
export async function updateFollow(params) {
    return request(`http://118.24.107.177:7001/follow/classify/update`, {
        method: "POST",
        body: params,
    })
  }
  
  
