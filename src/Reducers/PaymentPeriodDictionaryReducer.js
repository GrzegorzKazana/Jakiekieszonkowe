const defaultState = {
  paymentPeriod: [],
  paymentPeriodFetching: false,
  paymentPeriodLoaded: false
};

const PaymentPeriodDictionaryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "REQUEST_PAYMENT_PERIOD_DICTIONARY":
      return {
        ...state,
        paymentPeriodFetching: true,
        paymentPeriodLoaded: false
      };
    case "PAYMENT_PERIOD_DICTIONARY_LOADED":
      return {
        ...state,
        paymentPeriodFetching: false,
        paymentPeriodLoaded: true,
        paymentPeriod: action.ppdList
      };
    default:
      return state;
  }
};
export default PaymentPeriodDictionaryReducer;
