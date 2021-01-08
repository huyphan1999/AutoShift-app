import Icon from "react-native-vector-icons/FontAwesome5";
import React, { Component } from "react";
import { Text, View, TouchableOpacity, PermissionsAndroid } from "react-native";

import { connect } from "react-redux";

import { IN_REQUESTING } from "../../actionTypes/clock.actiontypes";
import { DotIndicator, MaterialIndicator } from "react-native-indicators";

import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";
import { navigate, goBack } from "utils/navigate";
import { getData } from "selectors";
import NetInfo from "@react-native-community/netinfo";

class Input_OutPut_Activity extends Component {
  static navigationOptions = () => ({
    headerTitle: () => (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 18 }}>Vào - Ra Ca</Text>
      </View>
    ),
  });

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.requestLocationPermission();
  }

  onClock = () => {
    this.props.dispatch(actions.clock());
  };

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Auto Shift Location Permission",
          message:
            "Auto Shift needs access to your location " +
            "to verify your clock",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      console.log("permission", granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        NetInfo.fetch().then((state) => {
          console.log("Connection type", state.type);
          console.log("Is connected?", state.isConnected);
        });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {this.props.isIn ? (
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={this.onClock}
          >
            <Icon name="user-clock" size={100} color="#ff4000" />
            <Text style={{ marginTop: 10 }}>Ra ca</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={this.onClock}
          >
            <Icon name="user-lock" size={100} color="#0bd967" />
            <Text style={{ margin: 10 }}>Vào ca</Text>
          </TouchableOpacity>
        )}
        {this.props.isLoading && (
          <View style={{ height: 15 }}>
            <DotIndicator color="green" />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isIn: getData(state, "user", "isIn"),
  isLoading: getData(state, "clock", "requesting"),
  clock: getData(state, "clock", "clock"),
});

export default connect(
  mapStateToProps,
  null
)(Input_OutPut_Activity);
