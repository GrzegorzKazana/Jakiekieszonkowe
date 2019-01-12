import { stringifyRequest, baseUrl } from "./Helpers";

const addProvinceEndpoint = "api/admin/AddProvince";
export const addProvince = (data, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, addProvinceEndpoint, {
        provinceName: data.name,
        token
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

const editProvinceEndpoint = "api/admin/EditProvince";
export const editProvince = (data, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, editProvinceEndpoint, {
        provinceId: data.id,
        provinceName: data.name,
        token
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

const deleteProvinceEndpoint = "api/admin/DeleteProvince";
export const deleteProvince = (data, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, deleteProvinceEndpoint, {
        provinceId: data.id,
        token
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

const addCityEndpoint = "api/admin/AddCity";
export const addCity = (data, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, addCityEndpoint, {
        provinceId: data.provinceId,
        cityName: data.name,
        longitude: data.longitude,
        latitude: data.latitude,
        token
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

const editCityEndpoint = "api/admin/EditCity";
export const editCity = (data, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, editCityEndpoint, {
        provinceId: data.provinceId,
        cityName: data.name,
        cityId: data.id,
        longitude: data.longitude,
        latitude: data.latitude,
        token
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

const deleteCityEndpoint = "api/admin/DeleteCity";
export const deleteCity = (data, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, deleteCityEndpoint, {
        cityId: data.id,
        token
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

const addSchoolTypeEndpoint = "api/admin/AddSchoolType";
export const addSchoolType = (data, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, addSchoolTypeEndpoint, {
        schoolTypeName: data.name,
        token
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

const editSchoolTypeEndpoint = "api/admin/EditSchoolType";
export const editSchoolType = (data, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, editSchoolTypeEndpoint, {
        schoolTypeId: data.id,
        schoolTypeName: data.name,
        token
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

const deleteSchoolTypeEndpoint = "api/admin/DeleteSchoolType";
export const deleteSchoolType = (data, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, deleteSchoolTypeEndpoint, {
        schoolTypeId: data.id,
        token
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

const addMoneyIncludeEndpoint = "api/admin/AddMoneyIncludes";
export const addMoneyInclude = (data, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, addMoneyIncludeEndpoint, {
        moneyIncludesName: data.name,
        token
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

const editMoneyIncludeEndpoint = "api/admin/EditMoneyIncludes";
export const editMoneyInclude = (data, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, editMoneyIncludeEndpoint, {
        moneyIncludesId: data.id,
        moneyIncludesName: data.name,
        token
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

const deleteMoneyIncludeEndpoint = "api/admin/DeleteMoneyIncludes";
export const deleteMoneyInclude = (data, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, deleteMoneyIncludeEndpoint, {
        moneyIncludesId: data.id,
        token
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

const addPaymentPeriodEndpoint = "api/admin/AddPaymentPeriod";
export const addPaymentPeriod = (data, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, addPaymentPeriodEndpoint, {
        paymentPeriodName: data.name,
        days: data.days,
        token
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

const editPaymentPeriodEndpoint = "api/admin/EditPaymentPeriod";
export const editPaymentPeriod = (data, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, editPaymentPeriodEndpoint, {
        paymentPeriodId: data.id,
        paymentPeriodName: data.name,
        days: data.days,
        token
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

const deletePaymentPeriodEndpoint = "api/admin/DeletePaymentPeriod";
export const deletePaymentPeriod = (data, token) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, deletePaymentPeriodEndpoint, {
        paymentPeriodId: data.id,
        token
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );
