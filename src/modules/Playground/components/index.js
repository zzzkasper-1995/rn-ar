import React from 'react';
import Styles from './styles';
import {Text, View, Spacer, BindComponent, Button, Log} from '../../../library';

export default class Screen extends React.PureComponent {
	constructor(props) {
		super(props);

		Log('BBB', this);
		BindComponent(this, {
			styles: Styles,
			isBack: true,
		});
	}

	render() {
		const {styles, props, onBack} = this;
		const {onOpenOnboarding} = props;

		return (
			<View style={styles.mainContainer}>
				<Button full onAction={onBack} text='Hello, I am Playground' color={styles.colorBtn} />
				<Button full onAction={onOpenOnboarding} text='Open Onboarding' color={styles.colorBtn} />
			</View>
		);
	}
}
