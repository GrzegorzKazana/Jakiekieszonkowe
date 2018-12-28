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
  deleteMetaNotification
} from "../../../Actions/UserInfoActions";
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
    this.props.dispatch(changePassword(data.newPassword));
    changePasswordNotifyApi(data.newPassword);
  };

  handleUserDataChange = data => {
    this.props.dispatch(changeUserData(data));
    changeUserDataNotifyApi(data);
  };

  handleAddNotification = data => {
    this.props.dispatch(addUserNotification(data));
    addNotificationNotifyApi(data);
  };

  handleDeleteNotification = idx => {
    this.props.dispatch(deleteUserNotification(idx));
    deleteNotificationNotifyApi(idx);
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
