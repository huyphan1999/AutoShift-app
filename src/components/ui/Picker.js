import React, { Component } from "react";
import configs from "configs/server.config";
import { showPicker } from "utils/navigate";
import { TouchableOpacity, Text } from "react-native";

export default class Picker extends Component {
  render() {
    console.log("Pickerrrrrrrrr", this.props);
    const {
      displayText,
      route,
      selectedOptions,
      title,
      multiple,
      onSelection,
      placeholder,
      style,
    } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("onPressPicker", this.props);
          showPicker({
            onSelection: onSelection,
            multiple: multiple,
            selectedOptions: selectedOptions,
            apiUrl: `${configs.apiUrl}${route}`,
            title: title,
          });
        }}
      >
        <Text style={{ color: displayText ? "black" : "#575757" }}>
          {displayText ? displayText : placeholder}
        </Text>
      </TouchableOpacity>
    );
  }
}
