import React, { useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';



const ScorePage = ({navigation, route}) => {

  const {score, total, json, songUrl} = route.params;
  var percent;

  if (score/total == 0){
    percent = 0;
  } else if (score/total <= 0.2){
    percent = 1;
  } else if (score/total <= 0.4) {
    percent = 2;
  } else if (score/total <= 0.6) {
    percent = 3;
  } else if (score/total <= 0.8) {
    percent = 4;
  } else{
    percent = 5;
  }


  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.lyricsContainer}>
        <Image source = {scores.results[percent]} style = {styles.image} resizeMode = 'contain' />
        <Text style = {styles.lyrics}>You got {score} out of {total} words correct</Text>
      </View>
      <Button title = "Try Again" onPress={() => navigation.navigate("Player", {key: new Date().getTime(), json, songUrl})} />
      <Button title="Finish" onPress={() => navigation.popToTop()} />
      <StatusBar style="dark" />
    </SafeAreaView>
  )
}

const scores = {
  results: {
    '0': require('../assets/0star.png'),
    '1': require('../assets/1star.png'),
    '2': require('../assets/2star.png'),
    '3': require('../assets/3star.png'),
    '4': require('../assets/4star.png'),
    '5': require('../assets/5star.png'),
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lyrics: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  lyricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50
  },
  image: {
    width: '80%',
    height: '100%',
    paddingBottom: 50
  }
});

export default ScorePage;