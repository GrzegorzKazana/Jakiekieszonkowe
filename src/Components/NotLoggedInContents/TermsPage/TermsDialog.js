import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import { getTerms } from "./TermsAndAgreements";

export default class TermsDialog extends React.Component {
  render() {
    const { open } = this.props;
    const { onClose } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={onClose}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Regulamin</DialogTitle>
          <DialogContent>{getTerms()}</DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
