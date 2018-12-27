import React from "react";
import {
  Grid,
  Button,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import PageEntry from "../../Common/PageEntry";
import PersonalDataDialog from "./PersonalDataDialog";

export default class PersonalDataEntry extends React.Component {
  state = {
    editPersonalDataDialog: false
  };

  handleShowEditData = () => {
    this.setState({ editPersonalDataDialog: true });
  };

  handleCloseEditData = () => {
    this.setState({ editPersonalDataDialog: false });
  };

  handleSubmitPersonalDataDialog = data => {
    this.handleCloseEditData();
    this.props.onUserDataChange(data);
  };

  render() {
    const { user } = this.props;
    return (
      <PageEntry title="Dane osobowe">
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="flex-end"
        >
          <Table style={{ width: "100%", margin: "10px 0px" }}>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="subheading">Kraj:</Typography>
                </TableCell>
                <TableCell numeric>
                  <Typography variant="h6">{user.country}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subheading">Wojewódźtwo:</Typography>
                </TableCell>
                <TableCell numeric>
                  <Typography variant="h6">{user.province}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subheading">Miasto:</Typography>
                </TableCell>
                <TableCell numeric>
                  <Typography variant="h6">{user.city}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div>
            <Button
              style={{ padding: "5px 24px" }}
              onClick={this.handleShowEditData}
            >
              Edytuj
            </Button>
          </div>
        </Grid>
        <PersonalDataDialog
          user={user}
          open={this.state.editPersonalDataDialog}
          onSubmit={this.handleSubmitPersonalDataDialog}
          onClose={this.handleCloseEditData}
        />
      </PageEntry>
    );
  }
}
