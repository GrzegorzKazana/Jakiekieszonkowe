/**
 * REQUEST:
 * {
 *    provinceId: int,
 *    cityId: int
 * }
 * (if pId and cId is -1, it means country comments,
 * else if only cId is -1, it means province comments,
 * else city comments)
 * (dunno if -1 is better, or null)
 *
 * RESPONSE:
 * {
 *    success: boolean,
 *    message: string (empty, or error message)
 *    list: [
 *      {
 *        id: int,
 *        author: string,
 *        content: string,
 *        upvotes: int,
 *        liked: boolean (true if logged in user has liked the comment)
 *      }
 *    ]
 * }
 */
// const baseUrl = "http://localhost:8080/";
// const esc = encodeURIComponent;
// const stringifyRequest = (url, params) =>
//   `${url}?${Object.keys(params)
//     .map(k => esc(k) + "=" + esc(params[k]))
//     .join("&")}`;

export const getComments = (provinceId, cityId) =>
  new Promise((resolve, reject) =>
    fetch(
      "http://localhost:8080/api/comments/GetCommentsByProvinceAndCity?id_province=53&id_city=2"
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

/**
 * REQUEST:
 * {
 *    provinceId: int,
 *    cityId: int,
 *    comment: string
 * }
 * (again, pId and cId may be -1)
 *
 * RESPONSE:
 * just like getComments
 */
export const addComment = (provId, cityId, comment) =>
  new Promise((resolve, reject) =>
    fetch(
      "http://localhost:8080/api/comments/AddComment?provinceId=1&cityId=1&userId=1"
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

/**
 * REQUEST:
 * {
 *    commentId: int,
 *    liked: boolean
 * }
 *
 * RESPONSE:
 * just like getComments
 */
export const toggleCommentUpvote = (commentId, liked) =>
  new Promise((resolve, reject) =>
    fetch(
      "http://localhost:8080/api/comments/AddComment?provinceId=1&cityId=1&userId=1"
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );
