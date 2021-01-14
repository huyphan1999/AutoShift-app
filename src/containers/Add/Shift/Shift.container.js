import Shift from "./Shift";
import { connect } from "react-redux";
import { getData } from "../../../selectors";
import * as SHIFT from "../../../actionTypes/shift.actiontypes";

import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";
import { navigate, goBack } from "utils/navigate";
import moment from "moment";
class ShiftContainer extends Shift {
  constructor(props) {
    super(props);
  }

  state = {};
  componentDidMount = () => {
    this.props.navigation.setParams({ onPressHeader: this.onPressHeader });
    this.getListShift();
  };

  onPressHeader = () => {
    navigate("ShiftDetail", { onPress: (data) => this.onAddShift(data) });
  };

  getListShift = async (filter) => {
    const params = {};
    const res = await getRequest(`${configs.apiUrl}shift/list`, params);
    this.setState({ data: res.data });
  };

  onPressItem = (data) => {
    console.log("Pressed Item");
    console.log(data);
    navigate("ShiftDetail", {
      data,
      onPress: (data) => this.onSaveShift(data),
      onDel: (id) => this.onDelShift(id),
    });
  };

  onAddShift = async (data) => {
    const { timeEnd, timeBegin, key, ...els } = data;
    const params = {
      time_end: moment(timeEnd).format("HH:mm"),
      time_begin: moment(timeBegin).format("HH:mm"),
      shift_key: key,
      ...els,
    };
    await postRequest(`${configs.apiUrl}shift/register`, params);
    goBack();
    this.props.dispatch({ type: types.CALENDAR_REQUESTING });
    this.getListShift();
  };

  onDelShift = (id) => {
    console.log("DEL CALLBACK");
    console.log(id);
  };

  onSaveShift = (newdata) => {
    console.log("EDIT CALLBACK");
    console.log(newdata);
  };
}

const mapStateToProps = (state) => ({
  data: getData(state, "shift", "data"),
  isLoading: getData(state, "shift", "requesting"),
});

export default connect(
  mapStateToProps,
  null
)(ShiftContainer);
