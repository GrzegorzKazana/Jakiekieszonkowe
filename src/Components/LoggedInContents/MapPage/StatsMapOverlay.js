import React from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";

export default class StatsMapOverlay extends React.Component {
  render() {
    const { stats } = this.props;
    return (
      <Paper style={{ ...this.props.style, padding: "16px" }}>
        <Typography variant="h4" color="textSecondary">
          {stats ? stats.name : "---"}
        </Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={{ padding: "5px 0px" }}>
                <Typography variant="subtitle1">
                  Średnie kieszonkowe:
                </Typography>
              </TableCell>
              <TableCell numeric style={{ padding: "5px 0px" }}>
                <Typography variant="h6">
                  {stats ? stats.avg.toFixed(2) : "---"}zł
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ padding: "5px 0px" }}>
                <Typography variant="subtitle1">
                  Odchylenie standardowe:
                </Typography>
              </TableCell>
              <TableCell numeric style={{ padding: "5px 0px" }}>
                <Typography variant="h6">
                  {stats ? stats.std.toFixed(2) : "---"}zł
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ padding: "5px 0px" }}>
                <Typography variant="subtitle1">Ilość użytkowników:</Typography>
              </TableCell>
              <TableCell numeric style={{ padding: "5px 0px" }}>
                <Typography variant="h6">
                  {stats ? stats.count : "---"}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
