import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text, Theme} from '../../library';

export const Offline = () => (
	<SafeAreaView
		style={Theme.createStyles(theme => ({
			flex: 0.04,
			backgroundColor: 'red',
			alignItems: 'center',
			justifyContent: 'center',
			borderBottomLeftRadius: 5,
			borderBottomRightRadius: 5,
		}))}
	>
		<Text>Offline </Text>
	</SafeAreaView>
);
