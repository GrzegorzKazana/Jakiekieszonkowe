import React from "react";
import { Button, Grid } from "@material-ui/core";
import PageEntry from "../../Common/PageEntry";
import KidsExpandableCard from "./KidsExpandableCard";
import Add from "@material-ui/icons/Add";
import KidsFormDialog from "./KidsFormDialog";
import ConfirmDialog from "../../Common/ConfirmDialog";

export default class KidsSummaryEntry extends React.Component {
  state = {
    dialogFormOpen: false,
    dialogEditMode: false,
    deleteKidConfirmDialog: false,
    expanded: null
  };

  openDialog = e => {
    console.log(this.state);
    this.setState({ dialogFormOpen: true, dialogEditMode: false });
  };

  openEditDialog = () => {
    this.setState({
      dialogFormOpen: true,
      dialogEditMode: true
    });
  };

  closeDialog = e => {
    this.setState({ dialogFormOpen: false, dialogEditMode: false });
  };

  closeEditDialog = e => {
    this.setState({
      dialogFormOpen: false,
      dialogEditMode: false
    });
  };

  submitDialog = data => {
    this.props.onAddKid(data);
  };

  submitEditDialog = data => {
    this.props.onEditKid(data, this.props.kidsArray[this.state.expanded].id);
  };

  handleExpandChange = changedId => {
    const currentExpandedId = this.state.expanded;
    this.setState({
      expanded: currentExpandedId === changedId ? null : changedId
    });
  };

  handleDeleteKid = () => {
    this.setState({ deleteKidConfirmDialog: true });
  };

  cancelDeleteKid = () => {
    this.setState({ deleteKidConfirmDialog: false });
  };

  doDeleteKid = () => {
    this.props.onDeleteKid(this.props.kidsArray[this.state.expanded].id);
    this.setState({ deleteKidConfirmDialog: false });
  };

  render() {
    const { kidsArray } = this.props;
    return (
      <PageEntry title="Wypłacane kieszonkowe" loading={true}>
        <div style={{ margin: "15px 0px 0px 0px" }}>
          {kidsArray.map((kid, idx) => {
            return (
              <KidsExpandableCard
                key={idx}
                id={idx}
                isExpanded={this.state.expanded === idx}
                handleChange={this.handleExpandChange}
                onDeleteKid={this.handleDeleteKid}
                onEditKid={this.openEditDialog}
                kidInfo={kid}
                moneyIncludes={this.props.moneyIncludes}
                paymentPeriods={this.props.paymentPeriods}
                schoolTypes={this.props.schoolTypes}
              />
            );
          })}

          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
          >
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: "15px 0px 0px 0px", textAlign: "right" }}
              onClick={this.openDialog}
            >
              Dodaj
              <Add />
            </Button>
          </Grid>
          {this.state.dialogFormOpen && (
            <KidsFormDialog
              open={this.state.dialogFormOpen}
              handleClose={
                this.state.dialogEditMode
                  ? this.closeEditDialog
                  : this.closeDialog
              }
              handleSubmit={
                this.state.dialogEditMode
                  ? this.submitEditDialog
                  : this.submitDialog
              }
              prefillKid={
                this.state.dialogEditMode && kidsArray[this.state.expanded]
              }
              prefillPlaces={
                !this.state.dialogEditMode && this.state.dialogFormOpen
              }
              moneyIncludes={this.props.moneyIncludes}
              paymentPeriods={this.props.paymentPeriods}
              schoolTypes={this.props.schoolTypes}
            />
          )}
          <ConfirmDialog
            open={this.state.deleteKidConfirmDialog}
            title="Definitywnie?"
            text="Operacja usunięcia rekordu dziecka jest nieodwracalna."
            onConfirm={this.doDeleteKid}
            onCancel={this.cancelDeleteKid}
          />
        </div>
      </PageEntry>
    );
  }
}
