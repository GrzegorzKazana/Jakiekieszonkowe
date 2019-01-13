import React from "react";
import PageEntry from "../../Common/PageEntry";

export default class NewsEntry extends React.Component {
  render() {
    const { lastLogInDate } = this.props;
    const [date, hour] = lastLogInDate.split(";");
    return (
      <PageEntry
        title="Aktualności"
        subtitle={
          <div>
            Witamy ponownie. Ostatnia wizyta miała miejsce
            <b>{" " + date}</b>, o godzinie<b>{" " + hour.replace("-", ":")}</b>
            .
          </div>
        }
      />
    );
  }
}
