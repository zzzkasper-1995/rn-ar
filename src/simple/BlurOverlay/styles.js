import {StyleSheet, Dimensions} from 'react-native';
import {Color, Theme} from '../../library';

const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
	main: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	flex: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
});
