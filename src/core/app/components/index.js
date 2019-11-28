import React from 'react';
import {AnalyticService} from '../../analytic-service';
import {traking} from '../../navigation';
import Styles from './styles';
import {Text, View, BindComponent, Button, Spacer, I, Icon, Log, Image} from '../../../library';

const theme = '';

export default class Screen extends React.PureComponent {
	constructor(props) {
		super(props);
		// ...
		BindComponent(this, {
			styles: Styles,
			statusBar: 'hide',
		});
		traking(props.componentId, {analytic: AnalyticService});
	}

	componentDidMount() {
		const {props} = this;
		const {onInit} = props;
		onInit(this);
	}

	render() {
		return null;
	}
}
