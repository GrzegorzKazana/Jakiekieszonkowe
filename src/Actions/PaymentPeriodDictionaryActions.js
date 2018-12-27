export const requestPaymentPeriodDictionary = () => ({
  type: "REQUEST_PAYMENT_PERIOD_DICTIONARY"
});

export const paymentPeriodDictionaryLoaded = ppdList => ({
  type: "PAYMENT_PERIOD_DICTIONARY_LOADED",
  ppdList
});
