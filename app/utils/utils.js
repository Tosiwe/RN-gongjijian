import moment from "moment";
import { parse, stringify } from "qs";
import { message } from "antd";
import request from "./request"

export function fixedZero(val) {
    return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
    const now = new Date();
    const oneDay = 1000 * 60 * 60 * 24;

    if (type === "today") {
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        return [moment(now), moment(now.getTime() + (oneDay - 1000))];
    }

    if (type === "week") {
        let day = now.getDay();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);

        if (day === 0) {
            day = 6;
        } else {
            day -= 1;
        }

        const beginTime = now.getTime() - day * oneDay;

        return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
    }

    if (type === "month") {
        const year = now.getFullYear();
        const month = now.getMonth();
        const nextDate = moment(now).add(1, "months");
        const nextYear = nextDate.year();
        const nextMonth = nextDate.month();

        return [
            moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
            moment(
                moment(
                    `${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`
                ).valueOf() - 1000
            ),
        ];
    }

    if (type === "year") {
        const year = now.getFullYear();

        return [
            moment(`${year}-01-01 00:00:00`),
            moment(`${year}-12-31 23:59:59`),
        ];
    }
}

export function getPlainNode(nodeList, parentPath = "") {
    const arr = [];
    nodeList.forEach(node => {
        const item = node;
        item.path = `${parentPath}/${item.path || ""}`.replace(/\/+/g, "/");
        item.exact = true;
        if (item.children && !item.component) {
            arr.push(...getPlainNode(item.children, item.path));
        } else {
            if (item.children && item.component) {
                item.exact = false;
            }
            arr.push(item);
        }
    });
    return arr;
}

function accMul(arg1, arg2) {
    let m = 0;
    const s1 = arg1.toString();
    const s2 = arg2.toString();
    m += s1.split(".").length > 1 ? s1.split(".")[1].length : 0;
    m += s2.split(".").length > 1 ? s2.split(".")[1].length : 0;
    return (
        (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) / 10 ** m
    );
}

export function digitUppercase(n) {
    const fraction = ["角", "分"];
    const digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    const unit = [["元", "万", "亿"], ["", "拾", "佰", "仟", "万"]];
    let num = Math.abs(n);
    let s = "";
    fraction.forEach((item, index) => {
        s += (
            digit[Math.floor(accMul(num, 10 * 10 ** index)) % 10] + item
        ).replace(/零./, "");
    });
    s = s || "整";
    num = Math.floor(num);
    for (let i = 0; i < unit[0].length && num > 0; i += 1) {
        let p = "";
        for (let j = 0; j < unit[1].length && num > 0; j += 1) {
            p = digit[num % 10] + unit[1][j] + p;
            num = Math.floor(num / 10);
        }
        s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
    }

    return s
        .replace(/(零.)*零元/, "元")
        .replace(/(零.)+/g, "零")
        .replace(/^整$/, "零元整");
}

function getRelation(str1, str2) {
    if (str1 === str2) {
        console.warn("Two path are equal!"); // eslint-disable-line
    }
    const arr1 = str1.split("/");
    const arr2 = str2.split("/");
    if (arr2.every((item, index) => item === arr1[index])) {
        return 1;
    } else if (arr1.every((item, index) => item === arr2[index])) {
        return 2;
    }
    return 3;
}

function getRenderArr(routes) {
    let renderArr = [];
    renderArr.push(routes[0]);
    for (let i = 1; i < routes.length; i += 1) {
        // 去重
        renderArr = renderArr.filter(
            item => getRelation(item, routes[i]) !== 1
        );
        // 是否包含
        const isAdd = renderArr.every(
            item => getRelation(item, routes[i]) === 3
        );
        if (isAdd) {
            renderArr.push(routes[i]);
        }
    }
    return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
    let routes = Object.keys(routerData).filter(
        routePath => routePath.indexOf(path) === 0 && routePath !== path
    );
    // Replace path to '' eg. path='user' /user/name => name
    routes = routes.map(item => item.replace(path, ""));
    // console.log(path,routes);
    // Get the route to be rendered to remove the deep rendering
    const renderArr = getRenderArr(routes);
    // Conversion and stitching parameters
    const renderRoutes = renderArr.map(item => {
        const exact = !routes.some(
            route => route !== item && getRelation(route, item) === 1
        );
        return {
            exact,
            ...routerData[`${path}${item}`],
            key: `${path}${item}`,
            path: `${path}${item}`,
        };
    });
    return renderRoutes;
}

export function getPageQuery() {
    return parse(window.location.href.split("?")[1]);
}

export function getQueryPath(path = "", query = {}) {
    const search = stringify(query);
    if (search.length) {
        return `${path}?${search}`;
    }
    return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
    return reg.test(path);
}

const sendMsg = {
    isSuccess: true,
    msg: "",
    res: {},
};
export function modelResponse(response, callback, sucTips) {
    if (response) {
        if (response.error_code) {
            sendMsg.isSuccess = false;
            sendMsg.msg = response.message;
            // message.error(sendMsg.msg);
        } else {
            sendMsg.res = response;
            sendMsg.isSuccess = true;
            sendMsg.msg = "操作成功";
            if(sucTips){
                message.success(sendMsg.msg);
            }
        }
    } else {
        sendMsg.isSuccess = false;
        sendMsg.msg = "网络请求失败";
        // message.error(sendMsg.msg);
    }

    // console.log(
    //     "checkStatuscheckStatus-----------------------",
    //     sendMsg,
    //     sucTips
    // );
    if(callback){
        callback(sendMsg);
    }
}

/**
 * 
 * @param {} userAgent 
 * ie版本检测
 */

export function IETester(userAgent) {
    const UA = userAgent || navigator.userAgent;
    if (/msie/i.test(UA)) {
        return UA.match(/msie (\d+\.\d+)/i)[1];
    } else if (~UA.toLowerCase().indexOf("trident") && ~UA.indexOf("rv")) {
        return UA.match(/rv:(\d+\.\d+)/)[1];
    }
    return false;
}


/**
 *
 * 车牌号合法性校验
 * @export
 * @param {*} vehicleNumber
 * @returns
 */
export function isVehicleNumber(vehicleNumber) {

    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;

    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;

    if (vehicleNumber.length === 7) {

        return creg.test(vehicleNumber);

    } else if (vehicleNumber.length === 8) {

        return xreg.test(vehicleNumber);

    } else {

        return false;

    }

}

export function buriedPoint(item) {
    const url = window.SSystem.uba_buriedPoint;
    // const app_code =item.point.split("-")[0];
    if (!item.point) { return }
    return request(`${url}/api/infra-uba/v0.1/user-behaviors/APP0001/events`, {
        method: "POST",
        body:
        {
            event_code: item.point,
            event_name: item.name,
        },
        headers: {
            Accept: "application/json",
        },
    })
        .then(response => {
            if (response) {
                console.log("埋点");
            }
        }
        );
}


export const startToEndOneDay = (timeStamp) => {
    const startTime = new Date(timeStamp).setHours(0, 0, 0, 0) / 1000;

        
const endTime = startTime + 3600 * 24;
    return { startTime, endTime }
}

export const getCookie = (name) => {
    var arr, // eslint-disable-line
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); // eslint-disable-line
    if ((arr = document.cookie.match(reg))) {
        return unescape(decodeURI(arr[2]));
    } else {
        return "";
    }
}

export const getQueryString = (name) => {
    const reg1 = new RegExp(`(^|&)${  name  }=([^&]*)(&|$)`);
    const s = window.location.href.split("?")[1];
    const r = s ? s.match(reg1) : null;// search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]); return null;
}

