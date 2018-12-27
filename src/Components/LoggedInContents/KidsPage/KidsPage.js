import React from "react";
import Page from "../../Common/Page";
import KidsEntry from "./KidsEntry";
import KidsSummaryEntry from "./KidsSummaryEntry";
import { connect } from "react-redux";
import { displaySnackbarMessage } from "../../../Actions/InfoSnackbarActions";
import {
  addKid,
  editKid,
  deleteKid,
  updateKidList
} from "../../../Actions/UserInfoActions";
import {
  addKid as addKidNotifyApi,
  editKid as editKidNotifyApi,
  deleteKid as deleteKidNotifyApi
} from "../../../Common/MockApiConnections";

const mapStateToProps = state => ({
  ...state.userInfo,
  ...state.moneyIncludesDictionary,
  ...state.schoolTypeDictionary,
  ...state.paymentPeriodDictionary
});
class KidsPage extends React.Component {
  handleAddKid = kid => {
    // this.props.dispatch(addKid(kid));
    addKidNotifyApi(kid)
      .then(response => this.props.dispatch(updateKidList(response.kids)))
      .catch(err => this.props.dispatch(displaySnackbarMessage(err.message)));
  };

  handleDeleteKid = kidIdx => {
    // this.props.dispatch(deleteKid(kidIdx));
    deleteKidNotifyApi(kidIdx)
      .then(response => this.props.dispatch(updateKidList(response.kids)))
      .catch(err => this.props.dispatch(displaySnackbarMessage(err.message)));
  };

  handleEditKid = (kid, kidIdx) => {
    // this.props.dispatch(editKid(kid, kidIdx));
    editKidNotifyApi(kid, kidIdx)
      .then(response => this.props.dispatch(updateKidList(response.kids)))
      .catch(err => this.props.dispatch(displaySnackbarMessage(err.message)));
  };

  render() {
    const { user } = this.props;
    return (
      <Page style={this.props.style}>
        <KidsEntry
          numberOfKids={user.kids.length}
          firstKidDate={
            user.kids.reduce((prev, curr) => {
              return prev.paymentDate < curr.paymentDate ? prev : curr;
            }, new Date()).paymentDate
          }
        />
        <KidsSummaryEntry
          onAddKid={this.handleAddKid}
          onDeleteKid={this.handleDeleteKid}
          onEditKid={this.handleEditKid}
          kidsArray={user.kids}
          moneyIncludes={this.props.moneyIncludes}
          paymentPeriods={this.props.paymentPeriod}
          schoolTypes={this.props.schoolType}
        />
      </Page>
    );
  }
}
export default connect(mapStateToProps)(KidsPage);
