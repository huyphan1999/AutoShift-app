import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import { styles as modalStyle } from "components/ui";

import { Text, Radio, H3, H2, H1 } from "native-base";
import Modal from "react-native-modal";
import { Row } from "components/ui";

const DATA = [{ name: "Daily Stand Up" }, { name: "Discussion with Client" }];

export default class ShiftClockModal extends Component {
  renderListShift = () => {
    const { listShift, onSelect } = this.props;
    return (
      <React.Fragment>
        <View style={modalStyle.modalContentInner}>
          {listShift.length ? (
            listShift.map((shift, index) => (
              <TouchableOpacity
                onPress={() => onSelect(shift, index)}
                style={styles.shift}
                key={shift.id}
              >
                <Text>{shift.data.name}</Text>
                <Radio selected={shift.checked} />
              </TouchableOpacity>
            ))
          ) : (
            <Row style={styles.emptyList}>
              <H3>Bạn không có ca trong hôm nay</H3>
            </Row>
          )}
        </View>
      </React.Fragment>
    );
  };

  render() {
    console.log(this.props);
    return (
      <Modal style={modalStyle.modalContainer} isVisible={this.props.isVisible}>
        <View style={modalStyle.modalContent}>
          <View style={modalStyle.modalContentTitle}>
            <H1>Ca của bạn</H1>
          </View>
          {this.renderListShift()}
          <TouchableOpacity
            onPress={this.props.onClockIn}
            style={styles.clockButton}
            activeOpacity={0.8}
          >
            <Text style={{ fontSize: 20, color: "white" }}>Vào ca</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  shift: {
    flexDirection: "row",
    borderBottomWidth: 0.4,
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  clockButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    backgroundColor: "#5cb85c",
  },
  emptyList: {
    width: "100%",
    justifyContent: "center",
    paddingVertical: 30,
  },
});
