import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default class NotificationDialog extends React.Component {
  state = {
    kidId: "",
    notificationOverLap: "",
    underValidation: false,
    userDataLoaded: false
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (!prevState.userDataLoaded) {
      return {
        kidId: "",
        notificationOverLap: "",
        underValidation: false,
        userDataLoaded: true
      };
    }
    return prevState;
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  checkAndSubmitForm = () => {
    this.setState({ underValidation: true });
    if (!Object.values(this.state).some(o => o === "")) {
      const notification = {
        kidId: this.state.kidId,
        notificationOverLap: this.state.notificationOverLap
      };
      this.props.handleSubmit(notification);
      this.setState({ userDataLoaded: false });
    }
  };

  cancelForm = () => {
    this.setState({ userDataLoaded: false });
    this.props.handleClose();
  };

  render() {
    const { open } = this.props;
    const { user } = this.props;
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={this.cancelForm}
      >
        <DialogTitle>Dodaj powiadomienie</DialogTitle>
        <DialogContent>
          <form style={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl
              style={{ minWidth: 200, margin: 5 }}
              error={this.state.underValidation && this.state.kidId === ""}
            >
              <InputLabel htmlFor="name-simple">Imię</InputLabel>
              <Select
                value={this.state.kidId}
                onChange={this.handleChange("kidId")}
                input={<Input id="name-simple" />}
              >
                {user.kids.map((kid, idx) => (
                  <MenuItem value={kid.id} key={idx}>
                    {kid.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              style={{ minWidth: 200, margin: 5 }}
              error={
                this.state.underValidation &&
                this.state.notificationOverLap === ""
              }
            >
              <InputLabel htmlFor="overlap-simple">
                Wyprzedzenie (dni)
              </InputLabel>
              <Select
                value={this.state.notificationOverLap}
                onChange={this.handleChange("notificationOverLap")}
                input={<Input id="overlap-simple" />}
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
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
