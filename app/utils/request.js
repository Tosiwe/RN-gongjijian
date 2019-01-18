/* eslint-disable no-param-reassign */

export default function request(url, options) {
  options.body = JSON.stringify(options.body)

  options.headers = {
    "Content-Type": "application/json;charset=utf-8",
    ...options.headers
  }

  return fetch(url, options)
    .then(response => {
      if (response.status === 500) {
        console.log("error", response)
      } else {
        console.log("response------------", response.json())
        return response.json()
      }
    })
    .catch(
      error =>
        // callback(error);
        null
    )
}
