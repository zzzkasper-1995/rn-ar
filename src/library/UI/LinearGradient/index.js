import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
// https://github.com/react-native-community/react-native-linear-gradient

/**
 * @module InitflowLinearGradient
 * @description градиент
 */
class InitflowLinearGradient extends React.PureComponent {
	render() {
		const {radial, ...other} = this.props;

		if (radial) {
			return <RadialGradient {...other} />;
		}
		return <LinearGradient {...other} />;
	}
}

InitflowLinearGradient.propTypes = {
	...LinearGradient.PropTypes,
};

export {InitflowLinearGradient as LinearGradient};
