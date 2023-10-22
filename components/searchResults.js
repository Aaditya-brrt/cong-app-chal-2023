import React from 'react';
import { FlatList, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Card from '../styles/card'
import { StatusBar } from 'expo-status-bar';



const SearchResults = ({route, navigation}) => {  
  const { tracks } = route.params;


  const handlePlaySong = (songId, songUrl) =>{
    console.log(songId, songUrl)
    fetch("https://e2cf-2600-1700-3d41-540-9dee-10de-61b5-540a.ngrok-free.app/hello/" + songId, {
      method: 'GET'})
      .then((response) => response.json())
      .then(function(json) {
        console.log(JSON.stringify(json));
        navigation.navigate("Player", {key: new Date().getTime(), json, songId})
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
          throw error;
        });
  }

  return (
    <SafeAreaView style = {styles.container}>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress = {() => handlePlaySong(item.id, item.url)} >
            <Card>
              <Text>{item.name}</Text>
              <Text>{item.artist}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
      <StatusBar style="dark" />
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 4
  }
});

export default SearchResults;