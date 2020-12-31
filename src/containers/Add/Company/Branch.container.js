import ObjectList from "./ObjectList";
import { connect } from "react-redux";
import { getData } from "../../../selectors";
import * as COMPANY from "../../../actionTypes/company.actiontypes";

import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";
import { navigate, goBack } from "utils/navigate";

class BranchContainer extends ObjectList {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.getListBranch();
    this.props.navigation.setParams({
      onPressHeader: this.onPressHeader,
      title: "Chi nhánh",
    });

    
  };

  getListBranch = () => {
    this.props.dispatch(actions.getRequest(COMPANY.BRANCH_REQUESTING));
  };

  onPressHeader = () => {
    navigate("ObjectAdd", {
      onPress: (data) => this.onAddBranch(data),
      isBranch: true,
    });
  };

  onPressItem = (data) => {
    console.log("Pressed Item");
    console.log(data);
    navigate("ObjectDetails", {
      data,
      onPress: (data) => this.onSaveBranch(data),
      onDel: (id) => this.onDelBranch(id),
      isBranch: true,
    });
  };

  onAddBranch = async (data) => {
    // this.props.dispatch(postRequest(COMPANY.BRANCH_ADD, data));
    console.log("Add SAVE CALLBACK");
    console.log(data);
    console.log(data);

    await postRequest(`${configs.apiUrl}branch/register`, data);

    this.getListBranch();

    goBack();
  };

  onDelBranch = (id) => {
    // this.props.dispatch(getRequest(COMPANY.BRANCH_DEL, id));
    console.log("DEL CALLBACK");
    console.log(id);
  };


  onSaveBranch = async (newdata) => {
    // this.props.dispatch(postRequest(COMPANY.BRANCH_EDIT, newdata));
    console.log("EDIT CALLBACK");
    console.log(newdata);

    await postRequest(`${configs.apiUrl}branch/update`, newdata);

    this.getListBranch();
    goBack();
  };
}

const mapStateToProps = (state) => ({
  data: getData(state, "branch", "data"),
  isLoading: getData(state, "branch", "requesting"),
});

export default connect(
  mapStateToProps,
  null
)(BranchContainer);
