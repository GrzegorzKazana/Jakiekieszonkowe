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
  Button
} from "@material-ui/core";
import {
  validateNewEmail,
  validateNewPassword
} from "../../../Common/InputValidation";
import { displaySnackbarMessage } from "../../../Actions/InfoSnackbarActions";
import { registerUser } from "../../../Common/MockApiConnections";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  ...state.provinceDictionary,
  ...state.cityDictionary
});
class SignInForm extends React.Component {
  state = {
    email: "",
    password: "",
    passwordRepeat: "",
    provinceIdx: "",
    cityIdx: "",
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
    const provinceIdx = event.target.value;
    this.setState({
      provinceIdx: provinceIdx,
      provinceValid: this.validateProvince(event.target.value),
      cityDisabled: false,
      cityIdx: "",
      cityValid: false
    });
  };
  handleCityChange = event => {
    const cityIdx = event.target.value;
    this.setState({
      cityIdx: cityIdx,
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
      provinceIdx: this.state.provinceIdx,
      cityIdx: this.state.cityIdx
    };

    this.showSnackbarMessage(
      "Na konto email została wysłana wiadomość aktywacyjna"
    );
    registerUser(userData);
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
    return (
      <Paper style={{ height: "100%", width: "100%" }}>
        <Grid
          style={{ padding: "20px", height: "100%" }}
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
                  value={this.state.provinceIdx}
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
                  disabled={this.state.cityDisabled}
                  value={this.state.cityIdx}
                  onChange={this.handleCityChange}
                  input={<Input id="name-simple2" />}
                >
                  {this.props.cities
                    .filter(city => city.provinceId === this.state.provinceIdx)
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
                  Przeczytałem i zatwierdzam regulamin *
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
      </Paper>
    );
  }
}
export default connect(mapStateToProps)(SignInForm);
