import PropTypes from 'prop-types';
import React from 'react';
import {Image} from 'react-native';
import VIcon from 'react-native-vector-icons/FontAwesome';
import IMAGE from './sources';
import Styles from './styles';
import {BindSimple} from '../../Component';

/**
 * @param {String} name имя иконки
 * @param {Object} style стиль иконки (в том числе высота и ширина)
 * @param {String} color цвет иконки
 */
class Icon extends React.Component {
	constructor(props) {
		super(props);
		BindSimple(this, {styles: Styles});
	}

	render() {
		const {styles, props} = this;
		const {style, name, color, vector} = props;

		const styleIc = [styles.icon, color && {tintColor: color}, style];
		return vector ? (
			<VIcon {...props} />
		) : (
			<Image style={styleIc} source={IMAGE[name]} resizeMode='contain' fadeDuration={0} />
		);
	}
}
Icon.propTypes = {
	name: PropTypes.string.isRequired,
	style: PropTypes.object,
	color: PropTypes.string,
};

Icon.defaultProps = {
	style: {},
	color: undefined,
};

export {Icon, IMAGE as IconSources};
