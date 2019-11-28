import React, {PureComponent} from 'react';
import {Animated, Platform} from 'react-native';

const DURATION = Platform.OS === 'ios' ? 200 : 200;

export default class LateView extends PureComponent {
	constructor(props) {
		super(props);
		this.opacity = new Animated.Value(0);
	}

	componentDidMount() {
		this.animateShow();
	}

	animateShow = () => {
		const {duration} = this.props;

		Animated.timing(this.opacity, {
			toValue: 1,
			duration: duration || DURATION,
			useNativeDriver: true,
		}).start();
	};

	render() {
		const {style, children} = this.props;

		const opacity = {
			opacity: this.opacity.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 1],
			}),
		};

		return <Animated.View style={[style, opacity]}>{children}</Animated.View>;
	}
}
