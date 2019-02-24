import request from "../utils/request"

// 创建订单
export async function creatRechargeOrder(params) {
    return request(`http://118.24.107.177:7001/order/recharge/create`, {
        method: "POST",
        body: params,
    })
  }

// create vip order
export async function createVipOrder(params) {
    return request(`http://118.24.107.177:7001/order/vip/create`, {
        method: "POST",
        body: params,
    })
  }

// create vip order
export async function getOrderList(params) {
    return request(`http://118.24.107.177:7001/order/vip/create`, {
        method: "POST",
        body: params,
    })
  }

// create vip order
export async function createOrderContact(params) {
    return request(`http://118.24.107.177:7001/order/contact/create`, {
        method: "POST",
        body: params,
    })
  }

// order list
export async function queryOrder(params) {
    // debugger
    return request(`http://118.24.107.177:7001/order/query`, {
        method: "POST",
        body: params,
    })
  }


// order list
export async function createOrderPaper(params) {
    return request(`http://118.24.107.177:7001/order/paper/create`, {
        method: "POST",
        body: params,
    })
  }


// order list
export async function createOrderAttach(params) {
    return request(`http://118.24.107.177:7001/order/attach/create`, {
        method: "POST",
        body: params,
    })
  }
