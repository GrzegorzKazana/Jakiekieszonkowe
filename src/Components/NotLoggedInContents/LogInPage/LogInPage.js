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
    return (
      <div>
        <Button
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
        </Button>
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
    );
  }
}
