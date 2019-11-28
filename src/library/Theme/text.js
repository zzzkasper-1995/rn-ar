import Color from './color/default';
import simple from './simple';

export default {
	normal: {
		color: Color.PRIMARY_TEXT,
		fontSize: 16,
	},
	smallBold: {
		fontSize: 10,
		fontWeight: simple.fontWeight.bold,
		color: Color.BLACK_LIGHT,
		opacity: 0.5,
	},
	primaryText: {
		fontSize: 16,
		fontWeight: simple.fontWeight.bold,
		color: Color.PRIMARY_TEXT,
	},
};
