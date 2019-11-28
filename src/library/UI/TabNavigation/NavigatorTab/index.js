/* eslint-disable class-methods-use-this */
import React from 'react';

import {createBottomTabNavigator, createAppContainer} from 'react-navigation';

import NavigationService from '../NavigationService';

class NavigatorTab extends React.PureComponent {
	constructor(props) {
		super(props);
		const {screens, options} = props;
		this.tab = createAppContainer(createBottomTabNavigator(screens, options));
	}

	render() {
		const {props} = this;
		const {screens, options, reference, ...other} = props;

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
export {NavigatorTab};
