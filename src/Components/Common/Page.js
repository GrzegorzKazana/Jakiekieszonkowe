import React, { Component } from "react";
import { Grid } from "@material-ui/core";

export default class Page extends React.Component {
  render() {
    const { children } = this.props;
    const { style } = this.props;
    const childrenArr = Array.isArray(children) ? children : [children];
    return (
      <div style={{ ...style }}>
        <Grid container justify="center" style={{ padding: "8px 8px" }}>
          {childrenArr.map((value, index) => {
            return (
              <Grid
                item
                key={index}
                style={{ margin: "8px" }}
                xl={8}
                lg={9}
                md={10}
                sm={11}
                xs={11}
              >
                {value}
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}
