import { createAction, NavigationActions, Storage } from "../utils"
import * as authService from "../services/auth"
import * as publishService from "../services/publish"

export default {
  namespace: "app",
  state: {
    login: false,
    loading: true,
    fetching: false
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *loadStorage(action, { call, put }) {
      const login = yield call(Storage.get, "login", false)
      yield put(createAction("updateState")({ login, loading: false }))
    },

    // 登陆
    *login({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const login = yield call(authService.login, payload)
      if (login) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ login, fetching: false }))
      Storage.set("token", login)
    },

    // 验证码
    *sendCode({ payload }, { call, put }) {
      const code = yield call(authService.sendCode, payload)
      yield put(createAction("updateState")({ code, fetching: false }))
    },

    // 注册
    *register({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const registed = yield call(authService.register, payload)
      if (registed) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ registed, fetching: false }))
    },

    // 重置密码
    *resetPwd({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const seted = yield call(authService.resetPwd, payload)
      if (seted) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ seted, fetching: false }))
    },
    
    // 退出
    *logout(action, { call, put }) {
      yield call(Storage.set, "login", false)
      yield put(createAction("updateState")({ login: false }))
    },

    // 保存需求发布
    *saveDemand({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(publishService.saveDemandReview, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },
    
    
  },
    subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: "loadStorage" })
    }
  }
}
