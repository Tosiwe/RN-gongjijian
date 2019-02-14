import request from "../utils/request"

// 保存发布
export async function saveDemandReview(params) {
    return request(`http://118.24.107.177:7001/demand/saveReview`, {
        method: "POST",
        body: params,
    })
  }
  