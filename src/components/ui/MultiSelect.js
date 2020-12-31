import { ListItem } from "native-base";
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { getParams, getParamsHeader } from "../../utils";

import { goBack } from "utils/navigate";

import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";

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

class MultipleSelect extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity
        style={{ paddingRight: 15 }}
        onPress={() => getParamsHeader(navigation).onPressHeader()}
      >
        <Text style={{ color: "white", fontSize: 16, paddingLeft: 20 }}>
          {getParamsHeader(navigation).multiple ? "Chọn" : ""}
        </Text>
      </TouchableOpacity>
    ),
    headerTitle: "",
  });

  constructor(props) {
    super(props);
    console.log(this.props.navigation.state.params);
    this.state = {
      options: [],
      selectedOptions: [],
    };
  }

  componentDidMount = () => {
    this.props.navigation.setParams({ onPressHeader: this.onPressHeader });
    const { selectedOptions } = getParams(this.props);
    this.setState({ selectedOptions: selectedOptions });
    this.getOptions();
  };

  onPressHeader = () => {
    getParams(this.props).onSelection(this.state.selectedOptions);
    goBack();
  };

  getOptions = async () => {
    const res = await getRequest(getParams(this.props).apiUrl);
    console.log("getOptions", res.data);
    this.setState({ options: res.data });
  };

  selectOption = (selectedOption) => {
    let selectedOptions = this.state.selectedOptions;
    const index = selectedOptions.findIndex(
      (option) => option.id == selectedOption.id
    );

    if (index === -1) {
      selectedOptions.push(selectedOption);
    } else {
      selectedOptions.splice(index, 1);
    }
    this.setState({ selectedOptions: [...selectedOptions] });
  };

  isSelected = (option) => {
    return this.state.selectedOptions.some(
      (item) => item && item.id === option.id
    );
  };

  renderIndicator = (option) => {
    if (this.isSelected(option)) {
      return <Icon name="check" size={16} color="#00e600" />;
    } else return null;
  };

  renderText = (option) => {
    return <Text style={styles.option}>{option.name}</Text>;
  };

  renderRow = ({ item: option }) => {
    const { multiple, onSelection } = getParams(this.props);
    return (
      <ListItem
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 15,
          paddingHorizontal: 20,
          fontSize: 14,
          alignItems: "center",
        }}
        onPress={
          multiple ? () => this.selectOption(option) : () => onSelection(option)
        }
      >
        <View>{this.renderText(option)}</View>
        <View>{this.renderIndicator(option)}</View>
      </ListItem>
    );
  };

  render() {
    console.log(this.state);

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.options}
          renderItem={(item) => this.renderRow(item)}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  option: {
    fontSize: 18,
    flex: 1,
  },
});

export default MultipleSelect;
