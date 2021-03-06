import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MainMenu from "./MainMenuAdmin";

export default class NavBarAdmin extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMenuItemSelected = (event, selectedPageContent) => {
    this.setState({ anchorEl: null });
    this.props.onTabChange(event, selectedPageContent);
  };

  render() {
    const { anchorEl } = this.state;
    // const { onTabChange } = this.props;
    const { onLogOut } = this.props;
    // const { selectedPageContent } = this.props;
    return (
      <AppBar
        position="static"
        style={{
          background: "transparent",
          boxShadow: "none"
        }}
      >
        <Toolbar style={{ backgroundColor: `rgba(0,0,0,0.5)` }}>
          <Typography
            variant="h6"
            color="inherit"
            style={{ flex: 1, display: "flex", flexDirection: "row" }}
          >
            Panel administracyjny
          </Typography>
          <div>
            <IconButton onClick={this.handleClick} color="inherit">
              <AccountCircle />
            </IconButton>
            <MainMenu
              userEmail={this.props.userEmail}
              anchorEl={anchorEl}
              onLogOut={onLogOut}
              onClose={this.handleClose}
              onMenuItemSelected={this.handleMenuItemSelected}
            />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
