export default theme => ({
	mainView: {
		paddingHorizontal: 16,
		...theme.view.circle,
		opacity: 1,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	text: {
		fontSize: 12,
		fontWeight: theme.simple.fontWeight.bold,
		color: theme.color.PRIMARY_TEXT,
	},
	iconContainer: {
		top: 10,
		right: 12,
	},
	rowStyle: {
		fontSize: 16,
		fontWeight: theme.simple.fontWeight.medium,
		color: theme.color.PRIMARY_TEXT,
	},
});
