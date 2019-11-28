import React, {Component} from 'react';
import {Image, View} from 'react-native';
import images from '../../assets/images';
import styles from './styles';

export default class SwipeIcon extends Component {
	constructor(props) {
		super(props);
		this.state = {
			icon: images.minus,
			showIcon: false,
		};
	}

	componentDidMount() {
		this.props.hasRef && this.props.hasRef(this);
	}

	toggleShowHide(val) {
		this.setState({showIcon: val});
	}

	render() {
		const {icon, showIcon} = this.state;
		return (
			<View style={styles.mainView}>
				{showIcon && (
					<Image source={icon} style={[styles.icon, {height: icon === images.minus ? 5 : 10}]} />
				)}
			</View>
		);
	}
}
