import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl
} from "@material-ui/core";

export default class DictionaryRowInputDialog extends React.Component {
  constructor(props) {
    super();
    this.state = {
      ...props.prefill
    };
  }

  dictRowIsValid = () => {
    // is valid when form values are not "", except id which can be "" when adding new dict row
    return Object.entries(this.state).reduce(
      (isCorrect, [currKey, currVal]) =>
        isCorrect ? (currKey === "id" ? true : currVal !== "") : false,
      true
    );
  };

  checkAndSubmitForm = () => {
    if (this.dictRowIsValid()) {
      this.props.onSubmit(this.state);
    }
  };

  render() {
    const { open } = this.props;
    const { onClose } = this.props;
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={onClose}
      >
        <DialogTitle>Wprowadź rekord słownika</DialogTitle>
        <DialogContent>
          <form style={{ display: "flex", flexWrap: "wrap" }}>
            {Object.entries(this.state).map(([key, val], idx) => (
              <FormControl margin="dense" required fullWidth key={idx}>
                <TextField
                  disabled={key === "id"}
                  label={key}
                  value={val}
                  type="text"
                  fullWidth
                  onChange={e => {
                    this.setState({ [key]: e.target.value });
                  }}
                />
              </FormControl>
            ))}
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
