import React, { Component } from "react";
import { Text, Platform, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { View } from "react-native";

export default class TimePicker extends Component {
  state = {
    show: false,
    mode: "date",
    insideValue: new Date(),
  };
  show = () => {
    const { value } = this.props;
    this.setState({
      show: true,
      insideValue: value ? moment(value, "HH:mm").toDate() : new Date(),
    });
  };

  onChangeValue = (e, date) => {
    const { onChange } = this.props;
    console.log("onChangeValue TimePicker", date);

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
                ? moment(value, "HH:mm").format(format)
                : moment(value, "HH:mm").format("HH [giờ] : mm [phút]")
              : placeholder}
          </Text>
        </TouchableOpacity>
        {this.state.show && (
          <DateTimePicker
            value={insideValue}
            mode={"time"}
            is24Hour={true}
            display="spinner"
            minuteInterval={30}
            onChange={this.onChangeValue}
          />
        )}
      </View>
    );
  }
}
