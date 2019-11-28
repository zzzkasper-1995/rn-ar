import {StyleSheet} from 'react-native';

export default theme =>
	StyleSheet.create({
		btn: {
			borderWidth: 0,
			borderColor: 'yellow',
			marginBottom: 10,
		},
		btnsView: {
			position: 'absolute',
			left: 20,
			right: 20,
			bottom: 20,
		},
	});
