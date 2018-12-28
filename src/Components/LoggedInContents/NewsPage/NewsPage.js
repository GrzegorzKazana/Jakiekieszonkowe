import React from "react";
import Page from "../../Common/Page";
import NewsEntry from "./NewsEntry";
import CurrentPaymentsEntry from "./CurrentPaymentsEntry";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  ...state.userInfo
});
class NewsPage extends React.Component {
  render() {
    console.log(this.props.style);
    return (
      <Page style={this.props.style}>
        <NewsEntry lastLogInDate={this.props.userData.accountLastLogInDate} />
        <CurrentPaymentsEntry kidsArray={this.props.userKids} />
      </Page>
    );
  }
}
export default connect(mapStateToProps)(NewsPage);
