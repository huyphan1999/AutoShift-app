import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  textHeader: {
    height: 80,
    backgroundColor: "#39e394",
    justifyContent: "center",
    alignItems: "center",
  },
  txtSign: {
    color: "#ffffff",
    fontSize: 20,
    marginTop: 10,
  },
  textInput: {
    justifyContent: "flex-start",
    backgroundColor: "#f2fcf8",
    alignItems: "center",
  },
  textContent: {
    height: 80,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  textInputContainer: {
    width: 390,
    marginTop: 20,
    backgroundColor: "#ffffff",
    height: 60,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  textInput: {
    fontSize: 20,
  },
  loginBtn: {
    width: 390,
    height: 45,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#39e394",
    fontSize: 16,
  },
  checkBox: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
  },

  radio: {
    flexDirection: "row",
    flex: 1,
    marginRight: 5,
  },

  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },

  modalContent: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    width: "90%",
  },
  modalContentTitle: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 0.4,
    fontWeight: "bold",
    width: "100%",
  },
  modalContentInner: {
    width: "100%",
  },
  modalButton: {
    width: "100%",
  },
});

export default styles;
