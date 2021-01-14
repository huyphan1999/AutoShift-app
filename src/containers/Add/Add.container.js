import Add from "./Add";
import { connect } from "react-redux";
import { getUser } from "../../selectors/index";
import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";
import { navigate, goBack } from "utils/navigate";
import moment from "moment";
import { Toast } from "native-base";
import { Alert } from "react-native";

class AddContainer extends Add {
  constructor(props) {
    super(props);
    this.state = {
      iconName1: "",
      iconName2: "",
      txtName: "",
    };
  }

  onSave = async (data) => {
    let params = {};
    let { birth, ...rest } = data;
    birth = moment(birth).format("YYYY-MM-DD");
    params = { ...rest, birth };
    await postRequest(`${configs.apiUrl}user/update`, params);
    Alert.alert("Cập nhật thành công");

    this.props.dispatch(actions.fetchUser());
  };
}

const mapStateToProps = (state) => ({
  user: getUser(state),
});

export default connect(
  mapStateToProps,
  null
)(AddContainer);
