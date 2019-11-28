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

	btnAround: {
		flex: 1,
		flexDirection: 'row',
		height: 52,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 4,
		borderWidth: 1,
		borderColor: theme.color.GRAY_BORDER,
	},
	textBtnAround: {
		fontSize: 14,
		color: 'black',
	},
});
