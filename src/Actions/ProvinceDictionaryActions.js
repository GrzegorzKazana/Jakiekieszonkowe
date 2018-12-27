export const requestProvinceDictionary = () => ({
  type: "REQUEST_PROVINCE_DICTIONARY"
});

export const provinceDictionaryLoaded = provincesList => ({
  type: "PROVINCE_DICTIONARY_LOADED",
  provincesList
});
