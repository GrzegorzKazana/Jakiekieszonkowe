import React from "react";
import Page from "../../Common/Page";
import SettingsEntry from "./SettingsEntry";
import PersonalDataEntry from "./PersonalDataEntry";
import NotificationSettingsEntry from "./NotificationSettingsEntry";
import {
  changePassword,
  changeUserData,
  addUserNotification,
  deleteUserNotification,
  addMetaNotification,
  deleteMetaNotification,
  updateNotificationList
} from "../../../Actions/UserInfoActions";
import { displaySnackbarMessage } from "../../../Actions/InfoSnackbarActions";
import {
  changePassword as changePasswordNotifyApi,
  changeUserData as changeUserDataNotifyApi,
  addNotification as addNotificationNotifyApi,
  deleteNotification as deleteNotificationNotifyApi,
  addMetaNotification as addMetaNotificationNotifyApi,
  deleteMetaNotification as deleteMetaNotificationNotifyApi
} from "../../../Common/MockApiConnections/UserApi";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  ...state.userInfo
});
class SettingsPage extends React.Component {
  handlePasswordChange = data => {
    // this.props.dispatch(changePassword(data.newPassword));
    changePasswordNotifyApi(data.oldPassword, data.newPassword)
      .then(data =>
        this.props.dispatch(
          displaySnackbarMessage("Zmienino hasło z powodzeniem")
        )
      )
      .catch(err => this.props.dispatch(displaySnackbarMessage(err.message)));
  };

  handleUserDataChange = data => {
    // this.props.dispatch(changeUserData(data));
    changeUserDataNotifyApi(data)
      .then(data => this.props.dispatch(changeUserData(data)))
      .catch(err => this.props.dispatch(displaySnackbarMessage(err.message)));
  };

  handleAddNotification = data => {
    // this.props.dispatch(addUserNotification(data));
    addNotificationNotifyApi(data)
      .then(data => this.props.dispatch(updateNotificationList(data.list)))
      .catch(err => this.props.dispatch(displaySnackbarMessage(err.message)));
  };

  handleDeleteNotification = idx => {
    // this.props.dispatch(deleteUserNotification(idx));
    deleteNotificationNotifyApi(idx)
      .then(data => this.props.dispatch(updateNotificationList(data.list)))
      .catch(err => this.props.dispatch(displaySnackbarMessage(err.message)));
  };

  handleAddMetaNotification = () => {
    console.log("added meta notification");
    this.props.dispatch(addMetaNotification());
    addMetaNotificationNotifyApi();
  };

  handleDeleteMetaNotification = () => {
    console.log("delete meta notification");
    this.props.dispatch(deleteMetaNotification());
    deleteMetaNotificationNotifyApi();
  };

  render() {
    return (
      <Page style={this.props.style}>
        <SettingsEntry
          user={this.props.user}
          onPasswordChange={this.handlePasswordChange}
        />
        <PersonalDataEntry
          user={this.props.user}
          onUserDataChange={this.handleUserDataChange}
        />
        <NotificationSettingsEntry
          user={this.props.user}
          onAddNotification={this.handleAddNotification}
          onDeleteNotification={this.handleDeleteNotification}
          onAddMetaNotification={this.handleAddMetaNotification}
          onDeleteMetaNotification={this.handleDeleteMetaNotification}
        />
      </Page>
    );
  }
}
export default connect(mapStateToProps)(SettingsPage);
