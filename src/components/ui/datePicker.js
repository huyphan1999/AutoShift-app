import React, { Component } from "react";
import { Text, Platform, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { View } from "react-native";

export default class Picker extends Component {
  state = {
    show: false,
    mode: "date",
    insideValue: new Date(),
  };
  show = () => {
    const { value } = this.props;
    this.setState({
      show: true,
      insideValue: value ? moment(value).toDate() : new Date(),
    });
  };

  onChangeValue = (e, date) => {
    const { onChange } = this.props;

    this.setState(
      {
        show: false,
        insideValue: date,
      },
      () => onChange(moment(date))
    );
  };
  render() {
    const { placeholder, style, value, format } = this.props;
    const { insideValue } = this.state;
    console.log("Pickerrrrrrrrr date state", this.state);
    console.log("Pickerrrrrrrrr date props", this.props);

    console.log("Pickerrrrrrrrr date value", value);
    if (value && value.format) {
      console.log("Pickerrrrrrrrr date value", value.format("L"));
    }
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.show();
          }}
          style={style}
        >
          <Text style={{ color: value ? "black" : "#575757" }}>
            {value
              ? format
                ? moment(value).format(format)
                : moment(value).format("DD/MM/YYYY")
              : placeholder}
          </Text>
        </TouchableOpacity>
        {this.state.show && (
          <DateTimePicker
            value={insideValue}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={this.onChangeValue}
          />
        )}
      </View>
    );
  }
}
