import React from 'react';
import {Animated} from 'react-native';

const DURATION = 200;

class ScaleView extends React.PureComponent {
	constructor(props) {
		super(props);
		this.scaleValue = new Animated.Value(1);
	}

	animateBig = () => {
		Animated.timing(this.scaleValue, {
			toValue: 0.95,
			duration: DURATION,
			useNativeDriver: true,
		}).start();
	};

	animateLitle = () => {
		Animated.timing(this.scaleValue, {
			toValue: 1,
			duration: DURATION,
			useNativeDriver: true,
		}).start();
	};

	render() {
		const {style, render, children, ...props} = this.props;

		const scale = {
			transform: [
				{
					scale: this.scaleValue,
				},
			],
		};

		const touchProps = {
			onPressIn: this.animateBig,
			onPressOut: this.animateLitle,
		};

		return (
			<Animated.View style={[scale, style, {flex: 1}]} {...props}>
				{render && render(touchProps)}
			</Animated.View>
		);
	}
}

export {ScaleView};
