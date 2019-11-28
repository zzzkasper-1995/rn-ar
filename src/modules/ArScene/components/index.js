import React, {Component} from 'react';
import {ViroARSceneNavigator} from 'react-viro';
import {BindComponent, View, Button} from '../../../library';

import Styles from './styles';

// Sets the default scene you want for AR and VR
const InitialARScene = require('./AR/HelloWorldSceneAR');

export default class ViroSample extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 'image',
		};

		BindComponent(this, {
			styles: Styles,
			isBack: true,
		});
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<ViroARSceneNavigator numberOfTrackedImages={4} initialScene={{scene: InitialARScene}} />

				<View style={{position: 'absolute', left: 20, right: 20, bottom: 20}}>
					<Button
						full
						text='Show image'
						onAction={() => this.setState({type: 'image'})}
						style={{marginBottom: 10}}
					/>
					<Button full text='Show video' onAction={() => this.setState({type: 'video'})} />
				</View>
			</View>
		);
	}
}
