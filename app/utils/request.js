import fetch from "dva/fetch";
const apiorigin = window.SSystem.apiOrigin;

  function getCookie (name){
    let arr; const reg=new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
  }


/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
    let hostUrl = url;
    if (!options || !options.origin) {
        if (url.indexOf("http://") >= 0) {
            hostUrl = encodeURI(`${url}`); // 中文16进制转换
        } else {
            hostUrl = encodeURI(`${apiorigin}${url}`); // 中文16进制转换
        }
    }
    // options && delete options.origin;

    // const defaultOptions = {
      //  credentials: "include",
    // };
    // const userCode = getCookie('usercode') || ''
    // const userName =  getCookie('username') || ''
    // const userCode = "KF20180008";
    // const userName =  '陈远超';
    // let user = `username:${userName}&usercode:${userCode}`
    // user = escape(escape(user));

    // const newOptions = { ...defaultOptions, ...options };
    // const newOptions = { ...defaultOptions, ...options, headers:{
    //     Authorization: user,
    //     "us-app": escape(escape("source:华智安防&version:V2.0")),
    // } };

    if (
        newOptions.method === "POST" ||
        newOptions.method === "PUT" ||
        newOptions.method === "DELETE" ||
        newOptions.method === "PATCH"
    ) {
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                ...newOptions.headers,
            };

            newOptions.body = JSON.stringify(newOptions.body);
        } else {
            // newOptions.body is FormData
            newOptions.headers = {
                Accept: "*/*",
                ...newOptions.headers,
            };
        }
    }

    return fetch(hostUrl, newOptions)
        .then(response => {
            if (response.status === 204) {
                return response.text();
            }
            if (newOptions.noJson) {
                return response;
            }
            // if (response.status >= 400 && response.status < 500) {
            //     // message.info('请求错误');
            //     return;
            // }
            if (response.status >= 200 && response.status < 300) {
                if(newOptions.method === 'DELETE'){
                    return "删除成功";
                }
                if(newOptions.method === 'PUT'){
                    return "成功";
                }
                return response.json();
            }
            // console.log(response, 'response')
            return response.json();
        })
        .catch(e => {
            console.log(e);
            return null;
        });
}
