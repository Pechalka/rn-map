var React = require('react-native');
var {View, Text, StyleSheet, TouchableHighlight} = React;

var Button = require('react-native-button');

var {Actions} = require('react-native-redux-router');

export class Settings extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				 <Text>settings</Text>
				 <Button onPress={() => Actions.backToMap()}>back</Button>
			</View>
		);
	}
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
});