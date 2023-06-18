import {Button, Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import { useState } from "react";
import axios from "axios";

export default function DevicesModal(props) {

  const [deviceToAdd, setDeviceToAdd] = useState("");

  function addDevice() {
    axios({
      method: 'get',
      url: 'http://192.168.1.127:8080/api/config/add-device/' + {deviceToAdd},
    }).then(response => {
      if (response.status === 200) {
          { props.close() }
      } else {
        console.log('res:', response);
      }
    });
  }

  function addDeviceInputHandler(device) {
    setDeviceToAdd(device);
  }

  return (
    <Modal visible={ props.visible } animationType="slide">
      <View style={ styles.container }>
        <TextInput
            style={styles.textInput}
            placeholder="Enter device IP"
            onChangeText={addDeviceInputHandler}
            value={deviceToAdd}
        />
        <View style={ styles.buttonView }>
          <Button color='green' title='Add Device' onPress={ addDevice }/>
        </View>
        <View style={ styles.buttonView }>
          <Button color='green' title='Cancel' onPress={ props.close }/>
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
  textInput: {
    color:'#000',
    backgroundColor: '#aaa',
    width: '80%',
    padding: 16,
    margin: 16
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
