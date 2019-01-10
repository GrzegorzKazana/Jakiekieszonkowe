import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import FaqQuestion from "./FaqQuestion";
import { getFaq } from "./FaqQuestionDatabase";

export default class FaqDialog extends React.Component {
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
          <DialogTitle id="scroll-dialog-title">
            Najczęściej zadawane pytania
          </DialogTitle>
          <DialogContent>
            {getFaq().map((item, idx) => (
              <FaqQuestion
                key={idx}
                question={item.q}
                answer={item.a}
                index={idx + 1}
              />
            ))}
          </DialogContent>
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
