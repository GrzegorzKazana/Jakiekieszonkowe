import { Helpers } from "./Helpers";
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
    fetch(stringifyRequest(baseUrl, registerUserEndpoint, { email, password }))
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
export const addKid = kid =>
  new Promise((resolve, reject) =>
    fetch(stringifyRequest(baseUrl, addKidEndpoint, { email, password }))
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
export const editKid = (kid, kidIdx) => {
  console.log(kidIdx);
  console.log(kid);
  kid.prevPaymentDate = "--------";
  kid.nextPaymentDate = "--------";
  kid.id = kidIdx;
  kidList = kidList.map(k => (k.id === kidIdx ? kid : k));
  return new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve({ kids: kidList });
    }, API_DELAY)
  );
};

/**
 * REQUEST:
 * {
 *    id: int
 * }
 *
 * RESPONSE:
 * just like addKid
 */
export const deleteKid = kidIdx => {
  console.log(kidIdx);
  kidList = kidList.filter(k => k.id !== kidIdx);
  return new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve({ kids: kidList });
    }, API_DELAY)
  );
};

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
export const changePassword = (oldPassword, newPassword) => {
  console.log(oldPassword, newPassword);
  if (oldPassword === userPass) {
    userPass = newPassword;
    return new Promise((resolve, reject) =>
      setTimeout(function() {
        resolve({ success: true });
      }, API_DELAY)
    );
  } else {
    return new Promise((resolve, reject) =>
      setTimeout(function() {
        reject({ success: false, message: "Niepoprawne stare hasło" });
      }, API_DELAY)
    );
  }
};

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
export const changeUserData = data => {
  console.log(data);
  const oldUserData = userData(userEmail, userPass);
  userData = () => ({
    ...oldUserData,
    ...data
  });
  return new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve(userData(userEmail, userPass));
    }, API_DELAY)
  );
};

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
export const addNotification = data => {
  console.log(data);
  const newId =
    notificationList.reduce((prev, curr) => (prev.id > curr.id ? prev : curr), {
      id: 0
    }).id + 1;
  notificationList = notificationList.concat({ ...data, id: newId });
  return new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve({
        list: notificationList.map(n => ({ ...n, name: "jakies dziecko" }))
      });
    }, API_DELAY)
  );
};

/**
 * REQUEST:
 * {
 *    notificationId: int
 * }
 *
 * RESPONSE:
 * same as addNotification
 */
export const deleteNotification = notificationId => {
  console.log(notificationId);
  notificationList = notificationList.filter(n => n.id !== notificationId);
  return new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve({
        list: notificationList.map(n => ({ ...n, name: "jakies dziecko" }))
      });
    }, API_DELAY)
  );
};

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
export const changeMetaNotification = isSubscribed => {
  console.log("adding meta notification");
  const oldResponse = response(userEmail, userPass);
  response = () => ({
    ...oldResponse,
    userMetaNotification: isSubscribed
  });
  return new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve({
        success: true,
        userMetaNotification: isSubscribed
      });
    }, API_DELAY)
  );
};
