import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Fontisto";
import { getParams, getParamsHeader } from "utils/index";
import Spinner from "react-native-loading-spinner-overlay";

import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";
import { navigate, goBack, showPicker } from "utils/navigate";
import { Picker } from "components/ui";

import { Row } from "components/ui";
import NetInfo from "@react-native-community/netinfo";

export default class WifiDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      note: "",
      spinner: false,
      branch: {},
    };
  }

  onPressHeader = () => {
    getParams(this.props).onPress(this.state);
  };

  componentDidMount = () => {
    console.log("Did mount");
    this.setState(getParams(this.props).data);

    this.props.navigation.setParams({ onPressHeader: this.onPressHeader });
    NetInfo.fetch().then((state) => {
      console.log("Connection type", state);
      this.setState({
        bssid: state.details.bssid,
        ssid: state.details.ssid || state.details.bssid,
      });
      console.log("Is connected?", state.isConnected);
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log("Did update");
  };

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity
        style={{ paddingRight: 15 }}
        onPress={() => getParamsHeader(navigation).onPressHeader()}
      >
        <Text style={{ color: "white", fontSize: 18, paddingLeft: 40 }}>
          TẠO
        </Text>
      </TouchableOpacity>
    ),
    headerTitle: () => (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 18, paddingLeft: 40 }}>
          TẠO MỚI
        </Text>
      </View>
    ),
  });

  onSelectBranch = (branch) => {
    this.setState({ branch: branch, branch_id: branch.id });
    goBack();
  };

  onSelectDept = (dep) => {
    this.setState({ dep: dep, dep_id: dep.id });
    goBack();
  };

  render() {
    console.log("Wifi", this.state);

    return (
      <View style={{ flex: 1, backgroundColor: "#e3e7eb" }}>
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingLeft: 15,
            paddingRight: 10,
            fontSize: 16,
            borderBottomWidth: 0.25,
            alignItems: "center",
          }}
        >
          <Row style={{ width: 70 }}>
            <View style={{ paddingRight: 10 }}>
              <Icon name="rectangle" size={5} color="red" />
            </View>
            <Text>Tên:</Text>
          </Row>

          <TextInput
            style={{ height: 40, fontSize: 14, paddingLeft: 30 }}
            placeholder="Tên"
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
          />
        </View>

        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingLeft: 15,
            paddingRight: 10,
            fontSize: 16,
            borderBottomWidth: 0.25,
            alignItems: "center",
          }}
        >
          <Row style={{ width: 70 }}>
            <View style={{ paddingRight: 10 }}>
              <Icon name="rectangle" size={5} color="red" />
            </View>
            <Text>BSSID:</Text>
          </Row>

          <TextInput
            style={{ height: 40, fontSize: 14, paddingLeft: 30 }}
            placeholder="Tên"
            onChangeText={(text) => this.setState({ bssid: text })}
            value={this.state.bssid}
          />
        </View>

        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingLeft: 15,
            paddingRight: 10,
            fontSize: 16,
            borderBottomWidth: 0.25,
            alignItems: "center",
          }}
        >
          <Row style={{ width: 70 }}>
            <View style={{ paddingRight: 10 }}>
              <Icon name="rectangle" size={5} color="red" />
            </View>
            <Text>SSID:</Text>
          </Row>

          <TextInput
            style={{ height: 40, fontSize: 14, paddingLeft: 30 }}
            placeholder="Tên"
            onChangeText={(text) => this.setState({ ssid: text })}
            value={this.state.ssid}
          />
        </View>

        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingLeft: 15,
            paddingRight: 10,
            padding: 10,
            fontSize: 16,
            borderBottomWidth: 0.25,
            alignItems: "center",
          }}
        >
          <Row style={{ width: 100 }}>
            <View style={{ paddingRight: 10 }}>
              <Icon name="rectangle" size={5} color="red" />
            </View>
            <Text>Chi nhánh:</Text>
          </Row>

          <Picker
            displayText={this.state.branch && this.state.branch.name}
            onSelection={this.onSelectBranch}
            selectedOptions={[this.state.branch]}
            placeholder="Chọn chi nhánh"
            multiple={false}
            route="branch/list"
          />
        </View>

        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingLeft: 15,
            paddingRight: 10,
            padding: 10,
            fontSize: 16,
            borderBottomWidth: 0.25,
            alignItems: "center",
          }}
        >
          <Row style={{ width: 100 }}>
            <View style={{ paddingRight: 10 }}>
              <Icon name="rectangle" size={5} color="red" />
            </View>
            <Text>Phòng ban:</Text>
          </Row>

          <Picker
            displayText={this.state.dep && this.state.dep.name}
            onSelection={this.onSelectDept}
            selectedOptions={[this.state.dep]}
            placeholder="Chọn phòng ban"
            multiple={false}
            route="dep/list"
          />
        </View>
      </View>
    );
  }
}
