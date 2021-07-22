import React, { Component } from "react";
import {
  StyleSheet,
  // Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  // TextInput,
} from "react-native";
import { CheckBox, Divider } from "react-native-elements";
import { connect } from "react-redux";
import {
  getParams,
  getParamsHeader,
  unsignedString,
} from "../../../utils/index";

import {
  Text,
  Input as TextInput,
  View,
  Container,
  Content,
} from "native-base";

import { Picker, TimePicker, Radio } from "components/ui";
import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";
import { navigate, goBack } from "utils/navigate";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "VP Công Ty",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Chi nhánh Phú Nhuận",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Chi nhánh Cần Thơ",
  },
];

class ShiftDetail extends Component {
  constructor(props) {
    super(props);
    var { data } = getParams(this.props);
    this.state = {
      assignments: [false, false, false, false, false, false, false],
      ...data,
    };
  }

  componentDidMount = () => {
    this.props.navigation.setParams({ onPressHeader: this.onPressHeader });
  };

  onPressHeader = () => {
    getParams(this.props).onPress(this.state);
  };

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity
        style={{ paddingRight: 15 }}
        onPress={() => getParamsHeader(navigation).onPressHeader()}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
          {getParamsHeader(navigation).onDel ? "" : "Tạo"}
        </Text>
      </TouchableOpacity>
    ),
    headerTitle: () => (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 18 }}>
          {getParamsHeader(navigation).onDel ? "Chi tiết ca" : "Tạo ca"}
        </Text>
      </View>
    ),
  });

  handleCheck = (id) => {
    this.state.assignments[id] = !this.state.assignments[id];
    this.forceUpdate();
  };

  onSelectBranch = (selectedBranches) => {
    console.log("Callback success");
    this.setState({
      branches: selectedBranches && [...selectedBranches],
      branch_ids:
        selectedBranches && selectedBranches.map((branch) => branch.id),
    });
  };

  onSelectDep = (selectedDeps) => {
    console.log("Callback success");
    this.setState({
      deps: selectedDeps && [...selectedDeps],
      dep_ids: selectedDeps && selectedDeps.map((dep) => dep.id),
    });
  };

  renderSelectedOptions = (selectedOptions) => {
    let displayText = "";

    for (let index = 0; index < selectedOptions.length; index++) {
      if (index < 3) {
        const opt = selectedOptions[index];
        displayText += "," + opt.name;
      } else {
        displayText += ", ...";
        break;
      }
    }
    return displayText.substring(1);
  };

  handleTextInput = (value, key) => {
    this.setState({ [key]: value });
  };

  handleNameInput = (value) => {
    const unsignedValue = unsignedString(value);
    this.setState({ name: value, key: unsignedValue.toUpperCase() });
  };

  onTypeRadioChange = (value) => {
    console.log("onSexRadioChange", value);
    this.setState({ is_OT: value });
  };

  render() {
    var { onDel, data } = getParams(this.props);

    return (
      <Container>
        <Content>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
              <Text
                style={{
                  fontSize: 18,
                  backgroundColor: "#e3e7eb",
                  padding: 20,
                }}
              >
                TẠO CA
              </Text>

              <View
                style={{
                  backgroundColor: "transparent",
                  padding: 10,
                  paddingLeft: 16,
                  flexDirection: "row",
                  fontSize: 16,
                  alignItems: "center",
                }}
              >
                <Text style={{ width: 90 }}>Tên ca</Text>
                <TextInput
                  style={{ fontSize: 14, paddingLeft: 30 }}
                  onChangeText={(text) => this.handleNameInput(text)}
                  value={this.state.name}
                  placeholder="Tên ca"
                />
              </View>

              <View
                style={{
                  backgroundColor: "transparent",
                  padding: 10,
                  paddingLeft: 16,
                  flexDirection: "row",
                  fontSize: 16,
                  alignItems: "center",
                }}
              >
                <Text style={{ width: 90 }}>Mã ca</Text>
                <TextInput
                  style={{ fontSize: 14, paddingLeft: 30 }}
                  onChangeText={(text) => this.handleTextInput(text, "key")}
                  value={this.state.key}
                  placeholder="Mã ca"
                />
              </View>

              <View
                style={{
                  backgroundColor: "transparent",
                  padding: 10,
                  paddingLeft: 16,
                  paddingVertical: 15,
                  flexDirection: "row",
                  fontSize: 16,
                  alignItems: "center",
                }}
              >
                <Text style={{ width: 90 }}>Bắt đầu</Text>

                <TimePicker
                  style={{ fontSize: 14, paddingLeft: 30 }}
                  value={this.state.timeBegin}
                  onChange={(date) => this.handleTextInput(date, "timeBegin")}
                  placeholder="Thời gian vào ca"
                />
              </View>

              <View
                style={{
                  backgroundColor: "black",
                  height: 0.5,
                  marginLeft: 16,
                }}
              />

              <View
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  paddingVertical: 15,
                  paddingLeft: 16,
                  flexDirection: "row",
                  fontSize: 16,
                  alignItems: "center",
                }}
              >
                <Text style={{ width: 90 }}>Kết thúc</Text>
                <TimePicker
                  style={{ fontSize: 14, paddingLeft: 30 }}
                  value={this.state.timeEnd}
                  onChange={(date) => this.handleTextInput(date, "timeEnd")}
                  placeholder="Thời gian ra ca"
                />
              </View>
            </View>
            <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
              <Text
                style={{
                  fontSize: 18,
                  backgroundColor: "#e3e7eb",
                  padding: 20,
                }}
              >
                PHÂN CA
              </Text>
              {/* <View
                style={{
                  padding: 12,
                  fontSize: 16,
                  flexDirection: "row",
                }}
              >
                <Text style={{ width: 120 }}> Chi nhánh :</Text>
                <Picker
                  displayText={
                    this.state.branches &&
                    this.renderSelectedOptions(this.state.branches)
                  }
                  onSelection={this.onSelectBranch}
                  selectedOptions={this.state.branches || []}
                  placeholder="Chọn chi nhánh"
                  multiple={true}
                  route="branch/list"
                />
              </View> */}
              <Divider
                style={{
                  backgroundColor: "black",
                  height: 0.25,
                  marginLeft: 12,
                }}
              />

              <View
                style={{
                  padding: 12,
                  fontSize: 16,
                  flexDirection: "row",
                }}
              >
                <Text style={{ width: 120 }}> Phòng ban :</Text>
                <Picker
                  displayText={
                    this.state.deps &&
                    this.renderSelectedOptions(this.state.deps)
                  }
                  onSelection={this.onSelectDep}
                  selectedOptions={this.state.deps || []}
                  placeholder="Chọn phòng ban"
                  multiple={true}
                  route="dep/list"
                />
              </View>

              <View
                style={{
                  padding: 12,
                  fontSize: 16,
                  flexDirection: "row",
                }}
              >
                <Text style={{ width: 120 }}> Ngày công :</Text>
                <TextInput
                  style={{
                    padding: 0,
                    fontSize: 16,
                    margin: 0,
                    marginLeft: -5,
                    maxHeight: 30,
                  }}
                  onChangeText={(text) =>
                    this.handleTextInput(text, "work_day")
                  }
                  value={this.state.workd_day}
                  placeholder="Số ngày công"
                />
              </View>

              <View
                style={{
                  padding: 12,
                  fontSize: 16,
                  flexDirection: "row",
                }}
              >
                <Text style={{ width: 120 }}> Loại ca :</Text>
                <Radio
                  title="Ca tăng ca"
                  value="1"
                  checked={this.state.is_OT}
                  onPress={this.onTypeRadioChange}
                />
                <Radio
                  title="Ca hành chính"
                  value="0"
                  checked={this.state.is_OT}
                  onPress={this.onTypeRadioChange}
                />
              </View>

              <Text
                style={{
                  marginLeft: 10,
                  borderBottomWidth: 0.75,
                  borderLeftWidth: 0,
                  padding: 10,
                  paddingLeft: 0,
                }}
              >
                Thời gian hoạt động của ca
              </Text>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <CheckBox
                  center
                  size={22}
                  checked={this.state.assignments[1]}
                  onPress={() => this.handleCheck(1)}
                  title="Thứ hai"
                  containerStyle={{
                    backgroundColor: "#ffffff",
                    borderWidth: 0,
                    padding: 0,
                  }}
                  textStyle={{ fontWeight: "normal", fontSize: 16 }}
                />
                <CheckBox
                  center
                  size={22}
                  checked={Boolean(Number(this.state.assignments[2]))}
                  onPress={() => this.handleCheck(2)}
                  title="Thứ Ba"
                  containerStyle={{
                    backgroundColor: "#ffffff",
                    borderWidth: 0,
                    padding: 0,
                    marginLeft: -8,
                  }}
                  textStyle={{ fontWeight: "normal", fontSize: 16 }}
                />
                <CheckBox
                  center
                  size={22}
                  checked={Boolean(Number(this.state.assignments[3]))}
                  onPress={() => this.handleCheck(3)}
                  title="Thứ tư"
                  containerStyle={{
                    backgroundColor: "#ffffff",
                    borderWidth: 0,
                    padding: 0,
                    marginLeft: -8,
                  }}
                  textStyle={{ fontWeight: "normal", fontSize: 16 }}
                />
                <CheckBox
                  center
                  size={22}
                  checked={Boolean(Number(this.state.assignments[4]))}
                  onPress={() => this.handleCheck(4)}
                  title="Thứ năm"
                  containerStyle={{
                    backgroundColor: "#ffffff",
                    borderWidth: 0,
                    padding: 0,
                    marginLeft: 0,
                    marginLeft: -8,
                  }}
                  textStyle={{ fontWeight: "normal", fontSize: 16 }}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <CheckBox
                  center
                  size={22}
                  checked={Boolean(Number(this.state.assignments[5]))}
                  onPress={() => this.handleCheck(5)}
                  title="Thứ sáu"
                  containerStyle={{
                    backgroundColor: "#ffffff",
                    borderWidth: 0,
                    padding: 0,
                  }}
                  textStyle={{ fontWeight: "normal", fontSize: 16 }}
                />
                <CheckBox
                  center
                  size={22}
                  checked={Boolean(Number(this.state.assignments[6]))}
                  onPress={() => this.handleCheck(6)}
                  title="Thứ bảy"
                  containerStyle={{
                    backgroundColor: "#ffffff",
                    borderWidth: 0,
                    padding: 0,
                    marginLeft: -12,
                  }}
                  textStyle={{ fontWeight: "normal", fontSize: 16 }}
                />
                <CheckBox
                  center
                  size={22}
                  checked={Boolean(Number(this.state.assignments[0]))}
                  onPress={() => this.handleCheck(0)}
                  title="Chủ nhật"
                  containerStyle={{
                    backgroundColor: "#ffffff",
                    borderWidth: 0,
                    padding: 0,
                    marginLeft: -14,
                  }}
                  textStyle={{ fontWeight: "normal", fontSize: 16 }}
                />
              </View>
            </View>
          </View>

          {onDel && (
            <View
              style={{ flex: 1, backgroundColor: "#e6e6e6", paddingTop: 40 }}
            >
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Thông báo",
                    "Bạn chắc chắn muốn xóa ?",
                    [
                      {
                        text: "Hủy",
                        onPress: () => console.log("Cancel Pressed!"),
                      },
                      { text: "Đồng ý", onPress: () => onDel(data.id) },
                    ],
                    { cancelable: false }
                  )
                }
              >
                <Text
                  style={{
                    color: "#db3b3b",
                    borderBottomWidth: 0.4,
                    borderTopWidth: 0.4,
                    backgroundColor: "#fcfcfc",
                    padding: 20,
                  }}
                >
                  Xóa
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  btnImage: {
    width: 120,
    height: 120,
  },

  txtContent: {
    padding: 12,
    fontSize: 16,
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default connect()(ShiftDetail);
