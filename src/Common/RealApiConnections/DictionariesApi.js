import { stringifyRequest, baseUrl } from "./Helpers";

const getProvinceDictionaryEndpoint = "api/dictionary/GetProvinceDictionary";
export const getProvinceDictionary = () =>
  new Promise((resolve, reject) =>
    fetch(stringifyRequest(baseUrl, getProvinceDictionaryEndpoint))
      .then(res => res.json())
      .then(json => resolve({ provinceList: json }))
      .catch(err => reject(err))
  );

const getCityDictionaryEndpoint = "api/dictionary/GetCityDictionary";
export const getCityDictionary = () =>
  new Promise((resolve, reject) =>
    fetch(stringifyRequest(baseUrl, getCityDictionaryEndpoint))
      .then(res => res.json())
      .then(json => resolve({ cityList: json }))
      .catch(err => reject(err))
  );

const getPaymentPeriodDictionaryEndpoint =
  "api/dictionary/GetPaymentPeriodDictionary";
export const getPaymentPeriodDictionary = () =>
  new Promise((resolve, reject) =>
    fetch(stringifyRequest(baseUrl, getPaymentPeriodDictionaryEndpoint))
      .then(res => res.json())
      .then(json => resolve({ paymentPeriodList: json }))
      .catch(err => reject(err))
  );

const getSchoolTypeDictionaryEndpoint =
  "api/dictionary/GetSchoolTypeDictionary";
export const getSchoolTypeDictionary = () =>
  new Promise((resolve, reject) =>
    fetch(stringifyRequest(baseUrl, getSchoolTypeDictionaryEndpoint))
      .then(res => res.json())
      .then(json => resolve({ schoolTypeList: json }))
      .catch(err => reject(err))
  );

const getMoneyIncludesEndpoint = "api/dictionary/GetMoneyIncludes";
export const getMoneyIncludes = () =>
  new Promise((resolve, reject) =>
    fetch(stringifyRequest(baseUrl, getMoneyIncludesEndpoint))
      .then(res => res.json())
      .then(json => resolve({ moneyIncludeList: json }))
      .catch(err => reject(err))
  );
