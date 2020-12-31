import React, { Component } from "react";

export default class Button extends Component {
  render() {
    const { children, ...els } = this.props;
    return (
      <TouchableOpacity delayLongPress={500} {...els}>
        {children}
      </TouchableOpacity>
    );
  }
}
