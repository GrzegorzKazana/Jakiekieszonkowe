const defaultState = {
  schoolType: [],
  schoolTypeFetching: false,
  schoolTypeLoaded: false
};

const SchoolTypeDictionaryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "REQUEST_SCHOOL_TYPE_DICTIONARY":
      return {
        ...state,
        schoolTypeFetching: true,
        schoolTypeLoaded: false
      };
    case "SCHOOL_TYPE_DICTIONARY_LOADED":
      return {
        ...state,
        schoolTypeFetching: false,
        schoolTypeLoaded: true,
        schoolType: action.schoolTypeList
      };
    default:
      return state;
  }
};
export default SchoolTypeDictionaryReducer;
