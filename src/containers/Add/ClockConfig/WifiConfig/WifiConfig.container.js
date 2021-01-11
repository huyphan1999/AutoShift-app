import WifiConfig from "./WifiConfig";
import { connect } from "react-redux";
import { getData } from "selectors";

import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";
import { navigate, goBack } from "utils/navigate";

class WifiConfigContainer extends WifiConfig {
  constructor(props) {
    super(props);
    this.state = { listWifi: [] };
  }

  componentDidMount = () => {
    this.getListWifi();
    this.props.navigation.setParams({
      onPressHeader: this.onPressHeader,
      title: "Chi nhánh",
    });
  };

  getListWifi = async () => {
    try {
      const res = await getRequest(`${configs.apiUrl}wifi/list`);
      if (res.data) {
        this.setState({ listWifi: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  onPressHeader = () => {
    navigate("WifiDetail", {
      onPress: (data) => this.onAddWifi(data),
    });
  };

  onPressItem = (data) => {
    console.log("Pressed Item");
    console.log(data);
    navigate("WifiDetail", {
      data,
      onPress: (data) => this.onSaveWifi(data),
      onDel: (id) => this.onDelWifi(id),
    });
  };

  onAddWifi = async (data) => {
    console.log("Add SAVE CALLBACK");
    console.log(data);
    console.log(data);

    await postRequest(`${configs.apiUrl}wifi/register`, data);

    this.getListWifi();

    goBack();
  };

  onDelWifi = (id) => {
    // this.props.dispatch(getRequest(COMPANY.BRANCH_DEL, id));
    console.log("DEL CALLBACK");
    console.log(id);
  };

  onSaveWifi = async (newdata) => {
    // this.props.dispatch(postRequest(COMPANY.BRANCH_EDIT, newdata));
    console.log("EDIT CALLBACK");
    console.log(newdata);

    await postRequest(`${configs.apiUrl}wifi/update`, newdata);

    this.getListWifi();
    goBack();
  };
}

export default WifiConfigContainer;
