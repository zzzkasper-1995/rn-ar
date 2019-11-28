export default theme => ({
	mainContainer: {
		flex: 1,
	},
	colorIcon: theme.color.GOLD,
	colorBtn: theme.color.BLUE_BTN_SIMPLE,
	imageGif: {
		position: 'absolute',
		left: 0,
		top: theme.simple.sizeScreen.height * 0.65,
		width: theme.simple.sizeScreen.width,
		height: theme.simple.sizeScreen.height * 0.35,
	},
});
