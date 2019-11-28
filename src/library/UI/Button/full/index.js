import React from 'react';

import PropTypes from 'prop-types';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import {Icon} from '../../Icon';
import {Text} from '../../Text';
import {View} from '../../View';
import Styles from './styles';
import {BindSimple} from '../../../Component';

const OPACITY = 0.7;

/**
 * @param {Function} onAction функция срабатываемая при нажатии
 * @param {String} text текст в нутри кнопки
 * @param {String} type тип кнопки
 * @param {String} color цвет кнопки в активном состоянии
 * @param {String} disabledColor цвет кнопки в неактивном состоянии
 * @param {String} icon название иконки отображаемой в кнопке
 * @param {Object} iconStyle стиль для иконки
 * @param {Object} style стили
 * @param {Boolean} isLoadBar нужен ли индикатор загрузки
 * @param {Boolean} enable активна кнопка или нет
 * @param {Number} activeOpacity прозрачность кнопки
 */
class Full extends React.Component {
	constructor(props) {
		super(props);
		BindSimple(this, {styles: Styles});
	}

	render() {
		const {styles, props} = this;

		const {
			onAction,
			text,
			color,
			style,
			icon,
			iconStyle,
			isLoadBar,
			enable = true,
			disabledColor,
			activeOpacity,
			activityIndicator,
		} = props;

		const styleFull = [
			styles.btnFull,
			style,
			color && {backgroundColor: color},
			!disabledColor && (!enable || isLoadBar) && {opacity: OPACITY},
			disabledColor && (!enable || isLoadBar) && {backgroundColor: disabledColor},
		];

		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={styleFull}
					onPress={onAction}
					activeOpacity={activeOpacity || OPACITY}
					disabled={isLoadBar || !enable}
				>
					<View style={styles.inButtonContainer}>
						{isLoadBar ? (
							activityIndicator ? (
								activityIndicator()
							) : (
								<ActivityIndicator size='large' color='white' />
							)
						) : (
							<>
								{icon && <Icon name={icon} style={styles.icon} style={iconStyle} />}
								<Text style={styles.textBtnFull} i18n ellipsizeMode='tail' numberOfLines={1}>
									{text}
								</Text>
							</>
						)}
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

Full.propTypes = {
	onAction: PropTypes.func,
	text: PropTypes.string,
	color: PropTypes.string,
	disabledColor: PropTypes.string,
	icon: PropTypes.string,
	iconStyle: PropTypes.any,
	enable: PropTypes.bool,
	isLoadBar: PropTypes.bool,
	style: PropTypes.any,
	activeOpacity: PropTypes.number,
};

Full.defaultProps = {
	onAction: () => {},
	text: undefined,
	color: undefined,
	disabledColor: undefined,
	icon: undefined,
	iconStyle: {},
	enable: true,
	isLoadBar: false,
	style: {},
	activeOpacity: 0.7,
};

export {Full};
