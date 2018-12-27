export const requestSchoolTypeDictionary = () => ({
  type: "REQUEST_SCHOOL_TYPE_DICTIONARY"
});

export const schoolTypeDicitonaryLoaded = schoolTypeList => ({
  type: "SCHOOL_TYPE_DICTIONARY_LOADED",
  schoolTypeList
});
