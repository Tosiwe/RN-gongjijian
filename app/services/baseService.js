
import request from "../utils/request";

export async function login(params) {
  debugger
  return request(`http://118.24.107.177:7001/auth/login`, {
      method: "POST",
      body: params,
  });
}
