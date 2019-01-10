import { stringifyRequest, baseUrl, excludeKeyFromObject } from "./Helpers";
/**
 * REQUEST:
 * {
 *    email: string,
 *    password: string
 * }
 *
 * RESPONSE (if admin, isValidated and isAdmin is required only):
 * {
 *    success: boolean,
 *    message: string (empty, or error message)
 *    isValidated: boolean
 *    isAdmin: boolean,
 *    userData: {
 *      email: string,
 *      accountActivationDate: "YYYY-MM-DD",
 *      accountLastLogInDate: "YYY-MM-DD",
 *      country: string,
 *      provinceId: int,
 *      cityId: int,
 *      province: string,
 *      city: string
 *    },
 *    userKids: [{
 *      id: int,
 *      name: string,
 *      age: int,
 *      schoolTypeId: int,
 *      quota: int,
 *      paymentPeriodId: int,
 *      paymentDate: "YYYY-MM-DD",
 *      prevPaymentDate: "YYYY-MM-DD",
 *      nextPaymentDate: "YYYY-MM-DD",
 *      provinceId: int,
 *      cityId: int,
 *      moneyIncludes: [int, int, ...]
 *      }, {...}, {...}, ...
 *    ],
 *    userNotifications: [{
 *      id: int,
 *      kidId: int,
 *      notificationOverlap: int
 *      }, {...}, {...}, ...
 *    ],
 *    userMetaNotification: boolean
 * }
 */
const validateUserEndpoint = "api/user/ValidateUser";
export const validateUserApiCall = (email, password) =>
  new Promise((resolve, reject) =>
    fetch(stringifyRequest(baseUrl, validateUserEndpoint, { email, password }))
      .then(res => res.json())
      .then(json =>
        json.success && json.isValidated ? resolve(json) : reject(json)
      )
      .catch(err => reject(err))
  );

/**
 * REQUEST:
 * {
 *    email: string,
 *    password: string,
 *    provinceId: int,
 *    city: int
 * }
 *
 * RESPONSE:
 * {
 *    success: boolean,
 *    message: string (empty or error messsage)
 * }
 */
const registerUserEndpoint = "api/user/RegisterUser";
export const registerUser = user =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, registerUserEndpoint, {
        email: user.email,
        password: user.password,
        cityId: user.cityId
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

/**
 * REQUEST:
 * {
 *    age: int
 *    name: string,
 *    quota: int,
 *    cityId: int,
 *    provinceId: int,
 *    moneyIncludes: [int, int, ...],
 *    paymentDate: "YYYY-MM-DD",
 *    paymentPeriodId: int,
 *    schoolTypeId: int
 * }
 *
 * RESPONSE:
 * {
 *    success: boolean,
 *    message: string (empty or error message)
 *    kids: [{
 *      id: int,
 *      name: string,
 *      age: int,
 *      schoolTypeId: int,
 *      quota: int,
 *      paymentPeriodId: int,
 *      paymentDate: "YYYY-MM-DD",
 *      prevPaymentDate: "YYYY-MM-DD",
 *      nextPaymentDate: "YYYY-MM-DD",
 *      provinceId: int,
 *      cityId: int,
 *      moneyIncludes: [int, int, ...]
 *      }, {...}, {...}, ...
 *    ]
 * }
 */
const addKidEndpoint = "api/user/AddChild";
export const addKid = (kid, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, addKidEndpoint, {
        ...excludeKeyFromObject(kid, "provinceId"),
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
 *    id: int
 *    age: int
 *    name: string,
 *    quota: int,
 *    cityId: int,
 *    provinceId: int,
 *    moneyIncludes: [int, int, ...],
 *    paymentDate: "YYYY-MM-DD",
 *    paymentPeriodId: int,
 *    schoolTypeId: int
 * }
 *
 * RESPONSE:
 * just like addKid
 */
const editKidEndpoint = "api/user/EditChild";
export const editKid = (kid, kidIdx, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, editKidEndpoint, {
        childId: kidIdx,
        ...excludeKeyFromObject(kid, "provinceId"),
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
 *    id: int
 * }
 *
 * RESPONSE:
 * just like addKid
 */
const deleteKidEndpoint = "api/user/DeleteChild";
export const deleteKid = (kidIdx, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, deleteKidEndpoint, { childId: kidIdx, token })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

/**
 * REQUEST:
 * {
 *    newPassword: string
 * }
 *
 * RESPONSE:
 * {
 *    success: boolean,
 *    message: string (empty or error message)
 * }
 */
const changePasswordEndpoint = "api/user/ChangePassword";
export const changePassword = (oldPassword, newPassword, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, changePasswordEndpoint, { newPassword, token })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

/**
 * REQUEST (province and city is only needed for mockup, to be removed):
 * {
 *    cityId: int,
 *    city: string,
 *    provinceId: int,
 *    province: string
 * }
 *
 * RESPONSE:
 * {
 *    success: boolean,
 *    message: string (empty, or error message)
 *    email: string,
 *    accountActivationDate: "YYYY-MM-DD",
 *    accountLastLogInDate: "YYYY-MM-DD",
 *    country: string,
 *    provinceId: int,
 *    cityId: int,
 *    province: string,
 *    city: string
 * }
 */
const changeUserDataEndpoint = "api/user/ChangeUserData";
export const changeUserData = (data, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, changeUserDataEndpoint, {
        cityId: data.cityId,
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
 *    kidId: int,
 *    notificationOverLap: int
 * }
 *
 * RESPONSE:
 * {
 *    success: boolean,
 *    message: string (empty, or error message)
 *    list: [{
 *      id: int,
 *      kidId: int,
 *      notificationOverlap: int
 *      }, {...}, {...}, ...
 *    ]
 * }
 */
const addNotificationEndpoint = "api/user/AddNotification";
export const addNotification = (data, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, addNotificationEndpoint, {
        childId: data.kidId,
        notificationOverLap: data.notificationOverLap,
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
 *    notificationId: int
 * }
 *
 * RESPONSE:
 * same as addNotification
 */
const deleteNotificationEndpoint = "api/user/DeleteNotification";
export const deleteNotification = (notificationId, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, deleteNotificationEndpoint, {
        notificationId,
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
 *    isSubscribed: boolean
 * }
 *
 * RESPONSE:
 * {
 *    success: boolean,
 *    message: string (empty or error message)
 *    userMetaNotification: boolean,
 * }
 */
const changeMetaNotificationEndpoint = "api/user/ChangeMetaNotification";
export const changeMetaNotification = (isSubscribed, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, changeMetaNotificationEndpoint, {
        isSubscribed,
        token
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

const logOutEndpoint = "api/user/LogOut";
export const logOutUser = token =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, logOutEndpoint, {
        token
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

const forgotPasswordEndpoint = "api/user/ResetPassword";
export const forgotPassword = email =>
  new Promise((resolve, reject) =>
    fetch(stringifyRequest(baseUrl, forgotPasswordEndpoint, { email }))
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );
