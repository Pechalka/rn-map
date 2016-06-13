var React = require('react-native');
var {
  StyleSheet,
  PropTypes,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} = React;

var MapView = require('react-native-maps');

var { width, height } = Dimensions.get('window');

var NavigationBar = require('react-native-navbar');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.331705;
const LONGITUDE = -122.030237;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
var id = 0;

import Icon from 'react-native-vector-icons/FontAwesome';

var {Actions} = require('react-native-redux-router');

var PolylineCreator = React.createClass({
  getInitialState() {
    return {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  },
  
  watchID: (null: ?number),

  componentDidMount: function() {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     var initialPosition = JSON.stringify(position);
    //     console.log(' initialPosition ', initialPosition);
    //     this.setState({
    //       region: {
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //         latitudeDelta: LATITUDE_DELTA,
    //         longitudeDelta: LONGITUDE_DELTA,
    //       }
    //     });
    //   },
    //   (error) => alert(error.message),
    //   {enableHighAccuracy: true, timeout: 1000, maximumAge: 100}
    // );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      console.log(' lastPosition ', lastPosition);
      this.props.onMapPress(position.coords);

    //  this.setState({lastPosition});
    });//, {enableHighAccuracy: true, timeout: 2000, maximumAge: 100});
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },



  onPress(e) {
    this.props.onMapPress(e.nativeEvent.coordinate);
  },

  render() {
    const {
      stop,
      start,
      status,
      editing,
      polygons,
    } = this.props;

    var leftButton;
    switch(status){
      case 'start':
        leftButton = <Icon style={{paddingLeft: 10 }}  onPress={stop} name="stop" size={30}  />
      break;
      case 'stop':
        leftButton = <Icon style={{paddingLeft: 10 }}  onPress={start} name="play" size={30}  />
      break;
    }


    const rightButton = <Icon style={{paddingRight: 10 }}  onPress={() => Actions.settings()} name="align-justify" size={30}  />;

    return (
      <View style={styles.container}>
      
        <MapView
          style={styles.map}
          initRegion={this.state.region}
          onPress={this.onPress}
        >
          {polygons.map(polygon => (
            <MapView.Polyline
              key={polygon.id}
              coordinates={polygon.coordinates}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={3}
            />
          ))}
          {editing && (
            <MapView.Polyline
              key={'editingPolyline'}
              coordinates={editing.coordinates}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={3}
            />
          )}
        </MapView>
        <View style={styles.navBar}>
          <NavigationBar
        leftButton={leftButton} 
        rightButton={rightButton} />
        </View>
        <View style={styles.buttonContainer}>
          {editing && (
            <TouchableOpacity onPress={stop} style={[styles.bubble, styles.button]}>
              <Text>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'rgba(255,0,0,0.7)'
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

import { connect } from 'react-redux';
import * as actions from '../App/actions';

PolylineCreator = connect(
  state => state.app,
  actions
)(PolylineCreator);

module.exports = PolylineCreator;