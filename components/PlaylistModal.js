import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState } from "react";
import PlaylistElement from "./PlaylistElement";


export default function PlaylistModal(props) {

  const [playlist, setPlaylist] = useState([{text: 'First Video', id: '1'}, {text: 'Second Video', id: '2'}]);
  const [error, setError] = useState(null);
  const [nextId, setNextId] = useState(3);


  function showError() {
    if (error != null) {
      return (
          <Text style={ styles.errorTextStyle }>
            {error}
          </Text>
      )}
  }

  function addFile() {
    fetch('https://examples.com/data.json', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: {

      }
    }).then(response => {
      if (response.status === 200) {
        response.json().then(res => {
          setPlaylist(res.body)
        })
      } else if (response.status === 404) {
        // setError("Error: 404 Not Found")
        setPlaylist((playlist) => [...playlist, {text: 'New Video', id: nextId}])
        setNextId(nextId+1)
      } else if (response.status === 500) {
        setError("Error: Internal Server Error")
      }
    });
  }

  function deletePlaylistElement(id) {
    setPlaylist((playlist) => {
      return playlist.filter((playlistItem) => playlistItem.id !== id);
    });
  }

  function displayPlaylist() {
    // getPlaylist();
    if (playlist.length === 0) {
      return (
          <Text style={ styles.textStyle } visible={ props.isEmpty }>
            Playlist has no elements.
          </Text>
      )} else {
      return (
          <View style={styles.flatListView}>
            <FlatList
              data={playlist}
              renderItem={(itemData) => {
                return (
                    <PlaylistElement
                        text={itemData.item.text}
                        id={itemData.item.id}
                        onDeleteItem={deletePlaylistElement}
                        // onPlayItem={}
                    />
                );
              }}
              keyExtractor={(item, index)=> {
                return item.id;
              }}
            />
          </View>
      )
    }
  }

  return (
    <Modal visible={ props.visible } animationType="slide">
      <View style={ styles.container }>
        { displayPlaylist() }
        { showError() }
        <View style={ styles.buttonView }>
          <Button color='green' title='Add File' onPress={ addFile }/>
        </View>
        <View style={ styles.buttonView }>
          <Button color='green' title='Close' onPress={ props.close }/>
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
    paddingTop: '20%'
  },
  textStyle: {
    color: 'white',
    marginTop: 12,
    fontSize: 18,
    margin: 5
  },
  buttonView: {
    width: '90%',
    marginBottom: '5%',
  },
  listButtonView: {
    margin: 8
  },
  errorTextStyle: {
    color: 'red',
    marginBottom: '10%',
    fontSize: 25,
  },
  playlistItem: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  flatListView: {
    flex: 5,
  },
});
