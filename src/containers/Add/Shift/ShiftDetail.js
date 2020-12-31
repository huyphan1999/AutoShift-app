import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";
import { CheckBox, Divider } from "react-native-elements";
import { connect } from "react-redux";
import { navigate } from "../../../utils/navigate";
import { getParams, getParamsHeader } from "../../../utils/index";

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
      id: "",
      title: "",
      timeStart: "",
      timeEnd: "",
      branch: "",
      uptime: [false, false, false, false, false, false, false],
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
        <Text style={{ color: "white", fontSize: 18, paddingLeft: 40 }}>
          {getParamsHeader(navigation).onDel ? "Lưu" : "Tạo"}
        </Text>
      </TouchableOpacity>
    ),
    headerTitle: () => (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 18, paddingLeft: 40 }}>
          {getParamsHeader(navigation).onDel ? "Ca" : "Tạo ca"}
        </Text>
      </View>
    ),
  });

  handleCheck = (id) => {
    this.state.uptime[id] = !this.state.uptime[id];
    this.forceUpdate();
  };

  onSelectBranch = (selectedBranch) => {
    console.log("Callback success");
    this.setState({ branch: [...selectedBranch] });
  };

  handleTextInput = (text, field) => {
    this.setState({ [field]: text });
  };

  render() {
    var { onDel, data } = getParams(this.props);

    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <Text
              style={{
                fontSize: 18,
                backgroundColor: "#e3e7eb",
                padding: 20,
                borderBottomWidth: 0.2,
              }}
            >
              TẠO CA
            </Text>

            <View
              style={{
                backgroundColor: "white",
                padding: 10,
                paddingLeft: 16,
                flexDirection: "row",
                fontSize: 16,
                borderBottomWidth: 0.5,
                alignItems: "center",
              }}
            >
              <Text style={{ width: 90 }}>Tên ca</Text>
              <TextInput
                style={{ height: 40, fontSize: 14, paddingLeft: 30 }}
                onChangeText={(title) => this.handleTextInput(title, "title")}
                value={this.state.title}
                placeholder="Tên ca"
              />
            </View>

            <View
              style={{
                backgroundColor: "white",
                padding: 10,
                paddingLeft: 16,
                flexDirection: "row",
                fontSize: 16,
                borderBottomWidth: 0.5,
                alignItems: "center",
              }}
            >
              <Text style={{ width: 90 }}>Mã ca</Text>
              <TextInput
                style={{ height: 40, fontSize: 14, paddingLeft: 30 }}
                onChangeText={(id) => this.handleTextInput(title, "id")}
                value={this.state.id}
                placeholder="Mã ca"
              />
            </View>

            <View
              style={{
                backgroundColor: "white",
                padding: 10,
                paddingLeft: 16,
                flexDirection: "row",
                fontSize: 16,
                borderBottomWidth: 0.5,
                alignItems: "center",
              }}
            >
              <Text style={{ width: 90 }}>Bắt đầu</Text>
              <TextInput
                style={{ height: 40, fontSize: 14, paddingLeft: 30 }}
                onChangeText={(timeStart) =>
                  this.handleTextInput(timeStart, "timeStart")
                }
                value={this.state.timeStart}
                placeholder="Thời gian vào"
              />
            </View>

            <View
              style={{
                backgroundColor: "white",
                padding: 10,
                paddingLeft: 16,
                flexDirection: "row",
                fontSize: 16,
                borderBottomWidth: 0.5,
                alignItems: "center",
              }}
            >
              <Text style={{ width: 90 }}>Kết thúc</Text>
              <TextInput
                style={{ height: 40, fontSize: 14, paddingLeft: 30 }}
                onChangeText={(timeEnd) =>
                  this.handleTextInput(timeEnd, "timeEnd")
                }
                value={this.state.timeEnd}
                placeholder="Thời gian ra"
              />
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <Text
              style={{
                fontSize: 18,
                backgroundColor: "#e3e7eb",
                padding: 20,
                borderBottomWidth: 0.8,
              }}
            >
              PHÂN CA
            </Text>
            <View
              style={{
                padding: 12,
                fontSize: 16,
                flexDirection: "row",
              }}
            >
              <Text style={{ width: 90 }}> Chi nhánh :</Text>
              <TouchableOpacity
                onPress={() =>
                  navigate("MultiSelect", {
                    onSelection: (selectedBranch) =>
                      this.onSelectBranch(selectedBranch),
                    options: DATA,
                  })
                }
                style={{ flex: 1, maxWidth: 200 }}
              >
                <Text style={{ paddingLeft: 30 }}>
                  {this.state.branch.toString()}
                </Text>
              </TouchableOpacity>
            </View>
            <Divider
              style={{ backgroundColor: "black", height: 0.5, marginLeft: 12 }}
            />

            <View
              style={{
                padding: 12,
                fontSize: 16,
                flexDirection: "row",
              }}
            >
              <Text style={{ width: 90 }}> Phòng ban :</Text>
              <TouchableOpacity
                onPress={() =>
                  navigate("MultiSelect", {
                    onSelection: (selectedBranch) =>
                      this.onSelectBranch(selectedBranch),
                    options: DATA,
                  })
                }
                style={{ flex: 1, maxWidth: 200 }}
              >
                <Text style={{ paddingLeft: 30 }}>
                  {this.state.branch.toString()}
                </Text>
              </TouchableOpacity>
            </View>
            <Divider
              style={{ backgroundColor: "black", height: 1, marginLeft: 12 }}
            />

            <View
              style={{
                padding: 12,
                fontSize: 16,
                flexDirection: "row",
              }}
            >
              <Text style={{ width: 90 }}> Chức vụ :</Text>
              <TouchableOpacity
                onPress={() =>
                  navigate("MultiSelect", {
                    onSelection: (selectedBranch) =>
                      this.onSelectBranch(selectedBranch),
                    options: DATA,
                  })
                }
                style={{ flex: 1, maxWidth: 200 }}
              >
                <Text style={{ paddingLeft: 30 }}>
                  {this.state.branch.toString()}
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={{ marginLeft: 10, borderWidth: 0.5, borderLeftWidth: 0 }}
            >
              Thời gian hoạt động của ca
            </Text>
            <View style={{ flexDirection: "row" }}>
              <CheckBox
                center
                size={22}
                checked={this.state.uptime[0]}
                onPress={() => this.handleCheck(0)}
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
                checked={this.state.uptime[1]}
                onPress={() => this.handleCheck(1)}
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
                checked={this.state.uptime[2]}
                onPress={() => this.handleCheck(2)}
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
                checked={this.state.uptime[3]}
                onPress={() => this.handleCheck(3)}
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
                checked={this.state.uptime[4]}
                onPress={() => this.handleCheck(4)}
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
                checked={this.state.uptime[5]}
                onPress={() => this.handleCheck(5)}
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
                checked={this.state.uptime[6]}
                onPress={() => this.handleCheck(6)}
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
          <View style={{ flex: 1, backgroundColor: "#e6e6e6", paddingTop: 40 }}>
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
      </ScrollView>
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
