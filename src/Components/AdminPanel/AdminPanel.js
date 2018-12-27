import React from "react";
import { AppBar, Drawer, Grid } from "@material-ui/core";
import NavBarAdmin from "./NavBarAdmin";
import DrawerCustom from "../Common/DrawerCustomBeta2";
import AdminPanelDrawer from "./AdminPanelDrawer";
import DictionaryPage from "./DictionaryPage";
import { connect } from "react-redux";
import { logOut } from "../../Actions/UserInfoActions";
import { BorderColor } from "@material-ui/icons";

const mapStateToProps = state => ({
  ...state.userInfo,
  ...state.cityDictionary,
  ...state.provinceDictionary,
  ...state.paymentPeriodDictionary,
  ...state.schoolTypeDictionary,
  ...state.moneyIncludesDictionary
});
class AdminPanel extends React.Component {
  state = {
    selectedPageContent: 0
  };

  handleLogOut = () => {
    this.props.dispatch(logOut());
  };

  handlePageChange = selectedPageContent => {
    this.setState({ selectedPageContent });
    // console.log(selectedPageContent);
  };

  render() {
    const drawerWidth = "256px";
    const dictionaries = [
      { name: "Miasta", page: 0, content: this.props.cities },
      { name: "Województwa", page: 1, content: this.props.provinces },
      { name: "Rodzaje szkół", page: 2, content: this.props.schoolType },
      {
        name: "Bonusy kieszonkowego",
        page: 3,
        content: this.props.moneyIncludes
      },
      { name: "Okresy wypłat", page: 4, content: this.props.paymentPeriod }
    ];
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <NavBarAdmin
          onLogOut={this.handleLogOut}
          userEmail={this.props.user.email}
        />
        <div
          style={{
            display: "flex",
            flex: "1",
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "flex-start"
          }}
        >
          <div
            style={{
              width: drawerWidth,
              height: "100%",
              overflow: "auto",
              overflowX: "hidden",
              padding: "0px 2px"
            }}
          >
            <AdminPanelDrawer
              dictionaries={dictionaries}
              onPageSelected={this.handlePageChange}
            />
          </div>
          <div style={{ height: "100%", flexGrow: "1" }}>
            {this.state.selectedPageContent < dictionaries.length && (
              <DictionaryPage
                dictionary={
                  dictionaries[this.state.selectedPageContent].content
                }
                title={dictionaries[this.state.selectedPageContent].name}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(AdminPanel);
