'use strict';

var React = require('react-native');
var {AppRegistry, StyleSheet,Text,View} = React;

var Map = require('./Map');
import { Settings } from './Settings';

var {Router, routerReducer, Route, Container, Animations, Schema} = require('react-native-redux-router');
var {NavBar, NavBarModal} = require('./NavBar');

import thunk from 'redux-thunk';

import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux/native';
import { reducer as app } from '../App/reducers/index';

// let store = createStore(combineReducers({
//     app,
//     routerReducer
// }));

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers({app, routerReducer});
let store = createStoreWithMiddleware(reducer);

class App extends React.Component {
    render(){
        return (
            <View style={{flex:1}}>
                <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,backgroundColor:'#F5FCFF'}}/>
                <Router>
                    <Schema name="modal" sceneConfig={Animations.FlatFloatFromBottom} navBar={NavBarModal}/>
                    <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar}/>
                    <Schema name="left" sceneConfig={Animations.FlatFadeToTheLeft} navBar={NavBar}/>
                    <Schema name="withoutAnimation" navBar={NavBar}/>
                    <Schema name="tab" navBar={NavBar}/>

                    <Route name="map" component={Map}  initial={true} hideNavBar={true} title="Map"/>
                    <Route name="backToMap" component={Map} schema="left"  hideNavBar={true} title="Map"/>
                    <Route name="settings" component={Settings}   title="Settings"/>

                </Router>

            </View>
        );
    }
}
class AllScreens extends React.Component {
    render() {
        return (
            <Provider store={store}>
                {() => <App />}
            </Provider>
        );
    }
}

module.exports = AllScreens;