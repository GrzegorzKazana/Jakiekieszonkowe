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
import ResetPasswordDialog from "./ResetPasswordDialog";

export default class SettingsEntry extends React.Component {
  state = {
    resetPasswordDialog: false
  };

  handleShowResetPassword = () => {
    this.setState({ resetPasswordDialog: true });
  };

  handleCloseResetPassword = () => {
    this.setState({ resetPasswordDialog: false });
  };

  handleSubmitResetPasswordDialog = data => {
    this.handleCloseResetPassword();
    this.props.onPasswordChange(data);
  };

  render() {
    const { userData } = this.props;
    return (
      <PageEntry title="Ustawienia konta" loading={this.props.loading}>
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
                  <Typography variant="subtitle1">Adres e-mail:</Typography>
                </TableCell>
                <TableCell numeric>
                  <Typography variant="h6">{userData.email}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">Hasło:</Typography>
                </TableCell>
                <TableCell numeric>
                  <Typography variant="h6">********</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">
                    Data założenia konta:
                  </Typography>
                </TableCell>
                <TableCell numeric>
                  <Typography variant="h6">
                    {userData.accountActivationDate}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div>
            <Button
              style={{ padding: "5px 24px" }}
              onClick={this.handleShowResetPassword}
            >
              Zmień hasło
            </Button>
          </div>
        </Grid>
        <ResetPasswordDialog
          open={this.state.resetPasswordDialog}
          onSubmit={this.handleSubmitResetPasswordDialog}
          onClose={this.handleCloseResetPassword}
        />
      </PageEntry>
    );
  }
}
