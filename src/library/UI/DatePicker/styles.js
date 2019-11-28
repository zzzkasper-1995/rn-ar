export default theme => ({
	mainView: {
		justifyContent: 'space-between',
		alignItems: 'center',
		maxWidth: 140,
		height: 36,
		borderRadius: 18,
		backgroundColor: theme.color.WHITE,
		borderWidth: 2,
		borderColor: theme.color.PLACEHOLDER,
		flexDirection: 'row',
		paddingHorizontal: 10,
		flex: 1,
	},
	main: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	icon: {
		margin: 2,
		width: 6,
		height: 6,
		transform: [{rotate: '90deg'}],
	},
	time: {
		fontSize: 12,
		textAlign: 'center',
		fontWeight: theme.simple.fontWeight.bold,
		marginHorizontal: 8,
	},
	timeView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		maxWidth: 110,
		flex: 1,
	},
	sign: {
		...theme.text.smallBold,
	},
});
