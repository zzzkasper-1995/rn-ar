export default theme => ({
	mainView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	btn: {
		width: 36,
		...theme.view.circle,
	},
	text: {
		fontSize: 12,
		textAlign: 'center',
		fontWeight: theme.simple.fontWeight.bold,
	},
	textView: {
		width: 44,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnText: {
		...theme.text.smallBold,
	},
});
