import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import LockIcon from "@material-ui/icons/LockOutlined";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  TextField,
  Paper,
  CircularProgress,
  LinearProgress
} from "@material-ui/core";

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
import {
  validateUserApiCall as validateUserApiCallRealApi,
  forgotPassword as forgotPasswordRealApi
} from "../../../Common/RealApiConnections/UserApi";

const mapStateToProps = state => ({
  ...state.userInfo,
  provincesLoaded: state.provinceDictionary.provincesLoaded,
  citiesLoaded: state.cityDictionary.citiesLoaded,
  paymentPeriodLoaded: state.paymentPeriodDictionary.paymentPeriodLoaded,
  schoolTypeLoaded: state.schoolTypeDictionary.schoolTypeLoaded,
  moneyIncludesLoaded: state.moneyIncludesDictionary.moneyIncludesLoaded
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

  dictionariesLoaded = () =>
    this.props.provincesLoaded &&
    this.props.citiesLoaded &&
    this.props.paymentPeriodLoaded &&
    this.props.schoolTypeLoaded &&
    this.props.moneyIncludesLoaded;

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
    if (!this.state.emailValid) {
      return;
    }
    forgotPasswordRealApi(this.state.email)
      .then(data =>
        this.showSnackbarMessage("Na konto email została widomość resetująca")
      )
      .catch(err => this.showSnackbarMessage(err.message));
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
    if (!this.dictionariesLoaded()) {
      this.showSnackbarMessage("Błąd połączenia.");
    }
    this.props.dispatch(requestUserValidation());
    // validateUserApiCall(user.email, user.password)
    validateUserApiCallRealApi(user.email, user.password)
      .then(data =>
        this.props.dispatch(
          userValidated(
            data.userData,
            data.userKids,
            data.userNotifications,
            data.isAdmin,
            data.userMetaNotification,
            data.token
          )
        )
      )
      .catch(err => {
        this.props.dispatch(requestUserValidationFailed());
        this.props.dispatch(
          displaySnackbarMessage(err.message || "Nastąpił błąd")
        );
      });
  };

  render() {
    const { onRegisterClick } = this.props;
    const loading = !this.dictionariesLoaded();
    const loadingBar = (
      <LinearProgress
        color="secondary"
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          right: "0px"
        }}
      />
    );
    return (
      <Paper style={{ height: "100%", width: "100%" }}>
        {loading && loadingBar}
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
            <Button
              fullWidth
              onClick={this.handleForgotPassword}
              style={{ margin: "10px 0px" }}
            >
              zapomniałem hasła
            </Button>
            {/* <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  onChange={this.handleCheckboxChange("rememberMe")}
                />
              }
              label="Zapamiętaj hasło"
            /> */}
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
