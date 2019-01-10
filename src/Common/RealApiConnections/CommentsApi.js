import { stringifyRequest, baseUrl } from "./Helpers";
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

const getCommentsEndpoint = "api/comments/GetComments";
export const getComments = (provinceId, cityId, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, getCommentsEndpoint, {
        provinceId: provinceId || -1,
        cityId: cityId || -1,
        token
      })
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
const addCommentEndpoint = "api/comments/AddComment";
export const addComment = (provinceId, cityId, content, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, addCommentEndpoint, {
        provinceId: provinceId || -1,
        cityId: cityId || -1,
        content,
        token
      })
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
const toggleCommentUpvoteEndpoint = "api/comments/ToggleCommentUpvote";
export const toggleCommentUpvote = (commentId, isLiked, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, toggleCommentUpvoteEndpoint, {
        commentId,
        isLiked,
        token
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );
