import { delay } from '../utils'
import request from "../utils/request";

export async function login(params) {
  return request(`http://118.24.107.177:7001/auth/login`, {
      method: "POST",
      body: params,
  });
}
