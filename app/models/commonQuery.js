import { getDataDicByDes,getDataDicByGro,updateTheme} from "../services/commonSystem";
import { modelResponse } from "../utils/utils";

export default {
    namespace: "commonQuery",

    state: {
        dataDicResult: {},
        themeResult: {},
    },

    effects: {
        *getByDes({  payload, callback, sucTips }, { call, put }) {
            const response = yield call(getDataDicByDes, payload);
            yield put({
                type: "getRul",
                payload: response,
            });
            modelResponse(response, callback, sucTips);
        },
        *getByGroup({  payload, callback, sucTips }, { call, put }) {
            const response = yield call(getDataDicByGro, payload);
            yield put({
                type: "getRul",
                payload: response,
            });
            modelResponse(response, callback, sucTips);
        },
        *updateUserTheme({  payload, callback, sucTips }, { call, put }) {
            const response = yield call(updateTheme, payload);
            yield put({
                type: "themeRul",
                payload: response,
            });
            modelResponse(response, callback, sucTips);
        },
    },

    reducers: {
        getRul(state, action) {
            return {
                ...state,
                dataDicResult: action.payload,
            };
        },
        themeRul(state, action) {
            return {
                ...state,
                themeResult: action.payload,
            };
        },
    },
};