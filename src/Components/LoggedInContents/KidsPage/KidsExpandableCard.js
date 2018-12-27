import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from "@material-ui/core";
import { ExpandMore, Person, Add } from "@material-ui/icons";
import {
  DaysToPaymentPeriod,
  SchoolIndexToName
} from "../../../Common/ValuesToStringMappings";

export default class KidsExpandableCard extends React.Component {
  render() {
    const {
      kidInfo,
      id,
      isExpanded,
      handleChange,
      onDeleteKid,
      onEditKid
    } = this.props;

    const expansionPanelHeader = (
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <ListItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <ListItemText
              primary={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignContent: "space-around"
                  }}
                >
                  <div>{kidInfo.name + " " + kidInfo.age + "l."}</div>
                  <div>{kidInfo.quota + "zł"}</div>
                </div>
              }
            />
          </Grid>
        </ListItem>
      </ExpansionPanelSummary>
    );

    const expansionPanelBody = (
      <ExpansionPanelDetails>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-end"
        >
          <List dense={true}>
            <ListItem>
              <ListItemText
                primary={
                  "Rodzaj szkoły: " + SchoolIndexToName[kidInfo.schoolType]
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={"Pierwsza wypłata: " + kidInfo.paymentDate}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  "Okres wypłat: " + DaysToPaymentPeriod[kidInfo.paymentPeriod]
                }
              />
            </ListItem>
            {this.props.moneyIncludes
              .filter(x => kidInfo.moneyIncludes.includes(x.id))
              .map((moneyInclude, idx) => (
                <ListItem key={idx}>
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText primary={moneyInclude.name} />
                </ListItem>
              ))}
          </List>
          <div>
            <Button onClick={onEditKid}>Edytuj</Button>
            <Button onClick={onDeleteKid}>Usuń</Button>
          </div>
        </Grid>
      </ExpansionPanelDetails>
    );

    return (
      <ExpansionPanel expanded={isExpanded} onChange={() => handleChange(id)}>
        {expansionPanelHeader}
        {expansionPanelBody}
      </ExpansionPanel>
    );
  }
}
