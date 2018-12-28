const API_DELAY = 1000;

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
