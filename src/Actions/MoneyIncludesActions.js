export const requestMoneyIncludesList = () => ({
  type: "MONEY_INCUDES_DICTIONARY_FETCHING"
});

export const moneyIncludesLoaded = moneyIncludes => ({
  type: "MONEY_INCUDES_DICTIONARY_LOADED",
  moneyIncludes
});
