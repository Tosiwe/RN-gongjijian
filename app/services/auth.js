import request from "../utils/request"

// 登陆
export async function login(params) {
  return request(`http://118.24.107.177:7001/auth/login`, {
      method: "POST",
      body: params,
  })
}

// 发送验证码
export async function sendCode(params) {
  return request(`http://118.24.107.177:7001/auth/sendCode`, {
      method: "POST",
      body: params,
  })
}

// 注册
export async function register(params) {
  return request(`http://118.24.107.177:7001/auth/register`, {
      method: "POST",
      body: params,
  })
}

// 重设密码
export async function resetPwd(params) {
  return request(`127.0.0.1:7001/auth/resetPwd`, {
      method: "POST",
      body: params,
  })
}
