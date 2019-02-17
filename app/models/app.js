import { createAction, NavigationActions, Storage } from "../utils"
import * as authService from "../services/auth"
import * as publishService from "../services/publish"
import * as infoService from "../services/info"
import * as settleService from "../services/settle"
import * as profileService from "../services/profile"
import * as messageService from "../services/message"

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
      const login = yield call(Storage.get, "auth", "")
      yield put(createAction("updateState")({ login, loading: false }))
    },

    // 登陆
    *login({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(authService.login, payload)
      if (res.msg === "OK") {
        Storage.set("auth", res.result.token)
        yield put(
          createAction("updateState")({ login: true, fetching: false })
        )
        yield put(NavigationActions.back())
      } else {
        yield put(
          createAction("updateState")({ login: false, fetching: false })
        )
      }
      // Storage.set("token", login)
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
    *logout({ payload }, { call, put }) {
      yield call(Storage.set, "auth", "")
      yield put(
        NavigationActions.navigate({
          routeName: "HomeNavigator"
        })
      )
      yield put(createAction("updateState")({ login: false }))
    },

    // ---------- 需求类 ----------

    // 保存需求发布
    *saveDemand({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(publishService.saveDemandReview, payload)
      if (res) {
        const { id } = res.result
        const response = yield call(publishService.reviewDemand, { id })
        if (response&&callback) {
            callback(response)
        }
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 保存需求草稿
    *saveDemandDraft({ payload ,callback}, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(publishService.saveDemandDraft, payload)
      if (res&&callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    //  下架需求
    *draftDemand({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(publishService.draftDemand, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 发布需求
    // *reviewDemand({ payload }, { call, put }) {
    //   yield put(createAction("updateState")({ fetching: true }))
    //   const res = yield call(publishService.reviewDemand, payload)
    //   if (res) {
    //     yield put(NavigationActions.back())
    //   }
    //   yield put(createAction("updateState")({ res, fetching: false }))
    // },

    // 删除需求
    *deleteDemand({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(publishService.deleteDemand, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 我的需求
    *getDemandList({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(publishService.getDemandList, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // ---------- 信息类 ----------

    // 保存信息发布
    *saveInfo({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(infoService.saveInfoReview, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 保存信息草稿
    *saveInfoDraft({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(infoService.saveInfoDraft, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    //  下架信息
    *draftInfo({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(infoService.draftInfo, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 发布信息
    *reviewInfo({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(infoService.reviewInfo, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 删除信息
    *deleteInfo({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(infoService.deleteInfo, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 我的信息
    *getInfoList({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(infoService.getInfoList, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 我的信息
    *getInfoListById({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(infoService.getInfoListById, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // ---------- 入驻类 ----------

    // 商家入驻
    *settleNew({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(settleService.settleNew, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 已入驻列表
    *settleList({ payload,callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(settleService.settleList, payload)
      if (res&&callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 已入驻列表-个人中心中使用
    *settleOwnList({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(settleService.settleOwnList, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // ---------- 用户中心 ----------

    // 获取下载列表
    *getDownList({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.getDownList, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 获取用户信息
    *getProfile({ payload ,callback}, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.getProfile, payload)
      if (res&&callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 修改用户信息
    *saveProfile({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.saveProfile, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 新增收藏
    *saveBookmark({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.saveBookmark, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 收藏列表
    *getBookmark({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.getBookmark, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 新增历史记录
    *saveHistory({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.saveHistory, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 历史记录
    *getHistory({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.getHistory, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 获取关注行业列表
    *followList({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.followList, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 修改关注行业列表
    *updateFollow({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.updateFollow, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // ---------- 消息类 ----------

    // 获取通知列表
    *noticeList({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(messageService.noticeList, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 消息已读记录
    *noticeRead({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(messageService.noticeRead, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 获取推荐列表
    *recommendList({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(messageService.recommendList, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 推荐已读
    *recommendRead({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(messageService.recommendRead, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 获取图纸列表
    *paperList({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(messageService.paperList, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 下载图纸
    *downloadPaper({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(messageService.recommendRead, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    }
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: "loadStorage" })
    }
  }
}
