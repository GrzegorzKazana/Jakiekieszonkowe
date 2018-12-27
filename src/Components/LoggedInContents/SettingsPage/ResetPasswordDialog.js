import React from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl
} from "@material-ui/core";
import { validatePassword } from "../../../Common/InputValidation";

export default class NotificationDialog extends React.Component {
  state = {
    oldPassword: "",
    newPassword: "",
    newPasswordRepeat: "",
    underValidation: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  checkAndSubmitForm = () => {
    this.setState({ underValidation: true });
    if (
      !this.validateOldPassword() ||
      !this.validateNewPassword() ||
      !this.validateNewPasswordRepeat()
    ) {
      return;
    }

    const passes = {
      oldPassword: this.props.oldPassword,
      newPassword: this.state.newPassword
    };
    this.props.onSubmit(passes);
  };

  validateOldPassword = () => this.state.oldPassword === this.props.oldPassword;
  validateNewPassword = () => validatePassword(this.state.newPassword);
  validateNewPasswordRepeat = () =>
    this.validateNewPassword() &&
    this.state.newPassword === this.state.newPasswordRepeat;

  render() {
    // const { oldPassword } = this.props;
    const { open } = this.props;
    const { onClose } = this.props;
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={onClose}
      >
        <DialogTitle>Zmień hasło</DialogTitle>
        <DialogContent>
          <form style={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl margin="dense" required fullWidth>
              <TextField
                id="old-pass"
                label="Stare hasło"
                type="password"
                autoFocus
                fullWidth
                onChange={this.handleChange("oldPassword")}
                error={
                  this.state.underValidation && !this.validateOldPassword()
                }
              />
            </FormControl>
            <FormControl margin="dense" required fullWidth>
              <TextField
                id="new-pass"
                label="Nowe hasło"
                type="password"
                fullWidth
                onChange={this.handleChange("newPassword")}
                error={
                  this.state.underValidation && !this.validateNewPassword()
                }
              />
            </FormControl>
            <FormControl margin="dense" required fullWidth>
              <TextField
                id="new-pass-repeat"
                label="Nowe hasło (powtórz)"
                type="password"
                fullWidth
                onChange={this.handleChange("newPasswordRepeat")}
                error={
                  this.state.underValidation &&
                  !this.validateNewPasswordRepeat()
                }
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.checkAndSubmitForm} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
