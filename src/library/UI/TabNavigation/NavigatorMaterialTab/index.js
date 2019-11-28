/* eslint-disable class-methods-use-this */
import React from 'react';

import {
	createMaterialTopTabNavigator,
	createMaterialBottomTabNavigator,
	createAppContainer,
} from 'react-navigation';

import NavigationService from '../NavigationService';

class NavigatorTab extends React.PureComponent {
	constructor(props) {
		super(props);
		const {screens, options, isBottom} = props;
		if (isBottom) {
			this.tab = createAppContainer(createMaterialBottomTabNavigator(screens, options));
		} else {
			this.tab = createAppContainer(createMaterialTopTabNavigator(screens, options));
		}
	}

	render() {
		const {props} = this;
		const {screens, options, reference, isBottom, ...other} = props;

		return (
			<this.tab
				ref={navigatorRef => {
					NavigationService.setTopLevelNavigator(navigatorRef);
					reference && reference(NavigationService);
				}}
				{...other}
			/>
		);
	}
}
export {NavigatorTab as MaterialNavigator};
