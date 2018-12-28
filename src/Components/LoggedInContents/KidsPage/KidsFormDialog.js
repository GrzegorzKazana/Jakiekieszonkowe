import React from "react";
import {
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Divider,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Input,
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  ...state.userInfo,
  ...state.provinceDictionary,
  ...state.cityDictionary
});
class KidsFormDialog extends React.Component {
  constructor(props) {
    super(props);
    const { prefillKid } = this.props;

    if (!prefillKid) {
      this.state = {
        underValidation: false,
        name: "",
        age: "",
        schoolTypeId: "",
        quota: "",
        paymentPeriodId: "",
        paymentDate: "",
        provinceId: this.props.user.provinceId,
        cityId: this.props.user.cityId,
        cityDisabled: false,
        moneyIncludes: []
      };
    } else {
      this.state = {
        ...prefillKid,
        cityDisabled: false
      };
    }
  }

  reset() {
    this.setState(this.initialState);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleNumnericChange = name => event => {
    const value = parseInt(event.target.value) || "";
    this.setState({ [name]: value });
  };

  handleCheckboxChange = name => (event, value) => {
    this.setState({ [name]: value });
  };

  handleProvinceChange = event => {
    const provinceIdx = event.target.value;
    this.setState({
      provinceId: provinceIdx,
      cityId: "",
      cityDisabled: false
    });
  };

  handleCityChange = event => {
    const cityIdx = event.target.value;
    this.setState({ cityId: cityIdx });
  };

  validateProvince = () => this.state.provinceId !== "";
  validateCity = () => this.state.cityId !== "";

  cancelForm = () => {
    this.props.handleClose();
  };

  checkAndSubmitForm = () => {
    if (!Object.values(this.state).some(o => o === "")) {
      const child = {
        name: this.state.name,
        age: this.state.age,
        schoolTypeId: this.state.schoolTypeId,
        quota: this.state.quota,
        paymentPeriodId: this.state.paymentPeriodId,
        paymentDate: this.state.paymentDate,
        provinceId: this.state.provinceId,
        cityId: this.state.cityId,
        moneyIncludes: this.state.moneyIncludes
      };
      this.props.handleSubmit(child);
      this.cancelForm();
    } else {
      this.setState({ underValidation: true });
    }
  };

  render() {
    const { open, handleClose } = this.props;

    const nameForm = (
      <FormControl style={{ width: "32%", margin: "5px 0px" }}>
        <TextField
          id="standard-with-placeholder"
          label="Imię"
          defaultValue={this.state.name}
          placeholder="Imię"
          onChange={this.handleChange("name")}
          error={this.state.underValidation && this.state.name === ""}
        />
      </FormControl>
    );

    const ageForm = (
      <FormControl style={{ width: "32%", margin: "auto" }}>
        <TextField
          id="standard-with-placeholder"
          label="Wiek"
          type="number"
          defaultValue={this.state.age}
          placeholder="Wiek"
          onChange={this.handleNumnericChange("age")}
          error={this.state.underValidation && this.state.age === ""}
        />
      </FormControl>
    );

    const schoolTypeForm = (
      <FormControl
        style={{ width: "32%", margin: "5px 0px" }}
        error={this.state.underValidation && this.state.schoolTypeId === ""}
      >
        <InputLabel htmlFor="overlap-simple">Rodzaj szkoły</InputLabel>
        <Select
          value={this.state.schoolTypeId}
          onChange={this.handleChange("schoolTypeId")}
          input={<Input id="overlap-simple" />}
        >
          {this.props.schoolTypes.map((st, idx) => (
            <MenuItem value={st.id} key={idx}>
              {st.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );

    const quotaForm = (
      <FormControl style={{ width: "32%", margin: "5px 0px" }}>
        <TextField
          label="Kwota"
          type="number"
          id="simple-start-adornment"
          defaultValue={this.state.quota}
          onChange={this.handleNumnericChange("quota")}
          error={this.state.underValidation && this.state.quota === ""}
          InputProps={{
            startAdornment: <InputAdornment position="start">zł</InputAdornment>
          }}
        />
      </FormControl>
    );

    const paymentPeriodForm = (
      <FormControl
        style={{ width: "32%", margin: "auto" }}
        error={this.state.underValidation && this.state.paymentPeriodId === ""}
      >
        <InputLabel htmlFor="name-simple">Okres wypłat</InputLabel>
        <Select
          value={this.state.paymentPeriodId}
          onChange={this.handleChange("paymentPeriodId")}
          input={<Input id="name-simple" />}
        >
          {this.props.paymentPeriods.map((pp, idx) => {
            return (
              <MenuItem value={pp.id} key={idx}>
                {pp.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );

    const firstPaymentDateForm = (
      <FormControl style={{ width: "32%", margin: "5px 0px" }}>
        <TextField
          id="date"
          label="Pierwsza wypłata"
          value={this.state.paymentDate}
          onChange={this.handleChange("paymentDate")}
          type="date"
          error={this.state.underValidation && this.state.paymentDate === ""}
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormControl>
    );

    const provinceForm = (
      <FormControl
        style={{ width: "49%", margin: "5px 0px" }}
        error={this.state.underValidation && !this.validateProvince()}
      >
        <InputLabel htmlFor="name-simple">Województwo</InputLabel>
        <Select
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
    );

    const cityForm = (
      <FormControl
        style={{ width: "49%", margin: "5px 0px 5px auto" }}
        error={this.state.underValidation && !this.validateCity()}
      >
        <InputLabel htmlFor="name-simple">Miasto</InputLabel>
        <Select
          disabled={this.state.cityDisabled}
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
    );

    const checkboxMoneyIncludesList = this.props.moneyIncludes.map(
      (moneyInclude, idx) => (
        <FormControl fullWidth key={idx}>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.moneyIncludes.includes(moneyInclude.id)}
                onChange={(e, val) => {
                  this.setState(state => ({
                    ...state,
                    moneyIncludes: val
                      ? state.moneyIncludes.concat(moneyInclude.id)
                      : state.moneyIncludes.filter(x => x !== moneyInclude.id)
                  }));
                }}
              />
            }
            label={moneyInclude.name}
          />
        </FormControl>
      )
    );

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        style={{ minWidth: "450px" }}
      >
        <DialogTitle>Dodaj dziecko</DialogTitle>
        <DialogContent>
          <form style={{ display: "flex", flexWrap: "wrap" }}>
            {nameForm}
            {ageForm}
            {schoolTypeForm}
            {quotaForm}
            {paymentPeriodForm}
            {firstPaymentDateForm}
            {provinceForm}
            {cityForm}

            <Divider />
            <Divider />
            <Divider />
            {checkboxMoneyIncludesList}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.cancelForm} color="primary">
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
export default connect(mapStateToProps)(KidsFormDialog);
