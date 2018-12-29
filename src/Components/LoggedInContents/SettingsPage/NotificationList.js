import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export default class NotificationList extends React.Component {
  render() {
    const { handleDelete } = this.props;
    const { notificationArray } = this.props;
    const lastElementId = notificationArray.length - 1;
    return (
      <Paper>
        <List>
          {notificationArray.map((notif, idx) => {
            return (
              <ListItem key={idx} divider={idx !== lastElementId}>
                <ListItemText primary={notif.name} />
                <ListItemText
                  primary={notif.notificationOverLap + " dzień/dni"}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => handleDelete(notif.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    );
  }
}
