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
import { getParams, getParamsHeader } from "../../../utils/index";
import Spinner from "react-native-loading-spinner-overlay";

import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";
import { navigate, goBack, showPicker } from "utils/navigate";

import { Row } from "components/ui";

export default class ObjectAdd extends Component {
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
    this.props.navigation.setParams({ onPressHeader: this.onPressHeader });
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
    this.setState({ branch: branch });
    goBack();
  };

  render() {
    var { data, onDel, isBranch, isDep } = getParams(this.props);

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
            borderBottomWidth: 0.5,
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

        {isBranch && (
          <View
            style={{
              backgroundColor: "white",
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingLeft: 15,
              paddingRight: 10,
              fontSize: 16,
              borderBottomWidth: 0.5,
              alignItems: "center",
            }}
          >
            <Row style={{ width: 70 }}>
              <View style={{ paddingRight: 10 }}>
                <Icon name="rectangle" size={5} color="red" />
              </View>
              <Text>Địa chỉ:</Text>
            </Row>

            <TextInput
              style={{ height: 40, fontSize: 14, paddingLeft: 30 }}
              placeholder="Địa chỉ"
              onChangeText={(text) => this.setState({ address: text })}
              value={this.state.address}
            />
          </View>
        )}

        {isDep && (
          <View
            style={{
              backgroundColor: "white",
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingLeft: 15,
              paddingRight: 10,
              padding: 10,
              fontSize: 16,
              borderBottomWidth: 0.5,
              alignItems: "center",
            }}
          >
            <Row style={{ width: 100 }}>
              <View style={{ paddingRight: 10 }}>
                <Icon name="rectangle" size={5} color="red" />
              </View>
              <Text>Phòng ban:</Text>
            </Row>

            <TouchableOpacity
              onPress={() =>
                showPicker({
                  onSelection: this.onSelectBranch,
                  multiple: false,
                  selectedOptions: [this.state.branch],
                  apiUrl: `${configs.apiUrl}branch/list`,
                })
              }
            >
              <Text>
                {this.state.branch.name
                  ? this.state.branch.name
                  : "Chọn chi nhánh"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingLeft: 10,
            paddingBottom: 80,
            paddingRight: 10,
            fontSize: 16,
            borderBottomWidth: 0.5,
            alignItems: "center",
          }}
        >
          <Text style={{ width: 75, paddingLeft: 10 }}>Ghi chú:</Text>

          <TextInput
            style={{ fontSize: 14, flex: 0.9, paddingLeft: 30 }}
            placeholder="Ghi chú"
            onChangeText={(note) => this.setState({ note })}
            value={this.state.note}
            multiline={true}
            numberOfLines={4}
          />
        </View>
      </View>
    );
  }
}
