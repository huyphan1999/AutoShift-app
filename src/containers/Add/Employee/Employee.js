/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/AntDesign";
import { getParams, getParamsHeader } from "../../../utils/index";

class TitleHeader extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => {
          Alert.alert("Hiện chi tiết");
        }}
      >
        <Text>{this.props.name}</Text>
        <Icon
          name="downcircleo"
          size={16}
          color={this.props.color}
          style={{ paddingLeft: 10, paddingRight: 10 }}
        />
      </TouchableOpacity>
    );
  }
}
export default class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      item: "",
      index: "",
    };
  }

  static navigationOptions = ({ navigate, navigation }) => {
    const params = getParamsHeader(navigation);
    return {
      headerRight: (
        <TouchableOpacity
          style={{ paddingRight: 15, alignItems: "center" }}
          onPress={() => params.onPressHeader()}
        >
          <Image
            source={require("../../image/add_object.png")}
            style={{ width: 20, height: 20 }}
            tintColor="white"
          />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Nhân viên</Text>
        </View>
      ),
    };
  };

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      onPress={() => this.onPressItem(item)}
      subtitle={item.is_root ? "Quản lý" : "Nhân viên"}
      leftAvatar={{
        title: item.name && item.name[0],
      }}
      bottomDivider
      chevron
    />
  );

  render() {
    var { search } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View>
          <SearchBar
            round
            placeholder="Tên"
            onChangeText={this.updateSearch}
            value={search}
            searchIcon={{ size: 30 }}
            inputStyle={{ backgroundColor: "#CBCAC9", color: "#2D2D2D" }}
            containerStyle={{
              backgroundColor: "white",
              padding: 10,
              justifyContent: "center",
            }}
            inputContainerStyle={{ backgroundColor: "#CBCAC9" }}
          />
        </View>
        <View
          style={{
            height: 50,
            backgroundColor: "#D5D5D5",
            borderBottomWidth: 0.6,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TitleHeader name="Tất cả" color="#33FF4E" />
          <TitleHeader name="Chi nhánh" color="#E6E6E6" />
          <TitleHeader name="Phòng ban" color="#E6E6E6" />
          <TitleHeader name="Chức vụ" color="#E6E6E6" />
        </View>
        <View>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.props.data}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}
