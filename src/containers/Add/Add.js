/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { navigate } from "../../utils/navigate";
import { Avatar } from "react-native-elements";
class Choose extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 15,
          borderBottomWidth: 0.4,
        }}
        onPress={() => navigate(this.props.route)}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Icon
              name={this.props.iconName1}
              size={16}
              color="#27f591"
              style={styles.btnIcon}
            />
          </View>
          <View style={{ paddingLeft: 10, fontFamily: "Open Sans" }}>
            <Text>{this.props.txtName}</Text>
          </View>
        </View>

        <Icon
          name={this.props.iconName2}
          size={16}
          color="#aaafb3"
          style={{ paddingRight: 20 }}
        />
      </TouchableOpacity>
    );
  }
}
export default class Add extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity
        style={{ paddingRight: 15 }}
        onPress={() => navigation.navigate("Logout")}
      >
        <Image
          source={require("../image/service_logout.png")}
          style={{ width: 20, height: 20 }}
          tintColor="white"
        />
      </TouchableOpacity>
    ),
    headerTitle: () => (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 18, paddingLeft: 40 }}>
          Quản lý tài khoản
        </Text>
      </View>
    ),
  });

  //Callback
  /*onSave = data => {
    //this.props.dispatch()
    console.log('Add SAVE CALLBACK');
    console.log(data);
  };
*/
  render() {
    let role = "Nhân viên";
    let { user } = this.props;
    if (user.is_root) {
      role = "Quản lý";
    }
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: "#f5fcff",
          }}
        >
          <View
            style={{
              flex: 2,
              backgroundColor: "#e3e7eb",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 10,
            }}
          >
            <Avatar
              size={150}
              rounded
              onPress={() =>
                navigate("EmployeeInfo", {
                  data: user,
                  onPress: (data) => this.onSave(data),
                })
              }
              activeOpacity={0.7}
              containerStyle={{ flex: 2, marginLeft: 20 }}
              source={require("../image/admin.png")}
              showEditButton
            />

            <Text style={{ paddingTop: 10, fontSize: 18 }}>
              {this.props.user.full_name}
            </Text>
            <Text style={{ color: "#aaafb3", fontSize: 16 }}>
              {role} - {user.name}
            </Text>
          </View>
          <View style={{ flex: 3, backgroundColor: "#ffffff" }}>
            <Text
              style={{
                color: "#aaafb3",
                fontSize: 18,
                backgroundColor: "#e3e7eb",
                padding: 10,
                borderBottomWidth: 0.4,
              }}
            >
              CÔNG CỤ QUẢN LÝ
            </Text>
            <Choose
              iconName1="store-alt"
              iconName2="chevron-right"
              txtName="Công ty"
              route="Company"
            />
            <Choose
              iconName1="address-book"
              iconName2="chevron-right"
              txtName="Ca làm"
              route="Shift"
            />
            <Choose
              iconName1="user-friends"
              iconName2="chevron-right"
              txtName="Nhân viên"
              route="Employee"
            />
            {/* <Choose
              iconName1="calendar-check"
              iconName2="chevron-right"
              txtName="Sắp xếp lịch công"
              route="Shift"
            />
            <Choose
              iconName1="clipboard-list"
              iconName2="chevron-right"
              txtName="Chấm công nhanh"
              route="Shift"
            />
            <Choose
              iconName1="tools"
              iconName2="chevron-right"
              txtName="Chỉnh sửa giờ công"
              route="Shift"
            />
            <Choose
              iconName1="laptop"
              iconName2="chevron-right"
              txtName="Web admin"
              route="Shift"
            /> */}
          </View>

          <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <Text
              style={{
                color: "#aaafb3",
                fontSize: 18,
                backgroundColor: "#e3e7eb",
                padding: 10,
                borderBottomWidth: 0.4,
                borderTopWidth: 0.4,
              }}
            >
              ỨNG DỤNG
            </Text>
            <Choose
              iconName1="globe"
              iconName2="chevron-right"
              txtName="Ngôn ngữ"
            />
            <Choose
              iconName1="exclamation-circle"
              iconName2="chevron-right"
              txtName="Giới thiệu Tanca"
            />
            <Choose
              iconName1="exclamation-triangle"
              iconName2="chevron-right"
              txtName="Báo lỗi"
            />
            <Choose
              iconName1="ello"
              iconName2="chevron-right"
              txtName="Làm mới ứng dựng"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#43A047",
    padding: 12,
    width: 280,
    marginTop: 12,
  },

  text: {
    color: "#fff",
  },
});
