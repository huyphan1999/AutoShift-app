import React, { Component } from "react";
import { View } from "react-native";
import styles from "./styles";

export default class Row extends Component {
  render() {
    const { children, style, ...els } = this.props;
    const styleProps = {
      flexDirection: "row",
      alignItems: "center",
      ...style,
    };
    console.log(styleProps);

    return (
      <View style={styleProps} {...els}>
        {children}
      </View>
    );
  }
}
