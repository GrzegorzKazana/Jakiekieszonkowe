import React from "react";
import { Drawer } from "@material-ui/core";

export default class MapDrawer extends React.Component {
  render() {
    return (
      <Drawer open={this.props.open} onClose={this.props.onClose}>
        <div style={{ width: "300px" }}>asdasd</div>
      </Drawer>
    );
  }
}
