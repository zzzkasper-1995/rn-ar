/* eslint-disable class-methods-use-this */
import React from 'react';
import {Animated} from 'react-native';
import {BindSimple} from '../../../Component';
import Styles from './styles';

export default class Circle extends React.PureComponent {
	constructor(props) {
		super(props);

		BindSimple(this, {
			styles: Styles,
		});
	}

	render() {
		// console.log('Circle', this.props);
		const {styles, props} = this;
		const {item, index, animatedValue, width} = props;

		const opacity = animatedValue.interpolate({
			inputRange: [
				width * (index - 1) - 10,
				width * (index - 1),
				width * index,
				width * (index + 1),
				width * (index + 1) + 10,
			],
			outputRange: [0.5, 0.5, 1, 0.5, 0.5],
		});

		const transform = [
			{
				scale: animatedValue.interpolate({
					inputRange: [
						width * (index - 1) - 10,
						width * (index - 1),
						width * index,
						width * (index + 1),
						width * (index + 1) + 10,
					],
					outputRange: [1, 1, 1.5, 1, 1],
				}),
			},
		];

		return <Animated.View style={{...styles.mainView, opacity, transform}}></Animated.View>;
	}
}
