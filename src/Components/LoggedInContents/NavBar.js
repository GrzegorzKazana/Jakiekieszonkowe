import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tabs,
  Tab
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MainMenu from "./MainMenu";

export default class NavBar extends React.Component {
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
    const {
      onTabChange,
      onLogOut,
      selectedPageContent,
      userEmail
    } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            style={{ flex: 1, display: "flex", flexDirection: "row" }}
          >
            jakiekieszonkowe.pl
          </Typography>
          <Tabs
            value={selectedPageContent < 3 ? selectedPageContent : false}
            onChange={onTabChange}
          >
            <Tab label="Aktualności" style={{ height: 64 }} />
            <Tab label="Dzieci" style={{ height: 64 }} />
            <Tab label="Mapa" style={{ height: 64 }} />
          </Tabs>
          <div>
            <IconButton onClick={this.handleClick} color="inherit">
              <AccountCircle />
            </IconButton>
            <MainMenu
              userEmail={userEmail}
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
