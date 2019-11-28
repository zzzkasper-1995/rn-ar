import React from 'react';
import {SafeAreaView, Platform} from 'react-native';
import {VibrancyView} from '@react-native-community/blur';
import styles from './styles';
import {} from '../../library';
import {} from '../../core/navigation';

export class BlurOverlay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {backgroundImage: null};
	}

	render() {
		if (Platform.OS === 'ios') {
			return (
				<SafeAreaView style={styles.main}>
					<VibrancyView blurType='light' style={styles.flex}>
						<></>
					</VibrancyView>
				</SafeAreaView>
			);
		}
		return null;
	}
}
