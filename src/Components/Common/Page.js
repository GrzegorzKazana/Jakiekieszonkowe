import React from "react";
import { Grid } from "@material-ui/core";

export default class Page extends React.Component {
  render() {
    const { children } = this.props;
    const { style } = this.props;
    const childrenArr = Array.isArray(children) ? children : [children];
    return (
      <div
        style={{
          ...style
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: `rgba(0,0,0,0.3)`,
            overflowY: "auto",
            overflowX: "hidden"
          }}
        >
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
      </div>
    );
  }
}
