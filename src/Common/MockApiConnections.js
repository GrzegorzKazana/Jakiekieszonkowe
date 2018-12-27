const API_DELAY = 50;

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
      (email === "user" && pass === "user") ||
      (email === "admin" && pass === "admin")
        ? resolve({
            success: true,
            message: "Autoryzacja zakończona sukcesem",
            userData: {
              isAdmin: email === "admin" && pass === "admin",
              email: email,
              password: pass,
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

export const getProvinceDictionary = () =>
  new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve([
        { id: 0, name: "Śląskie" },
        { id: 1, name: "Mazowieckie" },
        { id: 2, name: "Małopolskie" }
      ]);
    }, API_DELAY)
  );

export const getCityDictionary = () =>
  new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve([
        { id: 0, provinceId: 0, name: "Gliwice" },
        { id: 1, provinceId: 0, name: "Katowice" },
        { id: 2, provinceId: 0, name: "Zabrze" },
        { id: 3, provinceId: 1, name: "Warszawa" },
        { id: 4, provinceId: 1, name: "Radom" },
        { id: 6, provinceId: 2, name: "Kraków" },
        { id: 7, provinceId: 2, name: "Tarnów" },
        { id: 8, provinceId: 2, name: "Nowy Sącz" }
      ]);
    }, API_DELAY)
  );

export const getPaymentPeriodDictionary = () =>
  new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve([
        { id: 0, days: 7, name: "tydzień" },
        { id: 1, days: 14, name: "dwa tygodnie" },
        { id: 2, days: 30, name: "miesiąc" }
      ]);
    }, API_DELAY)
  );

export const getSchoolTypeDictionary = () =>
  new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve([
        { id: 0, name: "Szkoła podstawowa" },
        { id: 1, name: "Gimnazjum" },
        { id: 2, name: "Studia" }
      ]);
    }, API_DELAY)
  );

export const getMoneyIncludes = () =>
  new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve([
        { id: 0, name: "Zawiera opłatę czynszu" },
        { id: 1, name: "Zawiera wyżywienie" },
        { id: 2, name: "Zawiera rachunek telefoniczny" },
        { id: 3, name: "Zawiera transport komunikacją miejską" }
      ]);
    }, API_DELAY)
  );

let comments = [
  {
    id: 0,
    author: "USER1",
    content:
      "Nunc eu erat non metus semper tristique. Nullam eleifend eros eget malesuada tempor. Suspendisse potenti. In scelerisque malesuada porta.",
    upvotes: 0,
    liked: false
  },
  {
    id: 1,
    author: "USER2",
    content:
      "Nunc pretium mollis velit non aliquet. Etiam sapien augue, molestie a purus vitae, viverra mattis odio.",
    upvotes: 3,
    liked: true
  }
];
export const getComments = (provId, cityId) =>
  new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve(comments);
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

export const changePassword = newPassword => {
  console.log(newPassword);
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

export const addComment = (provId, cityId, comment) => {
  const nextId =
    comments.reduce((prev, curr) => (prev.id > curr.id ? prev : curr)).id + 1;
  comments = comments.concat({
    ...comment,
    id: nextId,
    author: "user",
    upvotes: 0,
    liked: false
  });
  console.log(comments);
};

export const toggleCommentUpvote = (commentId, liked) => {
  comments = comments.map(c =>
    c.id !== commentId
      ? c
      : { ...c, liked, upvotes: c.upvotes + (liked ? 1 : -1) }
  );
};

export const dictionaryChange = data => {
  console.log(data);
};

export const getCountryBasicStats = () =>
  new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve({
        countryData: {
          id: 0,
          name: "Polska",
          avg: 243.14973649546104,
          std: 65.67327514784398,
          count: 3574
        }
      });
    }, API_DELAY)
  );

