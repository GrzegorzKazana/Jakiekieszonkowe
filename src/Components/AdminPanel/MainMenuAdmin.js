import React from "react";
import { Menu, MenuItem, Divider } from "@material-ui/core";

export default class MainMenuAdmin extends React.Component {
  render() {
    const { anchorEl } = this.props;
    const { onClose } = this.props;
    const { onLogOut } = this.props;
    const { userEmail } = this.props;
    return (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <MenuItem>{userEmail}</MenuItem>
        <Divider />
        <MenuItem onClick={onLogOut}>Wyloguj</MenuItem>
      </Menu>
    );
  }
}
