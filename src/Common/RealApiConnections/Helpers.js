export const baseUrl = "http://localhost:8080/";

const esc = encodeURIComponent;
export const stringifyRequest = (url, endpoint, params) =>
  `${url}${endpoint}?${Object.keys(params)
    .map(k =>
      esc(k) + "=" + Array.isArray(esc(params[k]))
        ? esc(params[k]).join(",")
        : esc(params[k])
    )
    .join("&")}`;
