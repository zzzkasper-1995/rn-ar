import React, {Component} from 'react';
import {ViroARSceneNavigator} from 'react-viro';
import {BindComponent, View, Button} from '../../../library';
import InitialARScene from './AR';
import Styles from './styles';

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
  
  handleShowImage = () => {
    this.setState({type: 'image'})
  }

  handleShowVideo = () => {
    this.setState({type: 'video'})
  }

	render() {
		const {styles, compose} = this;
		const {type} = this.state;

		return (
			<View style={{flex: 1}}>
				<ViroARSceneNavigator
					numberOfTrackedImages={4}
					initialScene={{scene: InitialARScene}}
					viroAppProps={{type}}
				/>

				<View style={styles.btnsView}>
					<Button
						full
						text='Show image'
						onAction={this.handleShowImage}
						style={compose(
							styles.btn,
							{borderWidth: type === 'image' ? 2 : 0},
						)}
					/>
					<Button
						full
						text='Show video'
						onAction={this.handleShowVideo}
						style={compose(
							styles.btn,
							{borderWidth: type === 'video' ? 2 : 0},
						)}
					/>
				</View>
			</View>
		);
	}
}
