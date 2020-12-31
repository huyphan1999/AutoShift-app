import Add from "./Add";
import { connect } from "react-redux";
import { getUserData } from "../../selectors/index";
import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";
import { navigate, goBack } from "utils/navigate";

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
    const params = { ...data };
    await postRequest(`${configs.apiUrl}user/update`, params);
  };
}

const mapStateToProps = (state) => ({
  user: getUserData(state),
});

export default connect(
  mapStateToProps,
  null
)(AddContainer);
