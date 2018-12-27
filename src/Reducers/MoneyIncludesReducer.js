const defaultState = {
  moneyIncludes: [],
  moneyIncludesFetching: false,
  moneyIncludesLoaded: false
};

const MoneyIncludesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "MONEY_INCUDES_DICTIONARY_FETCHING":
      return {
        ...state,
        moneyIncludesFetching: true,
        moneyIncludesLoaded: false
      };
    case "MONEY_INCUDES_DICTIONARY_LOADED":
      return {
        ...state,
        moneyIncludesFetching: false,
        moneyIncludesLoaded: true,
        moneyIncludes: action.moneyIncludes
      };
    default:
      return state;
  }
};
export default MoneyIncludesReducer;
