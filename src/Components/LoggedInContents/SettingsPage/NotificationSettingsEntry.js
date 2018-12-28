import React, { Component } from "react";
import {
  Button,
  Grid,
  Checkbox,
  Typography,
  FormControlLabel
} from "@material-ui/core";
import PageEntry from "../../Common/PageEntry";
import NotificationDialog from "./NotificationDialog";
import Add from "@material-ui/icons/Add";
import NotificationList from "./NotificationList";

export default class NotificationSettingsEntry extends React.Component {
  state = {
    dialogOpen: false
  };

  openDialog = e => {
    this.setState({ dialogOpen: true });
  };

  closeDialog = e => {
    this.setState({ dialogOpen: false });
  };

  submitDialog = data => {
    this.closeDialog();
    this.props.onAddNotification(data);
  };

  deleteNotification = idx => {
    this.props.onDeleteNotification(idx);
  };

  toggleMetaNotification = (e, val) => {
    val
      ? this.props.onAddMetaNotification()
      : this.props.onDeleteMetaNotification();
  };

  render() {
    return (
      <PageEntry
        title="Powiadomienia"
        subtitle={
          <div>
            W poniższej sekcji możesz skonfigurować mechanizm powiadomień
            otrzymywanych na konto email w celu przypomnienia o nadchodzących
            wypłatach kieszonkowego.
          </div>
        }
      >
        {this.props.userNotifications.length > 0 && (
          <NotificationList
            notificationArray={this.props.userNotifications}
            handleDelete={this.deleteNotification}
          />
        )}
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.props.userMetaNotification}
                onChange={this.toggleMetaNotification}
              />
            }
            label={
              <Typography variant="subtitle1" color="inherit">
                Chcę otrzymywać powiadomienia statystyczne
              </Typography>
            }
          />
        </div>
        <div>
          <Button
            onClick={this.openDialog}
            variant="contained"
            color="secondary"
            style={{
              margin: "15px 0px 0px 0px",
              textAlign: "right",
              float: "right"
            }}
          >
            Dodaj
            <Add />
          </Button>
        </div>
        <NotificationDialog
          userKids={this.props.userKids}
          open={this.state.dialogOpen}
          handleClose={this.closeDialog}
          handleSubmit={this.submitDialog}
        />
      </PageEntry>
    );
  }
}
