import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default {
	fontWeight: {
		regular: '400',
		medium: '500',
		semibold: '600',
		bold: '700',
		black: '900',
	},
	opacity: {
		normal: 0.3,
		super: 0.1,
	},
	sizeScreen: {
		width,
		height,
	},
};
