import Object from "./ObjectList";
import { connect } from "react-redux";
import { getData } from "../../../selectors";
import * as COMPANY from "../../../actionTypes/company.actiontypes";

import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";
import { navigate, goBack } from "utils/navigate";

class DepartmentContainer extends Object {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    this.props.navigation.setParams({
      onPressHeader: this.onPressHeader,
      title: "Phòng ban",
    });

    this.getListDept();
  };

  getListDept = () => {
    this.props.dispatch(actions.getRequest(COMPANY.DEPT_REQUESTING));
  };

  onPressHeader = () => {
    navigate("ObjectAdd", {
      onPress: (data) => this.onAddDepartment(data),
      isDep: true,
    });
  };

  onPressItem = (data) => {
    console.log("Pressed Item");
    console.log(data);
    navigate("ObjectDetails", {
      data,
      onPress: (data) => this.onSaveDepartment(data),
      onDel: (id) => this.onDelDepartment(id),
      isDep: true,
    });
  };

  onAddDepartment = async (data) => {
    const { branch, ...els } = data;
    const params = { branch_id: branch.id, ...els };
    await postRequest(`${configs.apiUrl}dep/register`, params);
    this.getListDept();
    goBack();
  };

  onDelDepartment = (id) => {
    this.props.dispatch(getRequest(COMPANY.DEPT_DEL, id));
    console.log("DEL CALLBACK");
    console.log(id);
  };

  onSaveDepartment = async (newdata) => {
    await postRequest(`${configs.apiUrl}dep/update`, data);
    this.getListDept();
    goBack();
  };
}

const mapStateToProps = (state) => ({
  data: getData(state, "dept", "data"),
  isLoading: getData(state, "dept", "requesting"),
});

export default connect(
  mapStateToProps,
  null
)(DepartmentContainer);
