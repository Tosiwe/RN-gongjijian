import request from "../utils/request"

// 登陆
export async function login(params) {
  return request(`http://118.25.178.119:7001/auth/login`, {
      method: "POST",
      body: params,
  })
}

// 登陆
export async function wechatLogin(params) {
  return request(`http://118.25.178.119:7001/auth/login/wechat`, {
      method: "POST",
      body: params,
  })
}

// 发送验证码
export async function sendCode(params) {
  return request(`http://118.25.178.119:7001/auth/sendCode`, {
      method: "POST",
      body: params,
  })
}

// 注册
export async function register(params) {
  return request(`http://118.25.178.119:7001/auth/register`, {
      method: "POST",
      body: params,
  })
}

// 重设密码
export async function resetPwd(params) {
  return request(`http://118.25.178.119:7001/auth/resetPwd`, {
      method: "POST",
      body: params,
  })
}

// 获取价格
export async function getPriceList(params) {
  return request(`http://118.25.178.119:7001/price/list`, {
      method: "POST",
      body: params,
  })
}

// 获取用户余额&会员
export async function getUserFinance(params) {
  return request(`http://118.25.178.119:7001/finance`, {
      method: "POST",
      body: params,
  })
}

// 版本
export async function checkVersion(params) {
  return request(`http://118.25.178.119:7001/public/upgrade/info`, {
      method: "POST",
      body: params,
  })
}

// 版本地址
export async function getVersionUrl(params) {
  return request(`http://118.25.178.119:7001/public/apk/url`, {
      body: params,
  })
}
