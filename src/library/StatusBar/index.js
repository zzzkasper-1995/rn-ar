import {StatusBar, Platform} from 'react-native';

function InitflowStatusBar() {}

InitflowStatusBar.setStyle = ({backgroundColor, barStyle, animated, hidden, translucent}) => {
	Platform.select({
		ios: () => {
			barStyle !== undefined ? StatusBar.setBarStyle(barStyle, animated) : undefined;
			hidden !== undefined ? StatusBar.setHidden(hidden, animated) : undefined;
		},
		android: () => {
			backgroundColor !== undefined
				? StatusBar.setBackgroundColor(backgroundColor, animated)
				: undefined;
			barStyle !== undefined ? StatusBar.setBarStyle(barStyle, animated) : undefined;
			translucent !== undefined ? StatusBar.setTranslucent(translucent) : undefined;
			hidden !== undefined ? StatusBar.setHidden(hidden, animated) : undefined;
		},
	})();
};

InitflowStatusBar.setDarkTranslucent = params => {
	const {translucent, colorBackStatusBar} = params || {};
	const trans = translucent === undefined ? true : translucent;
	InitflowStatusBar.setStyle({
		backgroundColor: colorBackStatusBar || 'rgba(255,255,255,0)',
		barStyle: 'dark-content',
		translucent: trans,
		hidden: false,
		animated: false,
	});
};

InitflowStatusBar.setLigthTranslucent = params => {
	const {translucent, colorBackStatusBar} = params || {};
	const trans = translucent === undefined ? true : translucent;
	InitflowStatusBar.setStyle({
		backgroundColor: colorBackStatusBar || 'rgba(255,255,255,0)',
		barStyle: 'light-content',
		translucent: trans,
		hidden: false,
		animated: false,
	});
};

InitflowStatusBar.hide = params => {
	const {translucent, colorBackStatusBar} = params || {};
	const trans = translucent === undefined ? true : translucent;
	InitflowStatusBar.setStyle({
		backgroundColor: colorBackStatusBar || 'rgba(255,255,255,0)',
		barStyle: 'light-content',
		translucent: trans,
		hidden: true,
		animated: false,
	});
};

export {InitflowStatusBar as StatusBar};
