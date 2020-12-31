import React, { Component } from "react";
import { Radio, Text, View } from "native-base";
import styles from "./styles";
import { TouchableOpacity } from "react-native";

export default class RadioText extends Component {
  render() {
    const { title, onPress, checked, value } = this.props;

    console.log(this.props);

    return (
      <TouchableOpacity onPress={() => onPress(value)}>
        <View style={styles.radio}>
          <Radio
            style={{ marginRight: 5 }}
            selected={checked == value}
            color="blue"
          />
          <Text>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
