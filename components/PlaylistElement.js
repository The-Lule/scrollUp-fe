import {Button, FlatList, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import { useState } from "react";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";

export default function PlaylistElement(props) {
  return (
      <View style={styles.playlistItem}>
          <Text style={styles.textStyle}>{props.text}</Text>
          <View style={styles.listButtonView}>
              <Button color='green' title='Play' onPress={props.onPlayItem}/>
          </View>
          <View style={styles.listButtonView}>
              <Button color='orange' title='Delete' onPress={ props.onDeleteItem.bind(this, props.id) }/>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    marginTop: 13,
    fontSize: 18,
    margin: 5
  },
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: 'green',
  },
  goalText: {
    color: 'white',
    padding: 8,
  },
  playlistItem: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  listButtonView: {
    marginLeft: 8,
    marginTop: 8
  }
});
