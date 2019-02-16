import request from "../utils/request"

// 商家入驻
export async function settleNew(params) {
    return request(`http://118.24.107.177:7001/settle/new`, {
        method: "POST",
        body: params,
    })
  }

// 已入驻列表
export async function settleList(params) {
    return request(`http://118.24.107.177:7001/settle/own/list`, {
        method: "POST",
        body: params,
    })
  }
  

// 已入驻列表-个人中心中使用
export async function settleOwnList(params) {
    return request(`http://118.24.107.177:7001/settle/normalize/own/list`, {
        method: "POST",
        body: params,
    })
  }
  
