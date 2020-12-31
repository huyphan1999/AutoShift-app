/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Add_Activity from "../Add/Add.container";
import Input_Output_Activity from "../In_Out/In_Out";
import Calendar_Activity from "../Calendar/Calendar.container";
import TimeKeep_Activity from "../TimeKeep/TimeKeep.container";
import EmployeeInfo from "../Add/Employee/EmployeeInfo";
import Logout_Activity from "../Add/Logout";
import Shift from "../Add/Shift/Shift.container";
import ShiftDetail from "../Add/Shift/ShiftDetail";
import Company from "../Add/Company/Company";
import Position from "../Add/Company/Position.container";
import Department from "../Add/Company/Department.container";
import Branch from "../Add/Company/Branch.container";
import ObjectAdd from "../Add/Company/ObjectAdd";
import Employee from "../Add/Employee/Employee.container";
import AddEmployee from "../Add/Employee/AddEmployee";
// import ObjectDetails from '../Add/Company/ObjectDetails';
import MultiSelect from "components/ui/MultiSelect";
import ObjectDetails from "../Add/Company/ObjectDetails";

const Input_OutputTab = createStackNavigator(
  {
    Input_Output: Input_Output_Activity,
  },

  {
    navigationOptions: {
      tabBarLabel: "Vào/Ra",
    },
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0bd967",
      },
      headerTintColor: "#fff",
      title: " Input_OutputTab",
    },
  }
);
const Calendar_Tab = createStackNavigator(
  {
    Calendar: Calendar_Activity,
  },
  {
    navigationOptions: {
      tabBarLabel: "Lịch công",
    },
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0bd967",
      },
      headerTintColor: "#fff",
      title: " Calendar_Tab",
    },
  }
);
const TimeKeep_Tab = createStackNavigator(
  {
    TimeKeep: TimeKeep_Activity,
  },
  {
    navigationOptions: {
      tabBarLabel: "Chấm công",
    },
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0bd967",
      },
      headerTintColor: "#fff",
      title: " TimeKeep_Tab",
    },
  }
);

const Add_Tab = createStackNavigator(
  {
    Add: Add_Activity,
    EmployeeInfo: EmployeeInfo,
    Logout: Logout_Activity,
    Shift: Shift,
    ShiftDetail: ShiftDetail,
    Employee: Employee,
    AddEmployee: AddEmployee,
    Company: Company,
    Position: Position,
    Department: Department,
    Branch: Branch,
    ObjectAdd: ObjectAdd,
    MultiSelect: MultiSelect,
    ObjectDetails: ObjectDetails,
  },
  {
    navigationOptions: {
      tabBarLabel: "Thêm",
    },
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0bd967",
      },
      headerTintColor: "#FFFFFF",
      title: " Add_Tab",
    },
  }
);

const Home = createBottomTabNavigator(
  {
    Input_Output: Input_OutputTab,
    Calendar: Calendar_Tab,
    TimeKeep: TimeKeep_Tab,
    Add: Add_Tab,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === "Input_Output") {
          return (
            <Image
              source={require("../image/in_output.png")}
              style={{ width: 20, height: 20 }}
              tintColor={tintColor}
              focused={focused}
            />
          );
        }
        if (routeName === "Calendar") {
          return (
            <Image
              source={require("../image/calendar.png")}
              style={{ width: 20, height: 20 }}
              tintColor={tintColor}
              focused={focused}
            />
          );
        }
        if (routeName === "TimeKeep") {
          return (
            <Image
              source={require("../image/time_keep.png")}
              style={{ width: 20, height: 20 }}
              tintColor={tintColor}
              focused={focused}
            />
          );
        }
        if (routeName === "Add") {
          return (
            <Image
              source={require("../image/add.png")}
              style={{ width: 20, height: 20 }}
              tintColor={tintColor}
              focused={focused}
            />
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: "#0bd967",
      inactiveTintColor: "#263238",
    },
  }
);

export default createAppContainer(Home);
