import React from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  IconButton
} from "@material-ui/core";
import { Help } from "@material-ui/icons";

export default class StatsMapOverlay extends React.Component {
  render() {
    const { stats } = this.props;
    const helpChip = (
      <Tooltip
        title="<h6>Dane prezentowane w przeliczeniu na miesiąc</h6>"
        placement="left"
      >
        <IconButton aria-label="Info">
          <Help />
        </IconButton>
      </Tooltip>
    );
    return (
      <Paper style={{ ...this.props.style, padding: "16px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography variant="h4" color="textSecondary">
            {stats ? stats.name : "---"}
          </Typography>
          {helpChip}
        </div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={{ padding: "5px 0px" }}>
                <Typography variant="subtitle1">
                  Średnie kieszonkowe:&nbsp;
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
                  Odchylenie standardowe:&nbsp;
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
                <Typography variant="subtitle1">
                  Ilość użytkowników:&nbsp;
                </Typography>
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
