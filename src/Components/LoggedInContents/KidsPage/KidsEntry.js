import React from "react";
import PageEntry from "../../Common/PageEntry";

export default class KidsEntry extends React.Component {
  render() {
    const { numberOfKids, firstKidDate } = this.props;
    return (
      <PageEntry
        title="Dzieci"
        subtitle={
          <div>
            Zarejestrowano wypłaty dla <b>{numberOfKids}</b> dzieci.
            {numberOfKids > 0 && "Dane gromadzone od "}
            <b>{numberOfKids > 0 && firstKidDate}</b>
            {numberOfKids > 0 && "."}
          </div>
        }
      />
    );
  }
}
