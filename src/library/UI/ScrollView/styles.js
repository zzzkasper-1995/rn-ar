import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
	viewContent: {
		paddingBottom: Platform.OS === 'ios' ? 0 : 48,
	},
});
