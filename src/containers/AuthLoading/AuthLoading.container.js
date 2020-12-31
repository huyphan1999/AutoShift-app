import React, { Component } from "react";
import AuthLoadingScreen from "./AuthLoading";
import { connect } from "react-redux";
import { getUserToken } from "../../selectors/index";

class AuthLoadingContainer extends AuthLoadingScreen {
  // componentDidUpdate() {
  //   this.props.navigation.navigate(this.props.token ? 'Home' : 'Auth');
  // }
}

const mapStateToProps = (state) => ({
  token: getUserToken(state),
  loading: state.app.appInitialized,
});

export default connect(
  mapStateToProps,
  null
)(AuthLoadingContainer);
