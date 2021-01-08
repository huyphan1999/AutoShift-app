import { combineReducers } from "redux";
import clock from "./clock.reducer";
import app from "./app.reducer";
import user from "./user.reducer";
import login from "./login.reducer";
import signup from "./signup.reducer";
import shift from "./shift.reducer";
import emp from "./emp.reducer";
import branch from "./branch.reducer";
import dept from "./dept.reducer";
import position from "./postion.reudcer";
import calendar from "./calendar.reducer";
import timekeep from "./timekeep.reducer";
import loading from "./loading.reducer";
export default combineReducers({
  app,
  user,
  login,
  signup,
  shift,
  emp,
  clock,
  calendar,
  timekeep,
  dept,
  branch,
  position,
  loading,
});
