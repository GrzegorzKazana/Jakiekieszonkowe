import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

export default class LogInFailSnackbar extends React.Component {
  render() {
    const { open } = this.props;
    const { onClose } = this.props;
    const { text } = this.props;
    return (
      <Snackbar
        open={open}
        onClose={onClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={text}
      />
    );
  }
}
