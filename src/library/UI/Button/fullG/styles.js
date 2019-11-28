export default theme => ({
	container: {
		flexDirection: 'row',
	},
	icon: {
		marginRight: 8,
		width: 16,
		height: 16,
	},
	inButtonContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},

	btnFull: {
		flex: 1,
		flexDirection: 'row',
		height: 52,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		overflow: 'hidden',
		backgroundColor: theme.color.BLUE,
	},
	textBtnFull: {
		fontSize: 17,
		fontWeight: theme.simple.fontWeight.semibold,
		color: theme.color.WHITE,
	},
	absolute: {
		position: 'absolute',
		top: 8,
		left: 0,
		right: 0,
		height: 52,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
