import React, { Component } from "react";
import { Button as NativeButton } from "native-base";
import styles from "./styles";

export default class Button extends Component {
  render() {
    const { children, ...els } = this.props;
    const buttonProps = { ...styles.button, ...els };

    return <NativeButton {...buttonProps}>{children}</NativeButton>;
  }
}
