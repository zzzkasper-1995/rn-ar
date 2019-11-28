import React from 'react';
import Styles from './styles';
import {View, BindComponent, Button, Log, ActivityIndicator} from '../../../library';

export default class Screen extends React.PureComponent {
	constructor(props) {
		super(props);
		BindComponent(this, {
			styles: Styles,
			isBack: true, // работает ли бек
			statusBar: 'light',
		});
	}

	componentDidMount() {}

	componentWillUnmount() {}

	componentAppear() {}

	componentDisappear() {}

	render() {
		const {styles, props, onBack, state} = this;
		const {isLoadScreen} = state;

		return (
			<View safeArea style={styles.mainContainer}>
				<Button onAction={onBack} text='Hello, I am Indicators' />
				{isLoadScreen ? (
					<>
						<ActivityIndicator material color={styles.indicatorColor} />
						<ActivityIndicator
							dot
							color={styles.indicatorColor}
							count={3}
							animationDuration={800}
						/>
						<ActivityIndicator ball color={styles.indicatorColor} animationDuration={800} />
						<ActivityIndicator pulse color={styles.indicatorColor} />
						<ActivityIndicator bar color={styles.indicatorColor} count={5} />
						<ActivityIndicator pacman color={styles.indicatorColor} />
						<ActivityIndicator color={styles.indicatorColor} />
						<ActivityIndicator skype color={styles.indicatorColor} />
					</>
				) : (
					<ActivityIndicator
						block
						color={styles.indicatorColor}
						indicators={() => <ActivityIndicator pacman color={styles.indicatorColor} />}
						animating
					/>
				)}
			</View>
		);
	}
}
