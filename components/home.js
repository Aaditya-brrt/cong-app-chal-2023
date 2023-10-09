import React, { useState } from 'react';
import { Text, TextInput, Button, SafeAreaView, StyleSheet, TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { useDifficulty } from '../components/difficultyContext.js'
const SpotifyWebApi = require("spotify-web-api-node");

var spotifyApi = new SpotifyWebApi();
var difficulty = 4;

const Home = ({navigation}) => {
  const { difficulty, setDifficulty } = useDifficulty();
  const [pressedDifficulty, setPressedDifficulty] = useState(null); // Track the pressed button


  const handleSetDifficulty = (level) => {
    setDifficulty(level);
    setPressedDifficulty(level); // Set the pressed button

  };
  const [songSearch, setSongSearch] = useState('');
  const [genreSearch, setGenreSearch] = useState('');
  const [languageSearch, setLanguageSearch] = useState('');
  
  const renderButton = (level, color) => {
    // Check if the button is pressed
    const isPressed = pressedDifficulty === level;
    

    // Define a border style for pressed buttons
    const buttonBorderStyle = isPressed ? { borderColor: color } : null; // Match border color to button color

    // Define a text style for pressed buttons
    const buttonTextStyle = isPressed ? styles.pressedButtonText : null;

    return (
      <View style = {styles.outerButton}>
      <View style={[styles.buttonContainer, buttonBorderStyle]}>
        <Button
          title={(level/2).toString()}
          onPress={() => handleSetDifficulty(level)}
          color={color}
          style={isPressed ? styles.pressedButton : null}
        />
      </View>
      </View>
    );
  };
  spotifyApi.setAccessToken("BQDHBYb59US2FGhsyynJQnbLSiqRXvoBQz1OvNZpiJFe0yx1Gk929osuEthJpK252Q4_qmKedvSfslfx7LKZS2G-N_dGri8gSY7fMFXtkPdfPbUDSbk")


  const handleSearchTrack = (song) => {
    // Implement your search logic here
    spotifyApi.searchTracks(song)
    .then(function(data) {
      console.log('Search by' + song);
      const trackResponse = data.body;
    
      const tracks = trackResponse.tracks.items.map(trackItem => ({
        name: trackItem.name,
        url: trackItem.external_urls.spotify,
        artist: trackItem.artists[0].name,
        id: trackItem.id,
        uri: trackItem.uri,
        explicit: trackItem.explicit
      }));
      
      console.log(tracks);
      navigation.navigate('Search Results', {tracks});
    }, function(err) {
      console.error(JSON.stringify(err));
    });
    setSongSearch('');
  };

  const handleSearchGenre = (playlist) => {
    // Implement your search logic here
    spotifyApi.searchPlaylists(playlist)
    .then(function(data) {
      console.log('Search for' + playlist);
      const playlistResponse = data.body;
      const firstPlaylist = playlistResponse.playlists.items[0];
      const playlistInfo = {
        name: firstPlaylist.name,
        url: firstPlaylist.external_urls.spotify,
        id: firstPlaylist.id
      };
      console.log(playlistInfo);

      spotifyApi.getPlaylistTracks(playlistInfo.id)
      .then(function(playlistData) {
        console.log('Some information about this playlist');
        const playlistTrackResponse = playlistData.body;
        const tracks = [];
        for (let i = 0; i < 10 && i < playlistTrackResponse.items.length; i++) {
          const track = playlistTrackResponse.items[i].track;
          const trackInfo = {
            name: track.name,
            url: track.external_urls.spotify,
            artist: track.artists[0].name,
            id: track.id,
            uri: track.uri,
            explicit: track.explicit
          };
          tracks.push(trackInfo);
        }        
        console.log(tracks);
        navigation.navigate('Search Results', {tracks});

      }, function(err) {
        console.log('Something went wrong!', err);
      });
    }, function(err) {
      console.error(JSON.stringify(err));
    });
    setGenreSearch('');
  };

  const handleSearchLanguage = (language) => {
    // Implement your search logic here
    spotifyApi.searchPlaylists(language)
    .then(function(data) {
      console.log('Search for' + language);
      const languageResponse = data.body;
      const firstPlaylist = languageResponse.playlists.items[0];
      const languageInfo = {
        name: firstPlaylist.name,
        url: firstPlaylist.external_urls.spotify,
        id: firstPlaylist.id
      };
      console.log(languageInfo);

      spotifyApi.getPlaylistTracks(languageInfo.id)
      .then(function(languageData) {
        console.log('Some information about this playlist');
        const languageTrackResponse = languageData.body;
        const tracks = [];
        for (let i = 0; i < 10 && i < languageTrackResponse.items.length; i++) {
          const track = languageTrackResponse.items[i].track;
          const trackInfo = {
            name: track.name,
            url: track.external_urls.spotify,
            artist: track.artists[0].name,
            id: track.id,
            uri: track.uri,
            explicit: track.explicit
          };
          tracks.push(trackInfo);
        }
        console.log(tracks);
        navigation.navigate('Search Results', {tracks});

      }, function(err) {
        console.log('Something went wrong!', err);
      });
    }, function(err) {
      console.error(JSON.stringify(err));
    });
    setLanguageSearch('')
  };

  return (
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>
          Welcome to the Lyrics Trainer!
        </Text>
        <View style = {styles.inputs}>
        <TextInput
          style={styles.input}
          placeholder="Search for songs..."
          value={songSearch}
          onChangeText={(text) => setSongSearch(text)}
          onSubmitEditing={() => handleSearchTrack(songSearch)}
        />
        </View>
        <View style = {styles.inputs}>
        <TextInput
          style={styles.input}
          placeholder="Search for a genre..."
          value={genreSearch}
          onChangeText={(text) => setGenreSearch(text)}
          onSubmitEditing={() => handleSearchGenre(genreSearch)}
        />
        </View>
        <View style = {styles.inputs}>
        <TextInput
          style={styles.input}
          placeholder="Search for a language..."
          value={languageSearch}
          onChangeText={(text) => setLanguageSearch(text)}
          onSubmitEditing={() => handleSearchLanguage(languageSearch)}
        />
        </View>
        <Text style={styles.header}>
          Difficulty Level: {difficulty/2}
        </Text>
        <View style={styles.buttonContainer}>
          {renderButton(2, 'black')}
          {renderButton(4, 'royalblue')}
          {renderButton(6, 'crimson')}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 4
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
    paddingTop: 16
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    marginRight: 10,
    marginLeft: 10
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  buttonContainer: {
    borderWidth: 2, // Add a border to the container
    borderColor: 'transparent', // Initialize with a transparent border color
    borderRadius: 10, // Add border radius for rounded corners
    alignItems: 'center'
  },
  pressedButton: {
    borderColor: 'royalblue', // Customize the border color when pressed
  },
  pressedButtonText: {
    color: 'royalblue', // Customize the text color when pressed
  },
  inputs: {
    paddingTop:16,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  outerButton: {
    width: 60, // Adjust the width to make it a square
  },
  
});

export default Home;