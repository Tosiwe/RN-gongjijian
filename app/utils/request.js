
// import fetch from "dva/fetch";
// const apiorigin = window.SSystem.apiOrigin;

function getCookie(name) {
  let arr;
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  options.body = JSON.stringify(options.body);

  options.headers = {
    Accept: "application/json;charset=utf-8",
    "Content-Type": "application/x-www-form-urlencoded",
    ...options.headers
  };

  return fetch(url, options)
    .then(response => {
        if(response.status===500){
            console.log("error",response)
        }else{
            return response.json();
        }
    })
    .catch(error => {
      callback(error);
      return null;
    });
}
