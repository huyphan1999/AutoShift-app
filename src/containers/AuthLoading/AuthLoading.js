import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

export default class AuthLoadingScreen extends React.Component {
  render() {
    console.log('Auth loading render')
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <BarIndicator color="green" size={100} count={4}/>
      </View>
    );
  }
}