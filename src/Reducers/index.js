import { combineReducers } from "redux";

import UserInfoReducer from "./UserInfoReducer";
import InfoSnackbarReducer from "./InfoSnackbarReducer";
import ProvinceDicitonaryReducer from "./ProvinceDictionaryReducer";
import CityDictionaryReducer from "./CityDictionaryReducer";
import PaymentPeriodDictionaryReducer from "./PaymentPeriodDictionaryReducer";
import SchoolTypeDicitonaryReducer from "./SchoolTypeDictionaryReducer";
import MoneyIncludesReducer from "./MoneyIncludesReducer";

export default combineReducers({
  userInfo: UserInfoReducer,
  infoSnackbar: InfoSnackbarReducer,
  provinceDictionary: ProvinceDicitonaryReducer,
  cityDictionary: CityDictionaryReducer,
  paymentPeriodDictionary: PaymentPeriodDictionaryReducer,
  schoolTypeDictionary: SchoolTypeDicitonaryReducer,
  moneyIncludesDictionary: MoneyIncludesReducer
});
