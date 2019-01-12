import { stringifyRequest, baseUrl } from "./Helpers";
/**
 * REQUEST:
 * {
 *    userFilters: boolean,
 *    filters: {
 *      ageRangeValue: {min: int, max: int},
 *      moneyIncludes: [int, int, ...],
 *      schoolTypeId: int (-1 when not filtering, single schoolTypeId otherwise)
 *    }
 * }
 *
 * RESPONSE (id is questionable, since its Poland only service):
 * {
 *    success: boolean,
 *    message: string (empty, or error message)
 *    countryData: {
 *      id: int,
 *      name: string,
 *      avg: float,
 *      std: float,
 *      count: int
 *    }
 * }
 */
const getCountryBasicStatsEndpoint = "api/mapstats/GetCountryStats";
export const getCountryBasicStats = (useParams, params) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, getCountryBasicStatsEndpoint, {
        useFilters: useParams,
        ageRangeMin: params.ageRangeValue.min,
        ageRangeMax: params.ageRangeValue.max,
        moneyIncludes: params.moneyIncludes,
        schoolTypeId: params.schoolTypeId,
        filterByMoneyIncludes: params.filterByMoneyIncludes
      })
    )
      .then(res => res.json())
      .then(json => (json.success ? resolve(json) : reject(json)))
      .catch(err => reject(err))
  );

/**
 * REQUEST:
 * {
 *    userFilters: boolean,
 *    filters: {
 *      ageRangeValue: {min: int, max: int},
 *      moneyIncludes: [int, int, ...],
 *      schoolTypeId: int (-1 when not filtering, single schoolTypeId otherwise)
 *    }
 * }
 *
 * RESPONSE (id is questionable, since its Poland only service):
 * {
 *    success: boolean,
 *    message: string (empty, or error message)
 *    provinceData: [{
 *      id: int,
 *      name: string,
 *      avg: float,
 *      std: float,
 *      count: int
 *    }, {...}, {...}, ...
 *    ]
 * }
 */
const getProvinceBasicStatsEndpoint = "api/mapstats/GetProvinceStats";
export const getProvinceBasicStats = (useParams, params) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, getProvinceBasicStatsEndpoint, {
        useFilters: useParams,
        ageRangeMin: params.ageRangeValue.min,
        ageRangeMax: params.ageRangeValue.max,
        moneyIncludes: params.moneyIncludes,
        schoolTypeId: params.schoolTypeId,
        filterByMoneyIncludes: params.filterByMoneyIncludes
      })
    )
      .then(res => res.json())
      .then(json =>
        json.success
          ? resolve({ ...json, provinceData: { list: json.provinceData } })
          : reject(json)
      )
      .catch(err => reject(err))
  );

/**
 * REQUEST:
 * {
 *    provinceId: int,
 *    userFilters: boolean,
 *    filters: {
 *      ageRangeValue: {min: int, max: int},
 *      moneyIncludes: [int, int, ...],
 *      schoolTypeId: int (-1 when not filtering, single schoolTypeId otherwise)
 *    }
 * }
 *
 * RESPONSE (id is questionable, since its Poland only service):
 * {
 *    success: boolean,
 *    message: string (empty, or error message)
 *    cityData: [{
 *      id: int,
 *      provinceId: int,
 *      name: string,
 *      avg: float,
 *      std: float,
 *      count: int,
 *      position: [float, float] (lattitude and logitude)
 *    }, {...}, {...}, ...
 *    ]
 * }
 */
const getCityBasicStatsEndpoint = "api/mapstats/GetCityStats";
export const getCityBasicStats = (provId, useParams, params) =>
  new Promise((resolve, reject) =>
    fetch(
      stringifyRequest(baseUrl, getCityBasicStatsEndpoint, {
        provinceId: provId,
        useFilters: useParams,
        ageRangeMin: params.ageRangeValue.min,
        ageRangeMax: params.ageRangeValue.max,
        moneyIncludes: params.moneyIncludes,
        schoolTypeId: params.schoolTypeId,
        filterByMoneyIncludes: params.filterByMoneyIncludes
      })
    )
      .then(res => res.json())
      .then(json =>
        json.success
          ? resolve({ ...json, cityData: { list: json.cityData } })
          : reject(json)
      )
      .catch(err => reject(err))
  );
