import React from "react";
import { Typography, Paper, Grid } from "@material-ui/core";

export default class MapOverlay extends React.Component {
  render() {
    const { stats } = this.props;
    return (
      <Paper style={{ ...this.props.style, padding: "0px" }}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography variant="subtitle1" style={{ padding: "4px" }}>
            mało
          </Typography>
          <div
            style={{
              backgroundColor: this.props.low,
              padding: "5px",
              margin: "5px",
              border: "1px",
              borderStyle: "solid",
              borderColor: "black"
            }}
          />
          <div
            style={{
              backgroundColor: this.props.high,
              padding: "5px",
              margin: "5px",
              border: "1px",
              borderStyle: "solid",
              borderColor: "black"
            }}
          />
          <Typography variant="subtitle1" style={{ padding: "4px" }}>
            dużo
          </Typography>
        </Grid>
      </Paper>
    );
  }
}
