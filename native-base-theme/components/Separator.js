// @flow

import variable from "./../variables/platform";

export default (variables /* : * */ = variable) => {
  const theme = {
    ".group": {
      height: 50,
      paddingVertical: variables.listItemPadding - 8,
      paddingTop: variables.listItemPadding + 12,
      ".bordered": {
        height: 50,
        paddingVertical: variables.listItemPadding - 8,
        paddingTop: variables.listItemPadding + 12,
      },
    },
    ".bordered": {
      ".noTopBorder": {
        borderTopWidth: 0,
      },
      ".noBottomBorder": {
        borderBottomWidth: 0,
      },
      height: 35,
      paddingTop: variables.listItemPadding,
      paddingBottom: variables.listItemPadding,
      borderBottomWidth: 1,
      borderTopWidth: variables.borderWidth,
      borderColor: variables.listBorderColor,
    },
    "NativeBase.Text": {
      fontSize: 20,
      color: "#779",
    },
    ".noTopBorder": {
      borderTopWidth: 0,
    },
    ".noBottomBorder": {
      borderBottomWidth: 0,
    },
    height: 38,
    backgroundColor: "#F0EFF5",
    flex: 1,
    justifyContent: "center",
    paddingLeft: variables.listItemPadding + 5,
  };

  return theme;
};
