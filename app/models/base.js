import { login } from "../services/baseService";
import { modelResponse } from "../utils/utils";

export default {
  namespace: "baseQuery",

  state: {
    login: {}
  },

  effects: {
    *login({ payload, callback, sucTips }, { call, put }) {
      debugger
      const response = yield call(login, payload);
      yield put({
        type: "loginRul",
        payload: response
      });
      modelResponse(response, callback, sucTips);
    }
  },

  reducers: {
    loginRul(state, action) {
      debugger
      return {
        ...state,
        login: action.payload
      };
    }
  }
};
