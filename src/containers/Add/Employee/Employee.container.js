import Employee from "./Employee";
import { connect } from "react-redux";
import { getData } from "../../../selectors";
import * as EMP from "../../../actionTypes/emp.actiontypes";

import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";
import { navigate, goBack } from "utils/navigate";

class EmpContainer extends Employee {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.navigation.setParams({ onPressHeader: this.onPressHeader });
    this.getListUser();
  };

  getListUser = () => {
    this.props.dispatch(actions.getRequest(EMP.EMP_REQUESTING));
  };

  componentDidUpdate = () => {};

  onPressHeader = () => {
    navigate("AddEmployee", {
      onPress: this.onAddEmp,
      data: {},
    });
  };

  onPressItem = (data) => {
    console.log("Pressed Item");
    console.log(data);
    navigate("AddEmployee", {
      onPress: this.onSaveEmp,
      data: data,
    });
  };

  onAddEmp = async (data) => {
    // this.props.dispatch(postRequest(COMPANY.BRANCH_ADD, data));
    console.log("Add SAVE CALLBACK");

    await postRequest(`${configs.apiUrl}user/create`, data);
    this.getListUser();

    goBack();
  };

  onDelEmp = (id) => {
    this.props.dispatch(getRequest(EMP.EMP_DEL, id));
    console.log("DEL CALLBACK");
    console.log(id);
  };

  onSaveEmp = async (newdata) => {
    console.log("EDIT CALLBACK");
    console.log(newdata);
    await postRequest(`${configs.apiUrl}user/update`, newdata);
    this.getListUser();
  };

  updateSearch = (search) => {
    this.setState({ search: search });
  };

  keyExtractor = (item, index) => index.toString();
}

const mapStateToProps = (state) => ({
  data: getData(state, "emp", "data"),
  isLoading: getData(state, "emp", "requesting"),
  infor: getData(state, "emp", "infor"),
});

export default connect(
  mapStateToProps,
  null
)(EmpContainer);
