import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default theme => ({
	itemContainer: {
		width: width / 7,
		flex: 1,
		height: 50,
	},
	itemWrapButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	itemView: {
		width: 36,
		...theme.view.circle,
	},
	selectItemView: {
		...theme.view.circle,
		borderWidth: undefined,
		width: 36,
		backgroundColor: theme.color.DARK_TEXT,
	},
	disableItemView: {
		...theme.view.circle,
		borderWidth: undefined,
		width: 36,
		backgroundColor: theme.color.BORDER,
	},
	itemDateText: {
		...theme.text.smallBold,
	},
	selectItemDateText: {
		...theme.text.smallBold,
		color: theme.color.WHITE,
		opacity: 1,
	},
	itemBottomDot: {
		width: 4,
		left: 20,
		height: 4,
		bottom: 4,
		borderRadius: 2,
		position: 'absolute',
		backgroundColor: theme.color.DARK_TEXT,
	},
	selectItemBottomDot: {
		width: 4,
		left: 20,
		height: 4,
		bottom: 4,
		borderRadius: 2,
		position: 'absolute',
		backgroundColor: theme.color.WHITE,
	},
});
