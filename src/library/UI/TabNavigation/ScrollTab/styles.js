export default theme => ({
	mainView: {},
	icon: {
		width: 56,
		height: 56,
		marginBottom: 6,
	},
	item: {
		flex: 1,
		// width: (theme.simple.sizeScreen.width - 40 * 2) / 3,
		alignItems: 'center',
	},
	text: {
		fontSize: 12,
		fontWeight: theme.simple.fontWeight.medium,
		color: theme.color.DARK_TEXT,
		marginBottom: 48,
		textAlign: 'center',
	},
	size: {
		width: theme.simple.sizeScreen.width,
	},
	tabBar: {
		position: 'absolute',
		bottom: 60,
		left: 0,
		right: 0,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	scroll: {
		...theme.view.absolute,
	},
	content: {
		position: 'absolute',
		left: 0,
		top: 0,
		bottom: 0,
	},
});
