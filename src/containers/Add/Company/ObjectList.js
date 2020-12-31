import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { getParams, getParamsHeader } from "../../../utils/index";

function Item({ data, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(data)}>
      <Text style={styles.title}>{data.name}</Text>
      <Icon
        name="chevron-right"
        size={20}
        color="#aaafb3"
        style={styles.btnIcon}
      />
    </TouchableOpacity>
  );
}

export default class ObjectList extends Component {
  static navigationOptions = ({ navigate, navigation }) => {
    const params = getParamsHeader(navigation);
    return {
      headerRight: (
        <TouchableOpacity
          style={{ paddingRight: 15 }}
          onPress={params && params.onPressHeader}
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
          <Text style={{ color: "white", fontSize: 18, paddingLeft: 40 }}>
            {params && params.title}
          </Text>
        </View>
      ),
    };
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.props.data}
          renderItem={({ item }) => (
            <Item data={item} onPress={(data) => this.onPressItem(data)} />
          )}
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
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 0.4,
  },
  title: {
    fontSize: 16,
  },
});
