import request from "../utils/request"

// 创建订单
export async function creatRechargeOrder(params) {
    return request(`http://118.25.178.119:7001/order/recharge/create`, {
        method: "POST",
        body: params,
    })
  }

// create vip order
export async function createVipOrder(params) {
    return request(`http://118.25.178.119:7001/order/vip/create`, {
        method: "POST",
        body: params,
    })
  }

// create vip order
export async function createVipOrderApple(params) {
    return request(`http://118.25.178.119:7001/order/apple/vip/create`, {
        method: "POST",
        body: params,
    })
  }


// create settle order
export async function createSuperVipOrder(params) {
    return request(`http://118.25.178.119:7001/order/supervip/create`, {
        method: "POST",
        body: params,
    })
  }


// create settle order
export async function createSuperVipOrderApple(params) {
    return request(`http://118.25.178.119:7001/order/apple/supervip/create`, {
        method: "POST",
        body: params,
    })
  }

// get vip order
export async function getOrderList(params) {
    return request(`http://118.25.178.119:7001/order/list`, {
        method: "POST",
        body: params,
    })
  }

// create contact order
export async function createOrderContact(params) {
    return request(`http://118.25.178.119:7001/order/contact/create`, {
        method: "POST",
        body: params,
    })
  }

// order list
export async function queryOrder(params) {
    // debugger
    return request(`http://118.25.178.119:7001/order/query`, {
        method: "POST",
        body: params,
    })
  }


// order list
export async function createOrderPaper(params) {
    return request(`http://118.25.178.119:7001/order/paper/create`, {
        method: "POST",
        body: params,
    })
  }


// order list
export async function createOrderAttach(params) {
    return request(`http://118.25.178.119:7001/order/attach/create`, {
        method: "POST",
        body: params,
    })
  }

// order list
export async function orderRecordQuery(params) {
    return request(`http://118.25.178.119:7001/order/record/query`, {
        method: "POST",
        body: params,
    })
  }

// order list
export async function getAppleProducts(params) {
    return request(`http://118.25.178.119:7001/apple/product/list`, {
        method: "POST",
        body: params,
    })
  }

// order list
export async function appleVerify(params) {
    return request(`http://118.25.178.119:7001/apple/verify`, {
        method: "POST",
        body: params,
    })
  }
