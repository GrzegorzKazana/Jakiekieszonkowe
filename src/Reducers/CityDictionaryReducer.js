const defaultState = {
  cities: [],
  citiesFetching: false,
  citiesLoaded: false
};

const DictionariesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "REQUEST_CITY_DICTIONARY":
      return {
        ...state,
        citiesFetching: true,
        citiesLoaded: false
      };
    case "CITY_DICTIONARY_LOADED":
      return {
        ...state,
        citiesFetching: false,
        citiesLoaded: true,
        cities: action.cityList
      };
    default:
      return state;
  }
};
export default DictionariesReducer;
