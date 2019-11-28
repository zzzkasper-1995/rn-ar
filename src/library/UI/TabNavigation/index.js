/* eslint-disable class-methods-use-this */
import React from 'react';
import {ScrollTab} from './ScrollTab';
import {NavigatorTab} from './NavigatorTab';
import {MaterialNavigator} from './NavigatorMaterialTab';

class TabNavigator extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const {props} = this;
		const {isScroll, isMaterial, ...other} = props;
		if (isScroll) return <ScrollTab {...other} />;
		if (isMaterial) return <MaterialNavigator {...other} />;

		return <NavigatorTab {...other} />;
	}
}

export {TabNavigator};
