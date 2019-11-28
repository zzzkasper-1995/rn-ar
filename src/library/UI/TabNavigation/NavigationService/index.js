import {NavigationActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
	if (navigatorRef) {
		_navigator = navigatorRef;
	}
}

/** выполняет навигацию */
function navigate(routeName, params) {
	_navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params,
		}),
	);
}

/** возвращает состояние навигации */
function getState() {
	return _navigator ? _navigator.state.nav : {};
}

function goBack() {
	_navigator && _navigator._navigation.goBack();
}

// add other navigation functions that you need and export them

export default {
	goBack,
	getState,
	navigate,
	setTopLevelNavigator,
};
