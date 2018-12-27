import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";

export default class FaqQuestion extends React.Component {
  render() {
    const { index, question, answer } = this.props;
    return (
      <ListItem>
        <ListItemText primary={`${index}. ${question}`} secondary={answer} />
      </ListItem>
    );
  }
}
