import Icon from "react-native-vector-icons/FontAwesome5";
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
  StyleSheet,
  Alert,
  Platform,
  Text,
} from "react-native";

import { connect } from "react-redux";

import { IN_REQUESTING } from "../../actionTypes/clock.actiontypes";
import { DotIndicator, MaterialIndicator } from "react-native-indicators";
import Geolocation from "react-native-geolocation-service";
import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";
import { navigate, goBack } from "utils/navigate";
import { getData } from "selectors";
import NetInfo from "@react-native-community/netinfo";
import ShiftClockModal from "./ShiftClockModal";
import { Row } from "components/ui";
import { Button } from "native-base";

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
    this.state = { showClockModal: false, preLoading: false, listShift: [] };
  }

  componentDidMount() {
    this.getNetInfor();
    this.getLocation();
  }

  onClock = () => {
    const { selectedShift, netInfor } = this.state;

    console.log("onclock");

    let params = {
      netInfor: netInfor,
    };
    if (selectedShift && !this.props.isIn) {
      params.shift_id = selectedShift.id;
    }

    console.log("onClock", params);
    this.props.dispatch(actions.clock(params));
    this.setState({ preLoading: false, showClockModal: false });
  };

  onSelectShift = (shift, index) => {
    const { listShift } = this.state;
    listShift.map((shift) => (shift.checked = false));
    listShift[index].checked = true;
    this.setState({ selectedShift: shift, listShift });
  };

  validateWifiClock = (wifiClock) => {
    const { netInfor } = this.state;

    let bool = false;
    let deviceWifiId = netInfor.bssid;
    Array.isArray(wifiClock) &&
      wifiClock.map((wifi) => {
        if (wifi.bssid === deviceWifiId) {
          bool = true;
        }
      });
    return bool;
  };

  preClock = async () => {
    this.setState({ preLoading: true });
    const { netInfor, location } = this.state;
    const timekeep = {
      wifi: netInfor,
      location,
    };
    const res = await postRequest(`${configs.apiUrl}empclock/pre-clock`, {
      timekeep,
    });
    const { listShift, wifiClock } = res.data;

    console.log("preClock", wifiClock, netInfor);
    if (!this.validateWifiClock(wifiClock)) {
      const validSsid = this.renderValidSsid(wifiClock);
      Alert.alert(
        "Thông báo",
        "Kết nối sử dụng không hợp lệ bạn vẫn muốn tiếp tục vào ca ? " +
          validSsid,
        [
          { text: "Hủy", onPress: () => this.setState({ preLoading: false }) },
          { text: "Đồng ý", onPress: () => this.onClockConfirm(listShift) },
        ],
        { cancelable: false }
      );
    } else {
      this.onClockConfirm(listShift);
    }
  };

  onClockConfirm = (listShift) => {
    this.setState({
      showClockModal: true,
      listShift: listShift,
    });
  };

  getNetInfor = () => {
    NetInfo.fetch().then((state) => {
      console.log("Connection type", state);
      this.setState({ netInfor: state.details });
    });
  };

  getLocation = async () => {
    const hasPermission = await this.hasLocationPermission();
    if (hasPermission) {
      Geolocation.getCurrentPosition(
        (location) => {
          console.log(location);
          this.setState({ location });
          ToastAndroid.show(
            `Location ${location?.toString()} `,
            ToastAndroid.LONG
          );
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  };

  hasLocationPermission = async () => {
    if (Platform.OS === "ios") {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === "android" && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    console.log("hasPermission", hasPermission);

    if (hasPermission) {
      return true;
    }

    console.log("hasPermission request", hasPermission);

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        "Location permission denied by user.",
        ToastAndroid.LONG
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        "Location permission revoked by user.",
        ToastAndroid.LONG
      );
    }

    return false;
  };

  renderValidSsid = (wifiClock) => {
    let validSsid = "";
    wifiClock.map((wifi) => (validSsid += wifi.ssid + ","));
    if (validSsid) {
      validSsid = "Các kết nối hợp lệ " + validSsid;
    }
    return validSsid.slice(0, -1);
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

  closeModal = () => {
    this.setState({ showClockModal: false, preLoading: false });
  };

  render() {
    const { showClockModal, listShift, preLoading } = this.state;
    const { isIn, isLoading, clock } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {isIn ? (
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
            onPress={this.preClock}
          >
            <Icon name="user-lock" size={100} color="#0bd967" />
            <Text style={{ margin: 10 }}>Vào ca</Text>
          </TouchableOpacity>
        )}
        {isLoading || preLoading ? (
          <View style={{ height: 15 }}>
            <DotIndicator color="green" />
          </View>
        ) : null}
        {isIn && clock.shift ? (
          <Row>
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>{`${
              clock.shift.name
            } ( ${clock.shift.time} )`}</Text>
          </Row>
        ) : null}

        <ShiftClockModal
          isVisible={showClockModal}
          listShift={listShift}
          onSelect={this.onSelectShift}
          onClockIn={this.onClock}
          closeModal={this.closeModal}
        />
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
