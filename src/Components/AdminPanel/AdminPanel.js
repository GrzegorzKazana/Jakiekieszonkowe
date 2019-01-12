import React from "react";
import NavBarAdmin from "./NavBarAdmin";
import AdminPanelDrawer from "./AdminPanelDrawer";
import DictionaryPage from "./DictionaryPage";
import { connect } from "react-redux";
import { logOut } from "../../Actions/UserInfoActions";
import { logOutUser } from "../../Common/MockApiConnections/UserApi";
import { logOutUser as logOutUserRealApi } from "../../Common/RealApiConnections/UserApi";
import {
  addProvince,
  editProvince,
  deleteProvince,
  addCity,
  editCity,
  deleteCity,
  addSchoolType,
  editSchoolType,
  deleteSchoolType,
  addMoneyInclude,
  editMoneyInclude,
  deleteMoneyInclude,
  addPaymentPeriod,
  editPaymentPeriod,
  deletePaymentPeriod
} from "../../Common/RealApiConnections/AdminApi";
import {
  requestProvinceDictionary,
  provinceDictionaryLoaded
} from "../../Actions/ProvinceDictionaryActions";
import {
  requestCityDictionary,
  provinceCityLoaded
} from "../../Actions/CityDictionaryActions";
import {
  requestSchoolTypeDictionary,
  schoolTypeDicitonaryLoaded
} from "../../Actions/SchoolTypeDictionaryActions";
import {
  requestPaymentPeriodDictionary,
  paymentPeriodDictionaryLoaded
} from "../../Actions/PaymentPeriodDictionaryActions";
import {
  requestMoneyIncludesList,
  moneyIncludesLoaded
} from "../../Actions/MoneyIncludesActions";
import { displaySnackbarMessage } from "../../Actions/InfoSnackbarActions";

const mapStateToProps = state => ({
  ...state.userInfo,
  ...state.cityDictionary,
  ...state.provinceDictionary,
  ...state.paymentPeriodDictionary,
  ...state.schoolTypeDictionary,
  ...state.moneyIncludesDictionary
});
class AdminPanel extends React.Component {
  state = {
    selectedPageContent: 0
  };

  handleLogOut = () => {
    this.props.dispatch(logOut());
    // logOutUser(this.props.token);
    logOutUserRealApi(this.props.token);
  };

  handlePageChange = selectedPageContent => {
    this.setState({ selectedPageContent });
  };

  render() {
    const drawerWidth = "256px";
    const responseHandler = (actionFetch, actionFullfill) => prom => {
      // this.props.dispatch(actionFetch());
      prom
        .then(data => this.props.dispatch(actionFullfill(data.list)))
        .catch(err => {
          console.log(err);
          this.props.dispatch(
            displaySnackbarMessage(err.message || "Nastąpił błąd")
          );
        });
    };

    const dictionaries = [
      {
        name: "Miasta",
        page: 0,
        content: this.props.cities,
        loaded: this.props.citiesLoaded,
        handleAdd: addCity,
        handleEdit: editCity,
        handleDelete: deleteCity,
        responseFetchAction: requestCityDictionary,
        responseFullfillAction: provinceCityLoaded
      },
      {
        name: "Województwa",
        page: 1,
        content: this.props.provinces,
        loaded: this.props.provincesLoaded,
        handleAdd: addProvince,
        handleEdit: editProvince,
        handleDelete: deleteProvince,
        responseFetchAction: requestProvinceDictionary,
        responseFullfillAction: provinceDictionaryLoaded
      },
      {
        name: "Rodzaje szkół",
        page: 2,
        content: this.props.schoolType,
        loaded: this.props.schoolTypeLoaded,
        handleAdd: addSchoolType,
        handleEdit: editSchoolType,
        handleDelete: deleteSchoolType,
        responseFetchAction: requestSchoolTypeDictionary,
        responseFullfillAction: schoolTypeDicitonaryLoaded
      },
      {
        name: "Bonusy kieszonkowego",
        page: 3,
        content: this.props.moneyIncludes,
        loaded: this.props.moneyIncludesLoaded,
        handleAdd: addMoneyInclude,
        handleEdit: editMoneyInclude,
        handleDelete: deleteMoneyInclude,
        responseFetchAction: requestMoneyIncludesList,
        responseFullfillAction: moneyIncludesLoaded
      },
      {
        name: "Okresy wypłat",
        page: 4,
        content: this.props.paymentPeriod,
        loaded: this.props.paymentPeriodLoaded,
        handleAdd: addPaymentPeriod,
        handleEdit: editPaymentPeriod,
        handleDelete: deletePaymentPeriod,
        responseFetchAction: requestPaymentPeriodDictionary,
        responseFullfillAction: paymentPeriodDictionaryLoaded
      }
    ];
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <NavBarAdmin onLogOut={this.handleLogOut} userEmail="admin" />
        <div
          style={{
            display: "flex",
            flex: "1",
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "flex-start"
          }}
        >
          <div
            style={{
              width: drawerWidth,
              height: "100%",
              overflow: "auto",
              overflowX: "hidden",
              padding: "0px 2px"
            }}
          >
            <AdminPanelDrawer
              dictionaries={dictionaries}
              onPageSelected={this.handlePageChange}
            />
          </div>
          <div style={{ height: "100%", flexGrow: "1" }}>
            {this.state.selectedPageContent < dictionaries.length &&
              dictionaries[this.state.selectedPageContent].loaded && (
                <DictionaryPage
                  token={this.props.token}
                  dictionary={
                    dictionaries[this.state.selectedPageContent].content
                  }
                  title={dictionaries[this.state.selectedPageContent].name}
                  onAdd={dictionaries[this.state.selectedPageContent].handleAdd}
                  onEdit={
                    dictionaries[this.state.selectedPageContent].handleEdit
                  }
                  onDelete={
                    dictionaries[this.state.selectedPageContent].handleDelete
                  }
                  promiseHandler={responseHandler(
                    dictionaries[this.state.selectedPageContent]
                      .responseFetchAction,
                    dictionaries[this.state.selectedPageContent]
                      .responseFullfillAction
                  )}
                />
              )}
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(AdminPanel);
