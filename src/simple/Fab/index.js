import React from 'react';

import ActionButton from 'react-native-action-button';
import Styles from './styles';
import {View, Text, Theme, BindSimple} from '../../library';

export class Fab extends React.Component {
	constructor(props) {
		super(props);
		BindSimple(this, {styles: Styles});
	}

	setButtons(buttons) {
		console.log(buttons);
	}

	render() {
		return null;
		// return (
		// 	<ActionButton
		// 		buttonColor={Color.PINK}
		// 		bgColor={Color.BLUE_FAB_BC}
		// 		shadowStyle={{}}
		// 		fixNativeFeedbackRadius
		// 		nativeFeedbackRippleColor='rgba(255,148,163,0.7)'
		// 		position='right'
		// 		activeOpacity={0.7}
		// 		size={56}
		// 		spacing={16}
		// 		offsetX={16}
		// 		offsetY={16 + 32}
		// 		outRangeScale={1.25}
		// 		onReset={() => {
		// 			// setTimeout(() => actionFabPress && actionFabPress(), 200);
		// 			// this.setState({isActivePressFab: false});
		// 			console.log('reset');
		// 		}}
		// 		onPress={() => {
		// 			console.log('set');
		// 			// !isActivePressFab
		// 			// 	? actionFabPress && actionFabPress()
		// 			// 	: setTimeout(() => actionFabPress && actionFabPress(), 200);
		// 			// this.setState({isActivePressFab: !isActivePressFab});
		// 		}}
		// 		renderIcon={renderIcon}
		// 		degrees={degrees !== undefined ? degrees : -45}
		// 	/>
		// );
	}
}
