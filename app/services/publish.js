import request from "../utils/request"

// 保存发布
export async function saveDemandReview(params) {
    return request(`http://118.24.107.177:7001/demand/saveReview`, {
        method: "POST",
        body: params,
    })
  }

// 保存需求草稿
export async function saveDemandDraft(params) {
    return request(`http://118.24.107.177:7001/demand/saveDraft`, {
        method: "POST",
        body: params,
    })
  }
  

// 下架需求
export async function draftDemand(params) {
    return request(`http://118.24.107.177:7001/demand/draft`, {
        method: "POST",
        body: params,
    })
  }
  

// 发布
export async function reviewDemand(params) {
    return request(`http://118.24.107.177:7001/demand/review`, {
        method: "POST",
        body: params,
    })
  }

// 删除
export async function deleteDemand(params) {
    return request(`http://118.24.107.177:7001/demand/delete`, {
        method: "POST",
        body: params,
    })
  }

// 我的需求
export async function getDemandList(params) {
    return request(`http://118.24.107.177:7001/demand/own/list`, {
        method: "POST",
        body: params,
    })
  }
  

// 我的信息by loction
export async function getDemandListLoc(params) {
    return request(`http://118.24.107.177:7001/demand/list`, {
        method: "POST",
        body: params,
    })
  }