export const requestCityDictionary = () => ({
  type: "REQUEST_CITY_DICTIONARY"
});

export const provinceCityLoaded = cityList => ({
  type: "CITY_DICTIONARY_LOADED",
  cityList
});
