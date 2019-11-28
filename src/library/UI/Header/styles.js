import {Platform} from 'react-native';

export default theme => ({
	safeArea: {
		// backgroundColor: 'green',
		backgroundColor: theme.color.HEADER,
	},
	rowView: {
		height: Platform.OS !== 'ios' ? 58 : 56,
		paddingTop: Platform.OS !== 'ios' ? 28 : 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 22,
		paddingBottom: 10,
		// backgroundColor: 'blue',
	},
	topSpace: {
		height: Platform.OS !== 'ios' ? 72 : 70,
		paddingTop: Platform.OS !== 'ios' ? 42 : 14,
	},
	titleView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'red',
	},
	verticalTitle: {
		color: 'black',
		fontSize: 22,
		lineHeight: 18,
		fontWeight: theme.simple.fontWeight.semibold,
		paddingTop: 3,
		marginTop: 4,
	},
	btnLeft: {
		paddingVertical: 8,
		paddingRight: 8,
		alignItems: 'center',
		flexDirection: 'row',
		// backgroundColor: 'blue',
		marginLeft: -20,
		paddingLeft: 20,
	},
	btnRight: {
		paddingVertical: 8,
		paddingLeft: 8,
		alignItems: 'center',
		flexDirection: 'row',
		// backgroundColor: 'blue',
		marginRight: -20,
		paddingRight: 20,
	},
	horizontalTitle: {
		lineHeight: 18,
		fontSize: 16,
		fontWeight: theme.simple.fontWeight.bold,
		color: theme.color.PRIMARY_TEXT,
		textAlign: 'center',
		letterSpacing: 0.4,
	},
	item: {
		width: 81,
	},
});
