import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import React, { useState } from "react";
import axios from "axios";
import AddDeviceModal from "./AddDeviceModal";

export default function DevicesModal(props) {

  const [devices, setDevices] = useState([]);
  const [addDeviceModalVisible, setAddDeviceModalVisible] = useState(false);

  function displayDevices() {
    getDevices();
    if (devices.length === 0) {
      return (
          <Text style={ styles.textStyle } visible={ props.isEmpty }>
            No devices are connected.
          </Text>
      )
    } else {

    }
  }

  const getDevices = React.useCallback(() => {
    axios({
      method: 'get',
      url: 'http://192.168.1.127:8080/api/config/devices',
    }).then(response => {
      if (response.status === 200) {
        console.log(response.data.devices)
      }
    });
  }, []);

  function openAddDeviceModal() {
    setAddDeviceModalVisible(true);
  }

  function closeAddDeviceModal() {
    setAddDeviceModalVisible(false);
  }

  function display() {
    console.log(devices)
  }

  return (
    <Modal visible={ props.visible } animationType="slide">
      <AddDeviceModal visible={ addDeviceModalVisible } close={ closeAddDeviceModal }/>
      <View style={ styles.container }>
        { displayDevices() }
        <View style={ styles.buttonView }>
          <Button color='green' title='Add Device' onPress={ openAddDeviceModal }/>
        </View>
        <View style={ styles.buttonView }>
          <Button color='green' title='Close' onPress={ props.close }/>
        </View>
        <View style={ styles.buttonView }>
          <Button color='green' title='Log Devices' onPress={ display }/>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    marginBottom: '10%',
    fontSize: 25
  },
  buttonView: {
    width: '90%',
    marginBottom: 8
  }
});
