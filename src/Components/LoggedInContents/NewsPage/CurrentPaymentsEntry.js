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
                <TableCell>Imię dziecka</TableCell>
                <TableCell numeric>Kwota (zł)</TableCell>
                <TableCell>Poprzednia wypłata</TableCell>
                <TableCell>Nadchodząca wypłata</TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {kidsArray.map((kid, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell>{kid.name}</TableCell>
                  <TableCell numeric>{kid.quota}</TableCell>
                  <TableCell>{kid.prevPaymentDate}</TableCell>
                  <TableCell>{kid.nextPaymentDate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </PageEntry>
    );
  }
}
