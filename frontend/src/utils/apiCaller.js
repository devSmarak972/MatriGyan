export function getCookie(c_name = "") {
  let csrftoken = "";
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      csrftoken = unescape(document.cookie.substring(c_start, c_end));
    }
  } else {
    let inputEl = document.querySelector('input[name="csrfmiddlewaretoken"]');
    csrftoken = inputEl ? inputEl.value : "";
  }
  return csrftoken;
}

export async function fetchByForm(url, method = "POST", body, headers = {}) {
  let reqOptions = {
    method: method.toUpperCase(),
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
      ...headers,
    },
  };

  let formData = new FormData();
  if (body) {
    Object.keys(body).forEach((key) => {
      if (typeof body[key] !== "string") {
        formData.append(key, JSON.stringify(body[key]));
      } else {
        formData.append(key, body[key]);
      }
    });
    reqOptions["body"] = formData;
  }
  // todo error dispay logic here
  const request = new Request(url, reqOptions);
  return await fetch(request);
}

export async function fetchByJSON(url, method = "POST", body, headers = {}) {
  let reqOptions = {
    method: method.toUpperCase(),
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
      ...headers,
    },
  };

  if (body) {
    reqOptions["body"] = JSON.stringify(body);
  }
  const request = new Request(url, reqOptions);
  return await fetch(request);
}

export async function fetchByUnalteredForm(
  url,
  method = "POST",
  body,
  headers = {}
) {
  let reqOptions = {
    method: method.toUpperCase(),
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
      ...headers,
    },
  };

  let formData = new FormData();
  if (body) {
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });
    reqOptions["body"] = formData;
  }
  // todo error dispay logic here
  const request = new Request(url, reqOptions);
  return await fetch(request);
}
