import React, { Component } from "react";
import { Typography, Paper } from "@material-ui/core";

export default class PageEntry extends React.Component {
  render() {
    const { title } = this.props;
    const { subtitle } = this.props;
    const { children } = this.props;
    return (
      <Paper style={{ padding: 20, overflow: "auto" }}>
        <Typography component="h4" variant="h4" color="inherit">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          {subtitle}
        </Typography>
        {children}
      </Paper>
    );
  }
}
