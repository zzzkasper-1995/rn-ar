import React from 'react';
import {View} from 'react-native';

/**
 *
 *
 * @class Spacer
 * @extends {React.PureComponent}
 */

class Spacer extends React.PureComponent {
	render() {
		const {h, w, style} = this.props;
		return (
			<View
				style={{
					...{
						height: h,
						width: w,
					},
					...style,
				}}
			/>
		);
	}
}

Spacer.defaultProps = {
	h: 0,
	w: 0,
};

export {Spacer};
