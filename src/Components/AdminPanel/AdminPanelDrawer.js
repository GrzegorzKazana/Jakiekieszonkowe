import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Paper,
  Divider
} from "@material-ui/core";
import {
  LibraryBooks,
  Timeline,
  ExpandLess,
  ExpandMore
} from "@material-ui/icons";

export default class AdminPanelDrawer extends React.Component {
  state = {
    drawerListExpanded: false
  };
  render() {
    return (
      <Paper square style={{ height: "100%", minWidth: "256px" }}>
        <List>
          <ListItem
            button
            onClick={() =>
              this.setState(state => ({
                ...state,
                drawerListExpanded: !state.drawerListExpanded
              }))
            }
          >
            <ListItemIcon>
              <LibraryBooks />
            </ListItemIcon>
            <ListItemText inset primary="Słowniki" />
            {this.state.drawerListExpanded ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={this.state.drawerListExpanded}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {this.props.dictionaries.map(({ name, page }, key) => (
                <ListItem
                  button
                  key={key}
                  onClick={() => this.props.onPageSelected(page)}
                >
                  <ListItemText inset primary={name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <Divider />
          <ListItem
            button
            onClick={() =>
              this.props.onPageSelected(this.props.dictionaries.length)
            }
          >
            <ListItemIcon>
              <Timeline />
            </ListItemIcon>
            <ListItemText inset primary="Statystyki portalu" />
          </ListItem>
        </List>
      </Paper>
    );
  }
}
