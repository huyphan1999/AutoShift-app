import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import {
  Container,
  Header,
  Content,
  CheckBox,
  Form,
  Item,
  Input,
  Text,
  Icon,
} from "native-base";
import { connect } from "react-redux";
import { loginRequest } from "../../actions/login.action";
import Spinner from "react-native-loading-spinner-overlay";

import { Button } from "components/ui";

import * as variables from "themes/variables/color";

import { getData } from "../../selectors/index";
class Login extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      name: null,
      phone_number: null,
    };
  }
  render() {
    let { name, phone_number } = this.state;
    return (
      <Container>
        <View style={styles.container}>
          <Spinner visible={this.props.isLoading} textContent={"Loading..."} />
          <View style={styles.textHeader}>
            <Icon name="adn" type="FontAwesome5" style={{ fontSize: 80 }} />
            <Text style={styles.txtSign}>Đăng nhập</Text>
          </View>
          <View style={styles.textContent}>
            <Text style={{ fontSize: 20 }}>Xin hãy nhập tên cơ quan</Text>
            <Text style={{ fontSize: 20 }}>và số điện thoại của bạn</Text>
          </View>

          <Form>
            <Item>
              <Input
                placeholder="Tên cơ quan"
                onChangeText={(text) => this.setState({ name: text })}
                value={this.state.name}
              />
            </Item>
            <Item>
              <Input
                placeholder="Số điện thoại"
                onChangeText={(text) => this.setState({ phone_number: text })}
                value={this.state.phone_number}
              />
            </Item>
          </Form>

          <Button
            block
            success
            onPress={() => this.props.loginRequest({ name, phone_number })}
          >
            <Text>Đăng nhập</Text>
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate("SignUp")}
            transparent
            block
          >
            <Text style={{ color: variables.mainColor, fontSize: 16 }}>
              {" "}
              Dùng thử miễn phí ngay
            </Text>
          </Button>
          <View style={styles.checkBox}>
            <View style={{ flexDirection: "row" }}>
              <CheckBox
                checked={this.state.checked}
                onPress={() => this.setState({ checked: !this.state.checked })}
                color="green"
              />
              <Text style={{ marginLeft: 20 }}>
                {" "}
                Tôi đã đọc và đồng ý với các điều khoản
              </Text>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
  },
  textHeader: {
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    paddingTop: 10,
  },
  txtSign: {
    color: "#111d5e",
    fontSize: 40,
    marginTop: 10,
  },
  textInput: {
    justifyContent: "flex-start",
    backgroundColor: "#f2fcf8",
    alignItems: "center",
  },
  textContent: {
    height: 80,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  textInputContainer: {
    width: 390,
    marginTop: 20,
    backgroundColor: "#ffffff",
    height: 60,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  textInput: {
    fontSize: 20,
  },
  loginBtn: {
    width: 390,
    height: 45,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#39e394",
    fontSize: 16,
  },
  checkBox: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    loginRequest: ({ name, phone_number }) =>
      dispatch(loginRequest({ name, phone_number })),
  };
}
const mapStateToProps = (state) => ({
  isLoading: getData(state, "login", "requesting"),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
