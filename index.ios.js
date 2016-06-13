/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

// const MapPage = require('./components/Map');


// class Map extends Component {
//   render() {
//     return (
//       <MapPage />
//     );
//   }
// }

var {AppRegistry} = require('react-native');

var App = require('./components/App');


AppRegistry.registerComponent('Map', () => App);
