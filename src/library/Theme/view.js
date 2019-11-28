import Color from './color/default';

export default {
	screen: {
		backgroundColor: 'whait',
		flex: 1,
	},
	strip: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		width: 72,
		backgroundColor: 'red',
	},
	shadow: {
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 16,
		},
		shadowRadius: 14,
		shadowOpacity: 0.35,
		elevation: 3,
	},
	absolute: {
		position: 'absolute',
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
	},
	picker: {
		borderRadius: 8,
		borderWidth: 2,
		borderColor: Color.GRAY_OPACITY_LIGHT,
		flexDirection: 'row',
		marginHorizontal: 40,
		marginBottom: 38,
		backgroundColor: Color.WHITE,
	},
	circle: {
		justifyContent: 'center',
		alignItems: 'center',
		// width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: Color.WHITE,
		borderWidth: 2,
		borderColor: Color.GRAY_OPACITY_LIGHT,
	},
};
