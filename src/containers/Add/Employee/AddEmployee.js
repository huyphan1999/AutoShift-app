/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";

import {
  Container,
  Content,
  List,
  ListItem,
  Separator,
  Icon,
  Text,
  Left,
  Right,
  Thumbnail,
  Input,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Radio, Picker, Row } from "components/ui";

import moment from "moment";
import { Avatar } from "react-native-elements";
import { getParams, getParamsHeader } from "../../../utils";

import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";
import { navigate, goBack, showPicker } from "utils/navigate";

export default class AddEmployee extends Component {
  constructor(props) {
    super(props);
    console.log("EmpInfor View");
    console.log(this.props);
    this.state = {
      date: new Date(),
      mode: "date",
      show: false,
    };
  }

  handleTextInput = (value, key) => {
    this.setState({ [key]: value });
  };

  componentDidMount = () => {
    this.props.navigation.setParams({ onPressHeader: this.onPressHeader });
    this.setState(getParams(this.props).data);
  };

  onPressHeader = () => {
    console.log("onPressed Header");
    getParams(this.props).onPress(this.state);
  };

  static navigationOptions = ({ navigation }) => {
    const params = getParamsHeader(navigation);

    console.log(`Params: ${params}`);
    return {
      headerRight: (
        <TouchableOpacity onPress={() => params.onPressHeader()}>
          <Text style={{ color: "white", fontSize: 18 }}>Save</Text>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>
            Quản lý tài khoản
          </Text>
        </View>
      ),
    };
  };

  setDate = (event, date) => {
    date = date || this.state.date;
    this.setState({
      show: Platform.OS === "ios" ? true : false,
      date,
    });
  };

  show = (mode) => {
    this.setState({
      show: true,
      mode,
    });
  };

  datepicker = () => {
    this.show("date");
  };

  timepicker = () => {
    this.show("time");
  };

  onSexRadioChange = (value) => {
    console.log("onSexRadioChange", value);
    this.setState({ sex: value });
  };

  onValueChange = (value) => {
    this.setState({ selected: value });
  };

  onSelectBranch = (branch) => {
    this.setState({ branch: branch, branch_id: branch.id });
    goBack();
  };

  onSelectDept = (dep) => {
    this.setState({ dep: dep, dep_id: dep.id });
    goBack();
  };

  render() {
    const { show, date, mode, data } = this.state;
    const dates = moment(this.state.date).format("DD-MM-YYYY");

    console.log(this.state);

    return (
      <Container>
        <Content>
          <View
            style={{
              flex: 1,
              backgroundColor: "#e3e7eb",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 10,
            }}
          >
            <Thumbnail
              style={{ height: 150, width: 150 }}
              source={require("../../image/admin.png")}
            />
          </View>
          <Separator group bordered>
            <Text>Thông tin cá nhân</Text>
          </Separator>
          {/* <ListItem>
            <Left>
              <Text>Mã NV</Text>
            </Left>
            <Right>
              <Input
                onChangeText={(text) => this.handleTextInput(text, "id")}
                style={styles.inputTxt}
                placeholder="Mã NV"
                value={this.state.id}
              />
            </Right>
          </ListItem> */}

          <ListItem>
            <Left>
              <Text>Họ tên</Text>
            </Left>
            <Right>
              <Input
                onChangeText={(text) => this.handleTextInput(text, "name")}
                style={styles.inputTxt}
                placeholder="Tên NV"
                value={this.state.name}
              />
            </Right>
          </ListItem>

          <ListItem>
            <Left>
              <Text>Giới tính</Text>
            </Left>
            <Right>
              <View style={styles.txtContent}>
                <Radio
                  title="Nam"
                  value="1"
                  checked={this.state.sex}
                  onPress={this.onSexRadioChange}
                />
                <Radio
                  title="Nữ"
                  value="0"
                  checked={this.state.sex}
                  onPress={this.onSexRadioChange}
                />
              </View>
            </Right>
          </ListItem>

          <ListItem>
            <Left>
              <Text>Địa chỉ</Text>
            </Left>
            <Right>
              <Input
                onChangeText={(text) => this.handleTextInput(text, "address")}
                style={styles.inputTxt}
                placeholder="Địa chỉ"
                value={this.state.address}
              />
            </Right>
          </ListItem>

          <ListItem>
            <Left>
              <Text>Ngày sinh</Text>
            </Left>
            <Right>
              <TouchableOpacity onPress={this.datepicker}>
                <Text>{dates}</Text>
              </TouchableOpacity>
            </Right>

            {show && (
              <DateTimePicker
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={this.setDate}
              />
            )}
          </ListItem>

          <ListItem last>
            <Left>
              <Text>Số điện thoại</Text>
            </Left>
            <Right>
              <Input
                onChangeText={(text) =>
                  this.handleTextInput(text, "phone_number")
                }
                style={styles.inputTxt}
                placeholder="SĐT"
                value={this.state.phone_number}
              />
            </Right>
          </ListItem>

          <Separator group bordered>
            <Text>Công ty</Text>
          </Separator>
          <ListItem>
            <Left>
              <Text>Phòng ban</Text>
            </Left>
            <Right>
              <Picker
                displayText={this.state.dep && this.state.dep.name}
                onSelection={this.onSelectDept}
                selectedOptions={[this.state.dep]}
                placeholder="Chọn phòng ban"
                multiple={false}
                route="dep/list"
              />
            </Right>
          </ListItem>
          <ListItem last>
            <Left>
              <Text>Chi nhánh</Text>
            </Left>
            <Right>
              <Picker
                displayText={this.state.branch && this.state.branch.name}
                onSelection={this.onSelectBranch}
                selectedOptions={[this.state.branch]}
                placeholder="Chọn chi nhánh"
                multiple={false}
                route="branch/list"
              />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  txtContent: {
    flexDirection: "row",
  },
  MainContainer: {
    flex: 1,
    backgroundColor: "#FFF8E1",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  txtInfo: {
    color: "#9c9c9c",
    fontSize: 16,
    textAlign: "auto",
    borderStyle: "solid",
  },

  inputTxt: {
    height: 30,
    padding: 0,
    fontSize: 14,
  },

  txtSperator: {
    fontSize: 20,
  },
  raido: {
    flexDirection: "row",
    marginRight: 5,
  },
});
