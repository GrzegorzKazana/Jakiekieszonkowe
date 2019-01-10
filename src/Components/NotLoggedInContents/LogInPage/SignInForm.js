import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  Paper,
  Typography,
  Grid,
  InputLabel,
  Input,
  Checkbox,
  FormControlLabel,
  FormControl,
  Button,
  LinearProgress
} from "@material-ui/core";
import {
  validateNewEmail,
  validateNewPassword
} from "../../../Common/InputValidation";
import TermsDialog from "../TermsPage/TermsDialog";
import { displaySnackbarMessage } from "../../../Actions/InfoSnackbarActions";
import { registerUser } from "../../../Common/MockApiConnections/UserApi";
import { registerUser as registerUserRealApi } from "../../../Common/RealApiConnections/UserApi";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  ...state.provinceDictionary,
  ...state.cityDictionary
});
class SignInForm extends React.Component {
  state = {
    termsDialogOpen: false,
    email: "",
    password: "",
    passwordRepeat: "",
    provinceId: "",
    cityId: "",
    acceptedTerms: false,
    underValidation: false,
    emailValid: false,
    passwordValid: false,
    passwordRepeatValid: false,
    provinceValid: false,
    cityValid: false,
    provinceList: [],
    cityList: [],
    cityDisabled: true
  };

  handleEmailChange = event => {
    this.setState({
      email: event.target.value,
      emailValid: this.validateEmail(event.target.value)
    });
  };
  handlePasswordChange = event => {
    this.setState({
      password: event.target.value,
      passwordValid: this.validatePassword(event.target.value)
    });
  };
  handlePasswordRepeatChange = event => {
    this.setState({
      passwordRepeat: event.target.value,
      passwordRepeatValid: this.validatePasswordRepeat(
        this.state.password,
        event.target.value
      )
    });
  };
  handleProvinceChange = event => {
    const provinceId = event.target.value;
    this.setState({
      provinceId: provinceId,
      provinceValid: this.validateProvince(event.target.value),
      cityDisabled: false,
      cityId: "",
      cityValid: false
    });
  };
  handleCityChange = event => {
    const cityId = event.target.value;
    this.setState({
      cityId: cityId,
      cityValid: this.validateCity(event.target.value)
    });
  };
  handleCheckboxChange = name => (event, value) => {
    this.setState({ [name]: value });
  };

  showSnackbarMessage = msg => {
    this.props.dispatch(displaySnackbarMessage(msg));
  };

  handleSignIn = () => {
    this.setState({ underValidation: true });
    if (
      !this.state.emailValid ||
      !this.state.passwordValid ||
      !this.state.passwordRepeatValid ||
      !this.state.provinceValid ||
      !this.state.cityValid
    ) {
      this.showSnackbarMessage("Niepoprawne dane");
      return;
    }
    if (!this.state.acceptedTerms) {
      this.showSnackbarMessage("Zgoda regulaminu jest wymagana");
      return;
    }
    const userData = {
      email: this.state.email,
      password: this.state.password,
      provinceId: this.state.provinceId,
      cityId: this.state.cityId
    };

    // registerUser(userData)
    registerUserRealApi(userData)
      .then(data => this.showSnackbarMessage("Konto zostało aktywowane"))
      .catch(err => this.showSnackbarMessage(err.message || "Nastąpił błąd"));
    this.props.onCancel();
  };

  validateProvince = prov => prov !== "";
  validateCity = city => city !== "";
  validateEmail = email => validateNewEmail(email);
  validatePassword = password => validateNewPassword(password);
  validatePasswordRepeat = (pass, passRepeat) =>
    this.validatePassword(pass) && pass === passRepeat;

  render() {
    const { onCancel } = this.props;
    const loading = !this.props.provincesLoaded || !this.props.citiesLoaded;
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
          style={{ padding: "20px", height: "100%", position: "relative" }}
          container
          direction="column"
          justify="flex-end"
          alignItems="center"
        >
          <Typography component="h1" variant="h5" style={{ margin: "15px" }}>
            Utwórz konto
          </Typography>

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

            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <FormControl
                margin="dense"
                style={{ minWidth: 150, width: "48%" }}
                error={this.state.underValidation && !this.state.provinceValid}
              >
                <InputLabel htmlFor="name-simple">Województwo</InputLabel>
                <Select
                  disabled={!this.props.provincesLoaded}
                  value={this.state.provinceId}
                  onChange={this.handleProvinceChange}
                  input={<Input id="name-simple" />}
                >
                  {this.props.provinces.map((prov, idx) => {
                    return (
                      <MenuItem value={prov.id} key={prov.id}>
                        {prov.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl
                margin="dense"
                style={{ minWidth: 150, width: "48%" }}
                error={this.state.underValidation && !this.state.cityValid}
              >
                <InputLabel htmlFor="name-simple">Miasto</InputLabel>
                <Select
                  disabled={this.state.cityDisabled || !this.props.citiesLoaded}
                  value={this.state.cityId}
                  onChange={this.handleCityChange}
                  input={<Input id="name-simple2" />}
                >
                  {this.props.cities
                    .filter(city => city.provinceId === this.state.provinceId)
                    .map((city, idx) => {
                      return (
                        <MenuItem value={city.id} key={city.id}>
                          {city.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <FormControl margin="dense" required fullWidth>
              <TextField
                id="standard-with-placeholder11"
                label="Hasło *"
                autoComplete="current-password"
                type="password"
                onChange={this.handlePasswordChange}
                error={this.state.underValidation && !this.state.passwordValid}
              />
            </FormControl>
            <FormControl margin="dense" required fullWidth>
              <TextField
                id="standard-with-placeholder12"
                label="Powtórz Hasło *"
                autoComplete="current-password"
                type="password"
                onChange={this.handlePasswordRepeatChange}
                error={
                  this.state.underValidation && !this.state.passwordRepeatValid
                }
              />
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  onChange={this.handleCheckboxChange("acceptedTerms")}
                />
              }
              label={
                <p
                  style={{
                    color:
                      this.state.underValidation && !this.state.acceptedTerms
                        ? "red"
                        : "black"
                  }}
                >
                  Przeczytałem i zatwierdzam{" "}
                  <a
                    href="#"
                    onClick={e => this.setState({ termsDialogOpen: true })}
                  >
                    regulamin
                  </a>{" "}
                  *
                </p>
              }
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{ padding: "15px" }}
              onClick={this.handleSignIn}
            >
              Rejestruj
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              style={{ margin: "10px 0px", padding: "15px" }}
              onClick={onCancel}
            >
              Anuluj
            </Button>
          </form>
        </Grid>
        <TermsDialog
          open={this.state.termsDialogOpen}
          onClose={e => this.setState({ termsDialogOpen: false })}
        />
      </Paper>
    );
  }
}
export default connect(mapStateToProps)(SignInForm);
