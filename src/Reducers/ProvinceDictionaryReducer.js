const defaultState = {
  provinces: [],
  provincesFetching: false,
  provincesLoaded: false
};

const DictionariesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "REQUEST_PROVINCE_DICTIONARY":
      return {
        ...state,
        provincesFetching: true,
        provincesLoaded: false
      };
    case "PROVINCE_DICTIONARY_LOADED":
      return {
        ...state,
        provincesFetching: false,
        provincesLoaded: true,
        provinces: action.provincesList
      };
    default:
      return state;
  }
};
export default DictionariesReducer;
