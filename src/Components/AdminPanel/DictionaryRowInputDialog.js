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

  checkAndSubmitForm = () => {
    this.props.onSubmit(this.state);
  };

  render() {
    const { open } = this.props;
    const { onClose } = this.props;
    const { onSubmit } = this.props;
    // const { prefill } = this.props;
    // console.log(prefill)
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
                  label={key}
                  value={val}
                  type="text"
                  //   autoFocus
                  fullWidth
                  onChange={e => {
                    this.setState({ [key]: e.target.value });
                  }}
                />
              </FormControl>
            ))}
            {/* <FormControl margin="dense" required fullWidth>
              <TextField
                label="Stare hasło"
                type="text"
                autoFocus
                fullWidth
                onChange={() => {}}
              />
            </FormControl> */}
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
