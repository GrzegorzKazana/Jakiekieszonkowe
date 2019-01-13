import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from "@material-ui/core";
import PageEntry from "../../Common/PageEntry";

export default class NewsEntry extends React.Component {
  render() {
    const { kidsArray } = this.props;
    const tableCellStyle = {
      fontSize: "12pt"
    };
    return (
      <PageEntry
        title="Bieżące wypłaty"
        subtitle={
          kidsArray.length === 0 &&
          "Tutaj pojawią się informacje o wypłatach kieszonkowych."
        }
      >
        <Table>
          {kidsArray.length > 0 && (
            <TableHead>
              <TableRow>
                <TableCell style={tableCellStyle}>Imię dziecka</TableCell>
                <TableCell numeric style={tableCellStyle}>
                  Kwota (zł)
                </TableCell>
                <TableCell numeric style={tableCellStyle}>
                  Poprzednia wypłata
                </TableCell>
                <TableCell numeric style={tableCellStyle}>
                  Nadchodząca wypłata
                </TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {kidsArray.map((kid, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell style={tableCellStyle}>{kid.name}</TableCell>
                  <TableCell numeric style={tableCellStyle}>
                    {kid.quota}
                  </TableCell>
                  <TableCell numeric style={tableCellStyle}>
                    {kid.prevPaymentDate}
                  </TableCell>
                  <TableCell numeric style={tableCellStyle}>
                    {kid.nextPaymentDate}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </PageEntry>
    );
  }
}
