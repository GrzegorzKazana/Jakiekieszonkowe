import React from "react";
import NewsPage from "./NewsPage/NewsPage";
import KidsPage from "./KidsPage/KidsPage";
import SettingsPage from "./SettingsPage/SettingsPage";
import NavBar from "./NavBar";
import StatMap from "./MapPage/MapPage";
import { connect } from "react-redux";
import { logOut } from "../../Actions/UserInfoActions";
import { logOutUser } from "../../Common/MockApiConnections/UserApi";
import { logOutUser as logOutUserRealApi } from "../../Common/RealApiConnections/UserApi";

const mapStateToProps = state => ({
  ...state.userInfo
});
class ContentLoggedIn extends React.Component {
  state = {
    selectedPageContent: 0
  };

  handleTabChange = (event, selectedPageContent) => {
    this.setState({ selectedPageContent });
  };

  handleLogOut = () => {
    this.props.dispatch(logOut());
    // logOutUser(this.props.token);
    logOutUserRealApi(this.props.token);
  };

  render() {
    const { selectedPageContent } = this.state;
    const contentStyle = {
      width: "100%",
      flex: "1",
      display: "flex",
      flexDirection: "column"
    };
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <NavBar
          userEmail={this.props.userData.email}
          onTabChange={this.handleTabChange}
          onLogOut={this.handleLogOut}
          selectedPageContent={selectedPageContent}
        />
        {selectedPageContent === 0 && <NewsPage style={contentStyle} />}
        {selectedPageContent === 1 && <KidsPage style={contentStyle} />}
        {selectedPageContent === 2 && <StatMap style={contentStyle} />}
        {selectedPageContent === 3 && <SettingsPage style={contentStyle} />}
      </div>
    );
  }
}
export default connect(mapStateToProps)(ContentLoggedIn);
