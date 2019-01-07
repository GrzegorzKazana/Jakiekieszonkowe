import React from "react";
import ContentLoggedIn from "./Components/LoggedInContents/ContentLoggedIn";
import LogInPage from "./Components/NotLoggedInContents/LogInPage/LogInPage";
import DefaultSnackbar from "./Components/Common/DefaultSnackbar";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import {
  requestProvinceDictionary,
  provinceDictionaryLoaded
} from "./Actions/ProvinceDictionaryActions";
import {
  requestCityDictionary,
  provinceCityLoaded
} from "./Actions/CityDictionaryActions";
import {
  requestSchoolTypeDictionary,
  schoolTypeDicitonaryLoaded
} from "./Actions/SchoolTypeDictionaryActions";
import {
  requestPaymentPeriodDictionary,
  paymentPeriodDictionaryLoaded
} from "./Actions/PaymentPeriodDictionaryActions";
import { connect } from "react-redux";
import {
  getProvinceDictionary,
  getCityDictionary,
  getPaymentPeriodDictionary,
  getSchoolTypeDictionary,
  getMoneyIncludes
} from "./Common/MockApiConnections/DictionariesApi";
import {
  getProvinceDictionary as getProvinceDictionaryRealApi,
  getCityDictionary as getCityDictionaryRealApi,
  getPaymentPeriodDictionary as getPaymentPeriodDictionaryRealApi,
  getSchoolTypeDictionary as getSchoolTypeDictionaryRealApi,
  getMoneyIncludes as getMoneyIncludesRealApi
} from "./Common/RealApiConnections/DictionariesApi";
import {
  requestMoneyIncludesList,
  moneyIncludesLoaded
} from "./Actions/MoneyIncludesActions";
import { hideSnackbarMessage } from "./Actions/InfoSnackbarActions";
import {
  requestUserValidation,
  userValidated,
  requestUserValidationFailed
} from "./Actions/UserInfoActions";
import { validateUserApiCall } from "./Common/MockApiConnections/UserApi";
import { validateUserApiCall as validateUserApiCallRealApi } from "./Common/RealApiConnections/UserApi";

const mapStateToProps = state => ({
  ...state.userInfo,
  ...state.infoSnackbar
});
class App extends React.Component {
  componentDidMount = () => {
    this.loadProvinces();
    this.loadCities();
    this.loadSchoolTypes();
    this.loadPaymentPeriod();
    this.loadMoneyIncludes();
    // this.mockOnlyAutoLogIn("admin", "admin");
    // this.mockOnlyAutoLogIn("user", "user");
  };

  // mockup only, auto log in
  mockOnlyAutoLogIn = (email, pass) => {
    this.props.dispatch(requestUserValidation());
    validateUserApiCall(email, pass)
      .then(data =>
        this.props.dispatch(
          userValidated(
            data.userData,
            data.userKids,
            data.userNotifications,
            data.isAdmin,
            data.userMetaNotification,
            data.token
          )
        )
      )
      .catch(err => {
        this.props.dispatch(requestUserValidationFailed());
        console.log("failed to authorize in auto log in mode");
      });
  };

  loadProvinces = () => {
    this.props.dispatch(requestProvinceDictionary());
    // getProvinceDictionary()
    getProvinceDictionaryRealApi()
      .then(data =>
        this.props.dispatch(provinceDictionaryLoaded(data.provinceList))
      )
      .catch(e => console.log(e));
  };

  loadCities = () => {
    this.props.dispatch(requestCityDictionary());
    // getCityDictionary()
    getCityDictionaryRealApi()
      .then(data => this.props.dispatch(provinceCityLoaded(data.cityList)))
      .catch(e => console.log(e));
  };

  loadSchoolTypes = () => {
    this.props.dispatch(requestSchoolTypeDictionary());
    // getSchoolTypeDictionary()
    getSchoolTypeDictionaryRealApi()
      .then(data =>
        this.props.dispatch(schoolTypeDicitonaryLoaded(data.schoolTypeList))
      )
      .catch(e => console.log(e));
  };

  loadPaymentPeriod = () => {
    this.props.dispatch(requestPaymentPeriodDictionary());
    // getPaymentPeriodDictionary()
    getPaymentPeriodDictionaryRealApi()
      .then(data =>
        this.props.dispatch(
          paymentPeriodDictionaryLoaded(data.paymentPeriodList)
        )
      )
      .catch(e => console.log(e));
  };

  loadMoneyIncludes = () => {
    this.props.dispatch(requestMoneyIncludesList());
    // getMoneyIncludes()
    getMoneyIncludesRealApi()
      .then(data =>
        this.props.dispatch(moneyIncludesLoaded(data.moneyIncludeList))
      )
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div>
        {!this.props.userDataLoaded && <LogInPage />}
        {this.props.userDataLoaded &&
          (this.props.isAdmin ? <AdminPanel /> : <ContentLoggedIn />)}
        <DefaultSnackbar
          text={this.props.snackbarMessage}
          open={this.props.snackbarOpen}
          onClose={() => this.props.dispatch(hideSnackbarMessage())}
        />
      </div>
    );
  }
}
export default connect(mapStateToProps)(App);
