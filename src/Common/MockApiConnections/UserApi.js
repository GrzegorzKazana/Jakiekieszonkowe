const API_DELAY = 50;

let userEmail = "user";
let userPass = "user";

let adminEmail = "admin";
let adminPass = "admin";

let kidList = [
  {
    id: 0,
    name: "Jan",
    age: 15,
    schoolTypeId: 1,
    quota: 10,
    paymentPeriodId: 0,
    paymentDate: "2018-01-01",
    prevPaymentDate: "2018-12-21",
    nextPaymentDate: "2019-01-28",
    provinceId: 0,
    cityId: 0,
    moneyIncludes: [0, 1]
  },
  {
    id: 1,
    name: "Ewa",
    age: 18,
    schoolTypeId: 2,
    quota: 300,
    paymentPeriodId: 2,
    paymentDate: "2018-09-25",
    prevPaymentDate: "2018-12-21",
    nextPaymentDate: "2019-01-28",
    provinceId: 1,
    cityId: 4,
    moneyIncludes: [2, 3]
  }
];

export const validateUserApiCall = (email, pass) =>
  new Promise((resolve, reject) =>
    setTimeout(function() {
      (email === userEmail && pass === userPass) ||
      (email === adminEmail && pass === adminPass)
        ? resolve({
            success: true,
            message: "Autoryzacja zakończona sukcesem",
            userData: {
              isAdmin: email === adminEmail && pass === adminPass,
              email: email,
              // password: pass,
              accountActivationDate: "2018-01-01",
              accountLastLogInDate: "2018-10-15",
              country: "Polska",
              provinceId: 0,
              cityId: 0,
              province: "Śląskie",
              city: "Gliwice",
              kids: kidList,
              metaNotification: false,
              notifications: []
            }
          })
        : reject({
            success: false,
            message: "Niepoprawne dane logowania"
          });
    }, API_DELAY)
  );

export const registerUser = user => {
  console.log(user);
};

export const addKid = kid => {
  kid.id =
    kidList.reduce((prev, curr) => (prev.id > curr.id ? prev : curr)).id + 1;
  kid.prevPaymentDate = "--------";
  kid.nextPaymentDate = "--------";
  console.log(kid);
  kidList = kidList.concat(kid);
  return new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve({ kids: kidList });
    }, API_DELAY)
  );
};

export const editKid = (kid, kidIdx) => {
  console.log(kidIdx);
  console.log(kid);
  kid.prevPaymentDate = "--------";
  kid.nextPaymentDate = "--------";
  kidList = kidList.map(k => (k.id === kidIdx ? kid : k));
  return new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve({ kids: kidList });
    }, API_DELAY)
  );
};

export const deleteKid = kidIdx => {
  console.log(kidIdx);
  kidList = kidList.filter(k => k.id !== kidIdx);
  return new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve({ kids: kidList });
    }, API_DELAY)
  );
};

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

export const changeUserData = data => {
  console.log(data);
};

export const addNotification = data => {
  console.log(data);
};

export const deleteNotification = data => {
  console.log(data);
};

export const addMetaNotification = () => {
  console.log("adding meta notification");
};

export const deleteMetaNotification = () => {
  console.log("removing meta notification");
};
