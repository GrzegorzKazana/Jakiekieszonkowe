import React from "react";
import { Typography, Paper, LinearProgress } from "@material-ui/core";

export default class PageEntry extends React.Component {
  render() {
    const { title, subtitle, children, loading } = this.props;

    const loadingBar = (
      <LinearProgress
        color="secondary"
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          right: "0px"
        }}
      />
    );

    return (
      <Paper style={{ padding: 20, overflow: "auto", position: "relative" }}>
        {loading && loadingBar}
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