export const getProvinceBasicStats = () =>
  new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve({
        // countryData: {
        //   id: 0,
        //   name: "Polska",
        //   avg: 243.14973649546104,
        //   std: 65.67327514784398,
        //   count: 3574
        // },
        provinceData: {
          list: [
            {
              id: 0,
              name: "Dolnośląskie",
              avg: 186.14973649546104,
              std: 40.67327514784398,
              count: 783
            },
            {
              id: 1,
              name: "Kujawsko-Pomorskie",
              avg: 101.12745257227019,
              std: 75.38135525521244,
              count: 359
            },
            {
              id: 2,
              name: "Łódzkie",
              avg: 152.0273750794465,
              std: 43.27444273025643,
              count: 447
            },
            {
              id: 3,
              name: "Lubelskie",
              avg: 281.25844357217704,
              std: 50.297650021595054,
              count: 930
            },
            {
              id: 4,
              name: "Lubuskie",
              avg: 157.664908,
              std: 11.910626,
              count: 516
            },
            {
              id: 5,
              name: "Małopolskie",
              avg: 184.43397972161978,
              std: 43.591963885696735,
              count: 320
            },
            {
              id: 6,
              name: "Mazowieckie",
              avg: 141.50848175,
              std: 47.7140435,
              count: 912
            },
            {
              id: 7,
              name: "Opolskie",
              avg: 268.563875822553,
              std: 65.47723773659678,
              count: 449
            },
            {
              id: 8,
              name: "Podkarpackie",
              avg: 269.5056097720344,
              std: 21.294408454778868,
              count: 346
            },
            {
              id: 9,
              name: "Podlaskie",
              avg: 212.14321687650403,
              std: 13.013074437140624,
              count: 473
            },
            {
              id: 10,
              name: "Pomorskie",
              avg: 236.61333,
              std: 47.835181415,
              count: 463
            },
            {
              id: 11,
              name: "Śląskie",
              avg: 180.16,
              std: 30.3004763196,
              count: 503
            },
            {
              id: 12,
              name: "Świętokrzyskie",
              avg: 135.934,
              std: 43.60494,
              count: 401
            },
            {
              id: 13,
              name: "Warmińsko-Mazurskie",
              avg: 236.91,
              std: 9.0383,
              count: 347
            },
            {
              id: 14,
              name: "Wielkopolskie",
              avg: 188.89568818822295,
              std: 10.36024185645602,
              count: 367
            },
            {
              id: 15,
              name: "Zachodniopomorskie",
              avg: 295.6597146109716,
              std: 15.07748454102822,
              count: 806
            }
          ]
        }
      });
    }, API_DELAY)
  );

export const getCityBasicStats = provId =>
  new Promise((resolve, reject) =>
    setTimeout(function() {
      let data = { cityData: [] };
      switch (provId) {
        case 11:
          data = {
            cityData: {
              list: [
                {
                  id: 0,
                  provinceId: 11,
                  name: "Gliwice",
                  avg: 146.14973649546104,
                  std: 20.67327514784398,
                  count: 14,
                  position: [50.3, 18.66]
                },
                {
                  id: 1,
                  provinceId: 11,
                  name: "Katowice",
                  avg: 187.2104,
                  std: 25.67327514784398,
                  count: 34,
                  position: [50.25, 19.0]
                },
                {
                  id: 2,
                  provinceId: 11,
                  name: "Zabrze",
                  avg: 111.11,
                  std: 45.67327514784398,
                  count: 12,
                  position: [50.3, 18.78]
                }
              ]
            }
          };
          break;
        case 6:
          data = {
            cityData: {
              list: [
                {
                  id: 3,
                  provinceId: 6,
                  name: "Warszawa",
                  avg: 354.1449546104,
                  std: 85.327584398,
                  count: 32,
                  position: [52.02, 21.03]
                },
                {
                  id: 4,
                  provinceId: 6,
                  name: "Radom",
                  avg: 113.2104,
                  std: 27.514784398,
                  count: 20,
                  position: [51.4, 21.16]
                }
              ]
            }
          };
          break;
        case 5:
          data = {
            cityData: {
              list: [
                {
                  id: 6,
                  provinceId: 5,
                  name: "Kraków",
                  avg: 212.04,
                  std: 40.327514784398,
                  count: 27,
                  position: [50.04, 19.95]
                },
                {
                  id: 7,
                  provinceId: 5,
                  name: "Tarnów",
                  avg: 137.2104,
                  std: 75.67514784398,
                  count: 20,
                  position: [50.03, 21.0]
                },
                {
                  id: 8,
                  provinceId: 5,
                  name: "Nowy Sącz",
                  avg: 109.41711,
                  std: 42.784398,
                  count: 17,
                  position: [49.61, 20.7]
                }
              ]
            }
          };
          break;
      }
      resolve(data);
    }, API_DELAY)
  );
