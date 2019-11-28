import React, {PureComponent} from 'react';
import {ActivityIndicator, Animated, View} from 'react-native';
import {LinearGradient} from '../../LinearGradient';
import {BindSimple} from '../../../Component';
import Styles from './styles';

const DURATION = 2000 ;

export default class ActivityIndicatorFlow extends PureComponent {
	constructor(props) {
		super(props);
		BindSimple(this, {styles: Styles});
		this.state = {width: 1}
		this.transform = new Animated.Value(0);
		this.transform2 = new Animated.Value(0);
	}

	componentDidMount() {
		this.animate()
		setTimeout(this.animate2, DURATION/2)
	}

	_onLayout = event => {
		this.setState({width: event.nativeEvent.layout.width});
	};

	animate = () => {
		this.transform.stopAnimation();
		this.transform.setValue(0);

		Animated.timing(this.transform, {
			toValue: 1,
			duration: DURATION,
			useNativeDriver: true,
		}).start(e => {
			if (e.finished) {
				this.animate()
			}
		});
	};

	animate2 = () => {
		this.transform2.stopAnimation();
		this.transform2.setValue(0);

		Animated.timing(this.transform2, {
			toValue: 1,
			duration: DURATION,
			useNativeDriver: true,
		}).start(e => {
			if (e.finished) {
				this.animate2()
			}
		});
	};

	render() {
		const {styles} = this;
		const {style={}, animating} = this.props;

		const translate = {
			transform: [
				{
					scaleX: this.transform.interpolate({
						inputRange: [0, 0.5, 1],
						outputRange: [0.5, 1, 0.5],
					}),
				},
				{
					translateX: this.transform.interpolate({
						inputRange: [0, 1],
						outputRange: [-this.state.width*1.5, this.state.width*1.5],
					}),
				},
			],
		};

		const translate2 = {
			transform: [
				{
					scaleX: this.transform2.interpolate({
						inputRange: [0, 0.5, 1],
						outputRange: [0.5, 1, 0.5],
					}),
				},
				{
					translateX: this.transform2.interpolate({
						inputRange: [0, 1],
						outputRange: [-this.state.width*1.7, this.state.width*1.7],
					}),
				},
			],
		};

		if(animating) {
			return (
				<View style={{...styles.main, ...style}} onLayout={this._onLayout}>
					<Animated.View style={[styles.runer, translate]} />
					<Animated.View style={[styles.runer, translate2]} />
				</View>
			);
		}
		return null
	}
}
