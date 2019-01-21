import { createAction, NavigationActions, Storage } from '../utils'
import * as authService from '../services/auth'

export default {
  namespace: 'app',
  state: {
    login: false,
    loading: true,
    fetching: false,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {

    *loadStorage(action, { call, put }) {
      const login = yield call(Storage.get, 'login', false)
      yield put(createAction('updateState')({ login, loading: false }))
    },

    // 登陆
    *login({ payload }, { call, put }) {
      yield put(createAction('updateState')({ fetching: true }))
      const login = yield call(authService.login, payload)
      if (login) {
        yield put(NavigationActions.back())
      }
      yield put(createAction('updateState')({ login, fetching: false }))
      Storage.set('login', login)
    },

    *sendCode({ payload }, { call, put }) {
      const code = yield call(authService.sendCode, payload)
      yield put(createAction('updateState')({ code, fetching: false }))
    },

    *register({ payload }, { call, put }) {
      yield put(createAction('updateState')({ fetching: true }))
      const registed = yield call(authService.register, payload)
      if (registed) {
        yield put(NavigationActions.back())
      }
      yield put(createAction('updateState')({ registed, fetching: false }))
    },

    *resetPwd({ payload }, { call, put }) {
      yield put(createAction('updateState')({ fetching: true }))
      const seted = yield call(authService.resetPwd, payload)
      if (seted) {
        yield put(NavigationActions.back())
      }
      yield put(createAction('updateState')({ seted, fetching: false }))
    },

    *logout(action, { call, put }) {
      yield call(Storage.set, 'login', false)
      yield put(createAction('updateState')({ login: false }))
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' })
    },
  },
}
