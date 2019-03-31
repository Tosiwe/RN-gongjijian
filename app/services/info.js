import request from "../utils/request"

// 保存发布
export async function saveInfoReview(params) {
    return request(`http://118.25.178.119:7001/info/saveReview`, {
        method: "POST",
        body: params,
    })
  }

// 保存信息草稿
export async function saveInfoDraft(params) {
    return request(`http://118.25.178.119:7001/info/saveDraft`, {
        method: "POST",
        body: params,
    })
  }
  

// 下架信息
export async function draftInfo(params) {
    return request(`http://118.25.178.119:7001/info/draft`, {
        method: "POST",
        body: params,
    })
  }
  

// 发布
export async function reviewInfo(params) {
    return request(`http://118.25.178.119:7001/info/review`, {
        method: "POST",
        body: params,
    })
  }

// 删除
export async function deleteInfo(params) {
    return request(`http://118.25.178.119:7001/info/delete`, {
        method: "POST",
        body: params,
    })
  }

// 我的信息
export async function getInfoList(params) {
    return request(`http://118.25.178.119:7001/info/own/list`, {
        method: "POST",
        body: params,
    })
  }
  

// 我的信息指定分类
export async function getInfoListById(params) {
    return request(`http://118.25.178.119:7001/info/own/classify/list`, {
        method: "POST",
        body: params,
    })
  }
  

// 我的信息指定分类
export async function getInfoListLoc(params) {
    return request(`http://118.25.178.119:7001/info/list`, {
        method: "POST",
        body: params,
    })
  }
  

// 详情
export async function getInfoDetail(params) {
    return request(`http://118.25.178.119:7001/info/detail`, {
        method: "POST",
        body: params,
    })
  }
  