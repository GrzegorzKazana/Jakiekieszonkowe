import React from "react";
import { Menu, MenuItem, Divider } from "@material-ui/core";

export default class NavBar extends React.Component {
  render() {
    const {
      anchorEl,
      onClose,
      onMenuItemSelected,
      onLogOut,
      userEmail
    } = this.props;
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
        <MenuItem onClick={e => onMenuItemSelected(e, 3)}>Ustawienia</MenuItem>
        <MenuItem onClick={onLogOut}>Wyloguj</MenuItem>
      </Menu>
    );
  }
}
