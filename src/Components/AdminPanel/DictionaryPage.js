import React from "react";
import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  IconButton,
  Button
} from "@material-ui/core";
import { Edit, Delete, Add } from "@material-ui/icons";
import ConfirmDialog from "./../Common/ConfirmDialog";
import {
  dictionaryChange,
  dictionaryRowDelete
} from "./../../Common/MockApiConnections/AdminApi";
import DictionaryRowInputDialog from "./DictionaryRowInputDialog";

export default class DictionaryPage extends React.Component {
  state = {
    confirmDialogOpen: false,
    selectedDictionaryRow: null,
    inputDialogOpen: false
  };

  submitDelete = () => {
    dictionaryRowDelete(this.state.selectedDictionaryRow.id);
    this.setState({ confirmDialogOpen: false, selectedDictionaryRow: null });
  };

  closeInputDialog = () => {
    this.setState({ inputDialogOpen: false, selectedDictionaryRow: null });
  };

  submitInput = data => {
    this.closeInputDialog();
    dictionaryChange(data);
  };

  render() {
    const { dictionary } = this.props;
    const columnNames = Object.keys(dictionary[0]);
    return (
      <Paper style={{ width: "100%", height: "100%" }}>
        <div
          style={{
            height: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch"
          }}
        >
          <Typography variant="h3" style={{ padding: "16px" }}>
            {this.props.title}
          </Typography>
          <div style={{ padding: "0px 16px" }}>
            <Divider />
          </div>
          <div
            style={{
              padding: "0px 16px",
              overflow: "auto",
              flexGrow: "1"
              // margin: "0px 0px 128px 0px"
            }}
          >
            <Table>
              <colgroup>
                <col style={{ width: "15%" }} />
                {columnNames
                  .slice(0, columnNames.length - 1)
                  .map((name, idx) => (
                    <col key={idx} />
                  ))}
                <col style={{ width: "100px" }} />
              </colgroup>
              <TableHead>
                <TableRow>
                  {columnNames.map((name, idx) => (
                    <TableCell key={idx}>
                      <Typography variant="subtitle1">{name}</Typography>
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {dictionary.map((dictRow, idx) => (
                  <TableRow key={idx}>
                    {Object.keys(dictRow).map((key, idx) => (
                      <TableCell key={idx}>{dictRow[key]}</TableCell>
                    ))}
                    <TableCell style={{ padding: "0px" }}>
                      <IconButton
                        onClick={() =>
                          this.setState({
                            inputDialogOpen: true,
                            selectedDictionaryRow: dictRow
                          })
                        }
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          this.setState({
                            confirmDialogOpen: true,
                            selectedDictionaryRow: dictRow
                          })
                        }
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div style={{ padding: "0px 16px" }}>
            <Divider />
          </div>
          <div>
            <Button
              variant="contained"
              color="secondary"
              style={{ float: "right", margin: "16px 32px" }}
              onClick={() => this.setState({ inputDialogOpen: true })}
            >
              Dodaj
              <Add />
            </Button>
          </div>
        </div>
        <ConfirmDialog
          open={this.state.confirmDialogOpen}
          title="Definitywnie?"
          text="Operacja usunięcia nie może być cofnięta oraz spowoduje usunięcię obiektów zależnych."
          onCancel={() =>
            this.setState({
              confirmDialogOpen: false,
              selectedDictionaryRow: null
            })
          }
          onConfirm={this.submitDelete}
        />
        {this.state.inputDialogOpen && (
          <DictionaryRowInputDialog
            open={this.state.inputDialogOpen}
            onClose={this.closeInputDialog}
            onSubmit={this.submitInput}
            prefill={
              this.state.selectedDictionaryRow !== null
                ? this.state.selectedDictionaryRow
                : columnNames.reduce(
                    (prev, curr) => ({ ...prev, [curr]: "" }),
                    {}
                  )
            }
          />
        )}
      </Paper>
    );
  }
}
