import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

//Screens
import LoginScreen from "../containers/Login/Login.container";
import SignupScreen from "../containers/Signup/Signup.container";
import AuthLoading from "../containers/AuthLoading/AuthLoading.container";
import HomeApp from "../containers/Home/Home";

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignupScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0091EA",
      },
      headerTintColor: "#fff",
    },
    initialRouteName: "SignUp",
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      Auth: AuthStack,
      Home: HomeApp,
    },
    {
      initialRouteName: "AuthLoading",
    }
  )
);
