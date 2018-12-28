import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockIcon from "@material-ui/icons/LockOutlined";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { TextField, Paper, CircularProgress } from "@material-ui/core";

import {
  validateInputEmail,
  validateInputPassword
} from "../../../Common/InputValidation";
import { connect } from "react-redux";
import { displaySnackbarMessage } from "../../../Actions/InfoSnackbarActions";
import {
  requestUserValidation,
  userValidated,
  requestUserValidationFailed
} from "../../../Actions/UserInfoActions";
import { validateUserApiCall } from "../../../Common/MockApiConnections/UserApi";

const mapStateToProps = state => ({
  ...state.userInfo
});
class LogInForm extends React.Component {
  state = {
    email: "",
    password: "",
    emailValid: false,
    passwordValid: false,
    rememberMe: false,
    underValidation: false
  };

  handleEmailChange = event => {
    this.setState({
      email: event.target.value,
      emailValid: validateInputEmail(event.target.value)
    });
  };
  handlePasswordChange = event => {
    this.setState({
      password: event.target.value,
      passwordValid: validateInputPassword(event.target.value)
    });
  };

  handleCheckboxChange = name => (event, value) => {
    this.setState({ [name]: value });
  };

  showSnackbarMessage = msg => {
    this.props.dispatch(displaySnackbarMessage(msg));
  };

  handleForgotPassword = () => {
    this.showSnackbarMessage("Na konto email została widomość aktywacyjna");
  };

  handleLogIn = () => {
    this.setState({ underValidation: true });
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    if (!this.state.emailValid || !this.state.passwordValid) {
      return;
    }
    this.props.dispatch(requestUserValidation());
    console.log(user);
    validateUserApiCall(user.email, user.password)
      .then(data =>
        this.props.dispatch(
          userValidated(
            data.response.userData,
            data.response.userKids,
            data.response.userNotifications,
            data.response.isAdmin,
            data.response.userMetaNotification
          )
        )
      )
      .catch(err => {
        this.props.dispatch(requestUserValidationFailed());
        this.props.dispatch(displaySnackbarMessage(err.message));
      });
  };

  render() {
    const { onRegisterClick } = this.props;
    return (
      <Paper style={{ height: "100%", width: "100%" }}>
        <Grid
          style={{ padding: "20px", height: "100%" }}
          container
          direction="column"
          justify="flex-end"
          alignItems="center"
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ padding: "10px" }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                position: "relative"
              }}
            >
              <Avatar
                style={{
                  width: "80px",
                  height: "80px"
                }}
              >
                <LockIcon
                  style={{
                    width: "60px",
                    height: "60px"
                  }}
                />
              </Avatar>
              {this.props.userDataFetching && (
                <CircularProgress
                  size={80}
                  thickness={2}
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "0px"
                  }}
                />
              )}
            </div>
            <Typography component="h1" variant="h5" style={{ margin: "15px" }}>
              Zaloguj się
            </Typography>
          </Grid>

          <form>
            <FormControl margin="dense" required fullWidth>
              <TextField
                id="standard-with-placeholder"
                label="Adres Email *"
                autoComplete="email"
                autoFocus
                onChange={this.handleEmailChange}
                error={this.state.underValidation && !this.state.emailValid}
              />
            </FormControl>
            <FormControl margin="dense" required fullWidth>
              <TextField
                id="standard-with-placeholder2"
                label="Hasło *"
                type="password"
                autoComplete="current-password"
                onChange={this.handlePasswordChange}
                error={this.state.underValidation && !this.state.passwordValid}
              />
            </FormControl>
            <Button fullWidth size="small" onClick={this.handleForgotPassword}>
              zapomniałem hasła
            </Button>
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  onChange={this.handleCheckboxChange("rememberMe")}
                />
              }
              label="Zapamiętaj hasło"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{ padding: "15px" }}
              onClick={this.handleLogIn}
            >
              Zaloguj
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              style={{ margin: "10px 0px", padding: "15px" }}
              onClick={onRegisterClick}
            >
              Zarejestruj
            </Button>
          </form>
        </Grid>
      </Paper>
    );
  }
}
export default connect(mapStateToProps)(LogInForm);
