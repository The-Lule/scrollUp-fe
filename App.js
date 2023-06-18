import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState } from "react";
import PlaylistModal from "./components/PlaylistModal";
import DevicesModal from "./components/DevicesModal";
import NativeUploady, {
  UploadyContext,
  useItemFinishListener,
  useItemStartListener,
  useItemErrorListener,
} from "@rpldy/native-uploady";

export default function App() {
  const [playlistModalIsVisible, setPlaylistModalIsVisible] = useState(false);
  const [devicesModalIsVisible, setDevicesModalIsVisible] = useState(false);

  function openPlaylistModal() {
    setPlaylistModalIsVisible(true);
  }
  function closePlaylistModal() {
    setPlaylistModalIsVisible(false);
  }
  function openDevicesModal() {
    setDevicesModalIsVisible(true);
  }
  function closeDevicesModal() {
    setDevicesModalIsVisible(false);
  }

  return (
      <>
        <NativeUploady
          destination={{ url: "https://my-server.test.com/upload" }}>
          <View style={ styles.container }>
            <PlaylistModal visible={ playlistModalIsVisible } close={ closePlaylistModal }/>
            <DevicesModal visible={ devicesModalIsVisible } close={ closeDevicesModal }/>
            <Text style={ styles.textStyle }>ScrollUp v2.0</Text>
            <View style={ styles.buttonView }>
            <Button color='green' title='Playlist' onPress={ openPlaylistModal }/>
            </View>
            <View style={ styles.buttonView }>
              <Button color='green' title='Devices' onPress={ openDevicesModal }/>
            </View>
          </View>
          {/*<Upload/>*/}
        </NativeUploady>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    margin: 16,
    marginBottom: '40%',
    padding: 16,
    color: 'green',
    fontWeight: 'bold',
    fontSize:40
  },
  buttonView: {
    margin: 16,
    height: '5%',
    width: '90%'
  }
});
