import React from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import LogInForm from "./LogInForm";
import SignInForm from "./SignInForm";
import FaqDialog from "../FaqPage/FaqDialog";

export default class LogInPage extends React.Component {
  state = {
    logInPage: true,
    signInPage: false,
    faqOpen: false
  };

  changeLogInToSignIn = () => {
    this.setState({ logInPage: false, signInPage: true });
  };

  changeSignInToLogIn = () => {
    this.setState({ logInPage: true, signInPage: false });
  };

  handleOpenFaq = () => {
    this.setState({ faqOpen: true });
  };

  handleCloseFaq = () => {
    this.setState({ faqOpen: false });
  };

  render() {
    const welcomeSection = (
      <div
        style={{
          height: "100%",
          display: "flex",
          // flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            margin: "40px",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <div>
            <Typography variant="h4">Witaj w serwisie</Typography>
            <Typography variant="h3">
              <b>JakieKieszonkowe.pl</b>
            </Typography>
            <Typography variant="h4" component="p">
              Dowiedz się, jakie kieszonkowe
              <br /> jest właściwe dla twojego dziecka
            </Typography>
            <Button
              variant="outlined"
              style={{ margin: "10px 0px", padding: "15px" }}
              onClick={this.handleOpenFaq}
            >
              Najczęściej zadawane pytania
            </Button>
          </div>
        </div>
      </div>
    );
    return (
      <div
        style={{
          // backgroundImage: `url(${BackgroudFrontImage})`,
          backgroundColor: `rgba(0,0,0,0.3)`,
          display: "flex",
          flexWrap: "wrap",
          flex: "1",
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "flex-start"
        }}
      >
        <div style={{ flexGrow: 1, backgroundColor: `rgba(255,255,255,0.3)` }}>
          {welcomeSection}
        </div>
        <div style={{ flexGrow: 1, backgroundColor: `rgba(0,0,0,0.1)` }}>
          {/* <Button
            variant="text"
            color="inherit"
            size="large"
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              fontSize: "32px"
            }}
            onClick={this.handleOpenFaq}
          >
            <Typography variant="h2" color="textSecondary">
              FAQ
            </Typography>
          </Button> */}
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ height: "100vh" }}
          >
            <Grid
              item
              style={{
                height: "525px",
                width: "400px",
                minHeight: "525px",
                minWidth: "400px"
              }}
            >
              {this.state.logInPage && (
                <LogInForm onRegisterClick={this.changeLogInToSignIn} />
              )}
              {this.state.signInPage && (
                <SignInForm onCancel={this.changeSignInToLogIn} />
              )}
            </Grid>
          </Grid>
          <FaqDialog open={this.state.faqOpen} onClose={this.handleCloseFaq} />
        </div>
      </div>
    );
  }
}
