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
    const { userData } = this.props;
    return (
      <PageEntry title="Dane osobowe" loading={this.props.loading}>
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
                  <Typography variant="subtitle1">Kraj:</Typography>
                </TableCell>
                <TableCell numeric>
                  <Typography variant="h6">
                    {userData.country || "Polska"}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">Wojewódźtwo:</Typography>
                </TableCell>
                <TableCell numeric>
                  <Typography variant="h6">{userData.province}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">Miasto:</Typography>
                </TableCell>
                <TableCell numeric>
                  <Typography variant="h6">{userData.city}</Typography>
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
        {this.state.editPersonalDataDialog && (
          <PersonalDataDialog
            userData={userData}
            open={this.state.editPersonalDataDialog}
            onSubmit={this.handleSubmitPersonalDataDialog}
            onClose={this.handleCloseEditData}
          />
        )}
      </PageEntry>
    );
  }
}
