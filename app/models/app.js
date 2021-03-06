/* eslint-disable no-param-reassign */
import { Toast } from "@ant-design/react-native"
import { createAction, NavigationActions, Storage } from "../utils"
import * as authService from "../services/auth"
import * as publishService from "../services/publish"
import * as infoService from "../services/info"
import * as settleService from "../services/settle"
import * as profileService from "../services/profile"
import * as messageService from "../services/message"
import * as orderService from "../services/order"

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

    *updateGeo({ payload }, { put }) {
      yield put(
        createAction("updateState")({
          geoCode: payload.geoCode,
          loading: false
        })
      )
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
        yield put(
          createAction("getUserFinance")({ login: true, fetching: false })
        )
        
        yield put(
          createAction("getProfile")({ login: true, fetching: false })
        )
        
        yield put(
          NavigationActions.navigate({
            routeName: "HomeNavigator"
          })
        )
      } else {
        yield put(
          createAction("updateState")({ login: false, fetching: false })
        )
      }
      // Storage.set("token", login)
    },

    // 登陆
    *wechatLogin({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(authService.wechatLogin, payload)
      if (res.msg === "OK") {
        Storage.set("auth", res.result.token)
        yield put(
          createAction("updateState")({ login: true, fetching: false })
        )
        yield put(
          NavigationActions.navigate({
            routeName: "HomeNavigator"
          })
        )
      } else {
        yield put(
          createAction("updateState")({ login: false, fetching: false })
        )
      }
      // Storage.set("token", login)
    },

    // 验证码
    *sendCode({ payload }, { call, put }) {
      payload.noNendAuth = true
      const code = yield call(authService.sendCode, payload)
      yield put(createAction("updateState")({ code, fetching: false }))
    },

    // 版本
    *checkVersion({ payload, callback}, { call, put }) {
      const code = yield call(authService.checkVersion, payload)

      if (code && callback) {
        callback(code)
      }

      yield put(createAction("updateState")({ code, fetching: false }))
    },

    // 版本地址
    *getVersionUrl({ payload, callback}, { call, put }) {
      const code = yield call(authService.getVersionUrl, payload)

      if (code && callback) {
        callback(code)
      }

      yield put(createAction("updateState")({ code, fetching: false }))
    },

    // 注册
    *register({ payload }, { call, put }) {
      payload.noNendAuth = true
      yield put(createAction("updateState")({ fetching: true }))
      const registed = yield call(authService.register, payload)
      if (registed) {
        Toast.success("注册成功！", 3, null, false)
        yield put(NavigationActions.navigate({ routeName: "Login" }))
      }
      yield put(createAction("updateState")({ registed, fetching: false }))
    },

    // 重置密码
    *resetPwd({ payload }, { call, put }) {
      payload.noNendAuth = true
      yield put(createAction("updateState")({ fetching: true }))
      const seted = yield call(authService.resetPwd, payload)
      if (seted) {
        Toast.success("修改成功！", 3, null, false)
        yield put(NavigationActions.navigate({ routeName: "Login" }))
      }
      yield put(createAction("updateState")({ seted, fetching: false }))
    },

    // 退出
    *logout({ payload }, { call, put }) {
      yield call(Storage.set, "auth", "")
      yield put(
        NavigationActions.navigate({
          routeName: "Login"
        })
      )
      yield put(createAction("updateState")({ login: false }))
    },

    // 价格配置
    *getPriceList({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(authService.getPriceList, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 用户金额
    *getUserFinance({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(authService.getUserFinance, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(
        createAction("updateState")({
          userFinance: res.result,
          fetching: false
        })
      )
    },

    // ---------- 需求类 ----------

    // 保存需求发布
    *saveDemand({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(publishService.saveDemandReview, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 保存需求草稿
    *saveDemandDraft({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(publishService.saveDemandDraft, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    //  下架需求
    *draftDemand({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(publishService.draftDemand, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 发布需求
    *reviewDemand({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(publishService.reviewDemand, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 删除需求
    *deleteDemand({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(publishService.deleteDemand, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 我的需求
    *getDemandList({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(publishService.getDemandList, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // location需求
    *getDemandListLoc({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(publishService.getDemandListLoc, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // location需求
    *getDemandDetail({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(publishService.getDemandDetail, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // ---------- 信息类 ----------

    // 保存信息发布
    *saveInfo({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(infoService.saveInfoReview, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 保存信息草稿
    *saveInfoDraft({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(infoService.saveInfoDraft, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    //  下架信息
    *draftInfo({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(infoService.draftInfo, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 发布信息
    *reviewInfo({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(infoService.reviewInfo, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 删除信息
    *deleteInfo({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(infoService.deleteInfo, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 我的信息
    *getInfoList({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(infoService.getInfoList, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 我的信息指定类别
    *getInfoListById({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(infoService.getInfoListById, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 信息location
    *getInfoListLoc({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(infoService.getInfoListLoc, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 详情
    *getInfoDetail({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(infoService.getInfoDetail, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // ---------- 入驻类 ----------

    // 商家入驻
    *settleNew({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(settleService.settleNew, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 已入驻列表
    *settleList({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(settleService.settleList, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(
        createAction("updateState")({
          settleList: res.result.data,
          fetching: false
        })
      )
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
    *getDownList({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.getDownList, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 获取下载列表
    *deleteDownload({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.deleteDownload, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 获取用户信息
    *getProfile({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.getProfile, payload)
      if (res && callback) {
        callback(res)
        yield put(
          createAction("updateState")({ userInfo: res.result, fetching: false })
        )
      }
    },

    // 修改用户信息
    *saveProfile({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.saveProfile, payload)
      let response = {}
      if (res) {
        response = yield call(profileService.getProfile, payload)
        if (response && callback) {
          callback(response)
        }
      }

      yield put(
        createAction("updateState")({
          userInfo: response.result,
          fetching: false
        })
      )
    },

    // 新增收藏
    *saveBookmark({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.saveBookmark, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 新增收藏
    *cancelBookmark({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.cancelBookmark, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 收藏列表
    *getBookmark({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.getBookmark, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 新增历史记录
    *saveHistory({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.saveHistory, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 新增历史记录
    *historyClean({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.historyClean, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 历史记录
    *getHistory({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.getHistory, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 获取关注行业列表
    *followList({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.followList, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ followList:res.result, fetching: false }))
    },

    // 修改关注行业列表
    *updateFollow({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.updateFollow, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 认证
    *verify({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.verify, payload)
      if (res) {
        yield put(NavigationActions.back())
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 查询认证
    *getVerify({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(profileService.getVerify, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // ---------- 消息类 ----------

    // 获取通知列表
    *noticeList({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(messageService.noticeList, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 消息已读记录
    *noticeRead({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(messageService.noticeRead, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 获取推荐列表
    *recommendList({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(messageService.recommendList, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 推荐已读
    *recommendRead({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(messageService.recommendRead, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 获取图纸列表
    *paperList({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(messageService.paperList, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 下载图纸
    *downloadPaper({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(messageService.downloadPaper, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    // 下载图纸
    *getFileUrl({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(messageService.getFileUrl, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },
    // get token
    *getUploadToken({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(messageService.getUploadToken, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },
    // get token
    *getGeoCode({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      if (payload.forceUpdate) {
        const {forceUpdate,...pa} = payload
        const res = yield call(messageService.getGeoCode, pa)
        if (res && callback) {
          callback(res)
        }
        yield put(
          createAction("updateState")({
            fetching: false
          })
        )
      } else {
        const res = yield call(messageService.getGeoCode, payload)
        if (res && callback) {
          callback(res)
        }
        const { lng: longitude, lat: latitude } = payload
        yield put(
          createAction("updateState")({
            geoCode: res && { longitude, latitude, ...res.result },
            fetching: false
          })
        )
      }
    },
    // 搜索
    *search({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(messageService.search, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },
    // 热门
    *searchHotList({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(messageService.searchHotList, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },
    // banner
    *bannerList({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(messageService.bannerList, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },
    // cai  ni xi huan
    *guesslikeList({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(messageService.guesslikeList, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ guesslikePage:res.result && res.result.length===0 ?'-1': payload.pn, fetching: false }))
    },

    // ---------------订单相关------------

    *creatRechargeOrder({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(orderService.creatRechargeOrder, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    *getOrderList({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(orderService.getOrderList, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    *createVipOrder({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(orderService.createVipOrder, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    *createSuperVipOrder({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(orderService.createSuperVipOrder, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    *createVipOrderApple({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(orderService.createVipOrderApple, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    *createSuperVipOrderApple({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(orderService.createSuperVipOrderApple, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    *createOrderContact({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(orderService.createOrderContact, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    *createOrderPaper({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(orderService.createOrderPaper, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    *createOrderAttach({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(orderService.createOrderAttach, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    *queryOrder({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(orderService.queryOrder, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    *orderRecordQuery({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(orderService.orderRecordQuery, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    *getAppleProducts({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(orderService.getAppleProducts, payload)
      if (res && callback) {
        callback(res)
      }
      yield put(createAction("updateState")({ res, fetching: false }))
    },

    *appleVerify({ payload, callback }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }))
      const res = yield call(orderService.appleVerify, payload)
      if (res && callback) {
        callback(res)
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
