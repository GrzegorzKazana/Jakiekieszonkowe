import React from "react";
import PageEntry from "../../Common/PageEntry";

export default class NewsEntry extends React.Component {
  render() {
    const { lastLogInDate } = this.props;
    return (
      <PageEntry
        title="Aktualności"
        subtitle={
          <div>
            Witamy ponownie. Ostatnia wizyta miała miejsce{" "}
            <b>{lastLogInDate}</b> o godzinie <b>20:00</b>.
          </div>
        }
      />
    );
  }
}
