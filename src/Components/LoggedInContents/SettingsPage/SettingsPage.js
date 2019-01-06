import React from "react";
import Page from "../../Common/Page";
import SettingsEntry from "./SettingsEntry";
import PersonalDataEntry from "./PersonalDataEntry";
import NotificationSettingsEntry from "./NotificationSettingsEntry";
import {
  requestChangeUserData,
  changeUserData,
  updateNotificationList,
  changeMetaNotification,
  requestUpdateNotificationList
} from "../../../Actions/UserInfoActions";
import { displaySnackbarMessage } from "../../../Actions/InfoSnackbarActions";
import {
  changePassword as changePasswordNotifyApi,
  changeUserData as changeUserDataNotifyApi,
  addNotification as addNotificationNotifyApi,
  deleteNotification as deleteNotificationNotifyApi,
  changeMetaNotification as changeMetaNotificationNotifyApi
} from "../../../Common/MockApiConnections/UserApi";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  ...state.userInfo
});
class SettingsPage extends React.Component {
  state = {
    passwordChangeIssued: false,
    metaNotificationChangeIssued: false
  };

  handlePasswordChange = data => {
    // this.props.dispatch(changePassword(data.newPassword));
    this.setState({ passwordChangeIssued: true });
    changePasswordNotifyApi(
      data.oldPassword,
      data.newPassword,
      this.props.token
    )
      .then(data => {
        this.props.dispatch(
          displaySnackbarMessage("Zmienino hasło z powodzeniem")
        );
        this.setState({ passwordChangeIssued: false });
      })
      .catch(err => {
        this.props.dispatch(
          displaySnackbarMessage(err.message || "Zmiana hasła nie powiodła się")
        );
        this.setState({ passwordChangeIssued: false });
      });
  };

  handleUserDataChange = data => {
    // this.props.dispatch(changeUserData(data));
    this.props.dispatch(requestChangeUserData());
    changeUserDataNotifyApi(data, this.props.token)
      .then(data => this.props.dispatch(changeUserData(data)))
      .catch(err =>
        this.props.dispatch(
          displaySnackbarMessage(
            err.message || "Zmiana danych nie powiodła się"
          )
        )
      );
  };

  handleAddNotification = data => {
    // this.props.dispatch(addUserNotification(data));
    this.props.dispatch(requestUpdateNotificationList());
    addNotificationNotifyApi(data, this.props.token)
      .then(data => this.props.dispatch(updateNotificationList(data.list)))
      .catch(err =>
        this.props.dispatch(
          displaySnackbarMessage(
            err.message || "Dodanie powiadomienia nie powiodła się"
          )
        )
      );
  };

  handleDeleteNotification = idx => {
    // this.props.dispatch(deleteUserNotification(idx));
    this.props.dispatch(requestUpdateNotificationList());
    deleteNotificationNotifyApi(idx, this.props.token)
      .then(data => this.props.dispatch(updateNotificationList(data.list)))
      .catch(err =>
        this.props.dispatch(
          displaySnackbarMessage(
            err.message || "Usunięcie powiadomienia nie powiodła się"
          )
        )
      );
  };

  handleToggleMetaNotification = isSubscribed => {
    // this.props.dispatch(deleteMetaNotification());
    this.setState({ metaNotificationChangeIssued: true });
    changeMetaNotificationNotifyApi(isSubscribed, this.props.token)
      .then(data => {
        this.props.dispatch(changeMetaNotification(data.userMetaNotification));
        this.setState({ metaNotificationChangeIssued: false });
      })
      .catch(err => {
        this.props.dispatch(
          displaySnackbarMessage(err.message || "Operacja nie powiodła się")
        );
        this.setState({ metaNotificationChangeIssued: false });
      });
  };

  render() {
    return (
      <Page style={this.props.style}>
        <SettingsEntry
          userData={this.props.userData}
          onPasswordChange={this.handlePasswordChange}
          loading={this.state.passwordChangeIssued}
        />
        <PersonalDataEntry
          userData={this.props.userData}
          onUserDataChange={this.handleUserDataChange}
          loading={this.props.userDataFetching}
        />
        <NotificationSettingsEntry
          userKids={this.props.userKids}
          userNotifications={this.props.userNotifications}
          userMetaNotification={this.props.userMetaNotification}
          onAddNotification={this.handleAddNotification}
          onDeleteNotification={this.handleDeleteNotification}
          onToggleMetaNotification={this.handleToggleMetaNotification}
          loading={
            this.props.userNotificationsFetching ||
            this.state.metaNotificationChangeIssued
          }
        />
      </Page>
    );
  }
}
export default connect(mapStateToProps)(SettingsPage);
