export const baseUrl = "http://localhost:8080/";

const esc = encodeURIComponent;
export const stringifyRequest = (url, endpoint, params) =>
  `${url}${endpoint}${
    params
      ? "?" +
        Object.keys(params)
          .map(
            k =>
              esc(k) +
              "=" +
              // (Array.isArray(params[k]) ? esc(params[k].join(";")) : esc(params[k]))
              esc(params[k])
          )
          .join("&")
      : ""
  }`;

export const excludeKeyFromObject = (obj, excludedKey) =>
  Object.assign(
    {},
    ...Object.entries(obj)
      .filter(([key, val]) => key !== excludedKey)
      .map(([key, val]) => ({ [key]: val }))
  );
