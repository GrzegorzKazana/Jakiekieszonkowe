import React from "react";
import {
  InputLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  ...state.provinceDictionary,
  ...state.cityDictionary
});
class PersonalDataDialog extends React.Component {
  state = {
    province: "",
    city: "",
    provinceId: "",
    cityId: "",
    cityDisabled: true,
    underValidation: false,
    userDataLoaded: false
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (!prevState.userDataLoaded) {
      return {
        province: nextProps.userData.province,
        city: nextProps.userData.city,
        provinceId: nextProps.userData.provinceId,
        cityId: nextProps.userData.cityId,
        cityDisabled: false,
        underValidation: false,
        userDataLoaded: true
      };
    }
    return prevState;
  };

  checkAndSubmitForm = () => {
    this.setState({ underValidation: true });
    if (!this.validateProvince() || !this.validateCity()) {
      return;
    }
    const personalData = {
      province: this.state.province,
      city: this.state.city,
      provinceId: this.state.provinceId,
      cityId: this.state.cityId
    };
    this.setState({ userDataLoaded: false });
    this.props.onSubmit(personalData);
  };

  cancelForm = () => {
    this.setState({ userDataLoaded: false });
    this.props.onClose();
  };

  handleProvinceChange = event => {
    // console.log(event.target);
    const provinceIdx = event.target.value;
    const province = this.props.provinces.find(x => x.id === provinceIdx).name;
    this.setState({
      province: province,
      provinceId: provinceIdx,
      city: "",
      cityId: "",
      cityDisabled: false
    });
  };

  handleCityChange = event => {
    const cityIdx = event.target.value;
    const city = this.props.cities.find(x => x.id === cityIdx).name;
    this.setState({ city: city, cityId: cityIdx });
  };

  validateProvince = () =>
    this.state.province !== "" && this.state.provinceId !== "";
  validateCity = () => this.state.city !== "" && this.state.cityId !== "";

  render() {
    const { open } = this.props;
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={this.cancelForm}
      >
        <DialogTitle>Zmień dane</DialogTitle>
        <DialogContent>
          <form style={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl
              fullWidth
              margin="dense"
              style={{ minWidth: "360px" }}
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
            <FormControl
              fullWidth
              margin="dense"
              style={{ minWidth: "360px" }}
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
export default connect(mapStateToProps)(PersonalDataDialog);
