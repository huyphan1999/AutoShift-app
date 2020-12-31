import NavigationService from "../navigation/NavigationService";

export const navigate = (routename, data) => {
  NavigationService.navigate(routename, data);
};

export const goBack = (key) => {
  NavigationService.back(key);
};

export const showPicker = (data) => {
  NavigationService.navigate("MultiSelect", data);
};
