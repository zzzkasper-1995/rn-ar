import React from 'react';
import BallIndicator from './ball-indicator';
import DotIndicator from './dot-indicator';
import BarIndicator from './bar-indicator';
import MaterialIndicator from './material-indicator';
import PacmanIndicator from './pacman-indicator';
import PulseIndicator from './pulse-indicator';
import SkypeIndicator from './skype-indicator';
import ActivityIndicators from './ui-activity-indicator';
import BlockIndicator from './block-indicator';
import HorizontalIndicator from './horizontal-indicator';

class ActivityIndicator extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {props} = this;
		const {ball, dot, bar, material, pacman, pulse, skype, block, horizontal, ...other} = props;

		if (ball) {
			return <BallIndicator {...other} />;
		}
		if (dot) {
			return <DotIndicator {...other} />;
		}
		if (bar) {
			return <BarIndicator {...other} />;
		}
		if (material) {
			return <MaterialIndicator {...other} />;
		}
		if (pacman) {
			return <PacmanIndicator {...other} />;
		}
		if (pulse) {
			return <PulseIndicator {...other} />;
		}
		if (skype) {
			return <SkypeIndicator {...other} />;
		}
		if (block) {
			return <BlockIndicator {...other} />;
		}
		if (horizontal) {
			return <HorizontalIndicator {...other} />;
		}

		return <ActivityIndicators {...other} />;
	}
}

export {ActivityIndicator};
