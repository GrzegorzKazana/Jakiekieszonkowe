import React from "react";
import Page from "../../Common/Page";
import KidsEntry from "./KidsEntry";
import KidsSummaryEntry from "./KidsSummaryEntry";
import { connect } from "react-redux";
import { displaySnackbarMessage } from "../../../Actions/InfoSnackbarActions";
import {
  updateKidList,
  requestUpdateKidList,
  updateKidListFailed
} from "../../../Actions/UserInfoActions";
import {
  addKid as addKidNotifyApi,
  editKid as editKidNotifyApi,
  deleteKid as deleteKidNotifyApi
} from "../../../Common/MockApiConnections/UserApi";
import {
  addKid as addKidNotifyRealApi,
  editKid as editKidNotifyRealApi,
  deleteKid as deleteKidNotifyRealApi
} from "../../../Common/RealApiConnections/UserApi";

const mapStateToProps = state => ({
  ...state.userInfo,
  ...state.moneyIncludesDictionary,
  ...state.schoolTypeDictionary,
  ...state.paymentPeriodDictionary
});
class KidsPage extends React.Component {
  handleAddKid = kid => {
    // this.props.dispatch(addKid(kid));
    this.props.dispatch(requestUpdateKidList());
    // addKidNotifyApi(kid, this.props.token)
    addKidNotifyRealApi(kid, this.props.token)
      .then(response => this.props.dispatch(updateKidList(response.list)))
      .catch(err => {
        this.props.dispatch(
          displaySnackbarMessage(err.message || "Operacja nie powiodła się")
        );
        this.props.dispatch(updateKidListFailed());
      });
  };

  handleDeleteKid = kidIdx => {
    // this.props.dispatch(deleteKid(kidIdx));
    this.props.dispatch(requestUpdateKidList());
    // deleteKidNotifyApi(kidIdx, this.props.token)
    deleteKidNotifyRealApi(kidIdx, this.props.token)
      .then(response => this.props.dispatch(updateKidList(response.list)))
      .catch(err => {
        this.props.dispatch(
          displaySnackbarMessage(err.message || "Operacja nie powiodła się")
        );
        this.props.dispatch(updateKidListFailed());
      });
  };

  handleEditKid = (kid, kidIdx) => {
    // this.props.dispatch(editKid(kid, kidIdx));
    this.props.dispatch(requestUpdateKidList());
    // editKidNotifyApi(kid, kidIdx, this.props.token)
    editKidNotifyRealApi(kid, kidIdx, this.props.token)
      .then(response => this.props.dispatch(updateKidList(response.list)))
      .catch(err => {
        this.props.dispatch(
          displaySnackbarMessage(err.message || "Operacja nie powiodła się")
        );
        this.props.dispatch(updateKidListFailed());
      });
  };

  render() {
    return (
      <Page style={this.props.style}>
        <KidsEntry
          numberOfKids={this.props.userKids.length}
          firstKidDate={
            this.props.userKids.reduce((prev, curr) => {
              return prev.paymentDate < curr.paymentDate ? prev : curr;
            }, new Date()).paymentDate
          }
        />
        <KidsSummaryEntry
          onAddKid={this.handleAddKid}
          onDeleteKid={this.handleDeleteKid}
          onEditKid={this.handleEditKid}
          userKids={this.props.userKids}
          loading={this.props.userKidsFetching}
          moneyIncludes={this.props.moneyIncludes}
          paymentPeriods={this.props.paymentPeriod}
          schoolTypes={this.props.schoolType}
        />
      </Page>
    );
  }
}
export default connect(mapStateToProps)(KidsPage);
