import React from 'react';
import {TouchableOpacity, Keyboard} from 'react-native';
import PropTypes from 'prop-types';
import {Simple} from './simple';
import {Full} from './full';
import {Around} from './around';
import {FullG} from './fullG';

/**
 * @module Button
 * @description Кнопка
 */
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
 * @param {Boolean} keyDismiss нужно ли скрывать клаву при нажатии
 */
class Button extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	handleOnAction = () => {		
		const {onAction, keyDismiss} = this.props;

		if(keyDismiss){
			requestAnimationFrame(Keyboard.dismiss)
		}
		onAction()
	}

	render() {
		const {props} = this;

		const {fullG, simple, full, around, onAction, activeOpacity, ...other} = props;

		if (fullG) {
			return <FullG {...other} onAction={this.handleOnAction} activeOpacity={activeOpacity} />;
		}
		if (simple) {
			return <Simple {...other} onAction={this.handleOnAction} activeOpacity={activeOpacity} />;
		}
		if (full) {
			return <Full {...other} onAction={this.handleOnAction} activeOpacity={activeOpacity} />;
		}
		if (around) {
			return <Around {...other} onAction={this.handleOnAction} activeOpacity={activeOpacity} />;
		}

		return <TouchableOpacity activeOpacity={activeOpacity} {...other} onPress={onAction} />;
	}
}

Button.propTypes = {
	onAction: PropTypes.func,
	fullG: PropTypes.bool,
	simple: PropTypes.bool,
	full: PropTypes.bool,
	around: PropTypes.bool,
	activeOpacity: PropTypes.number,
	keyDismiss: PropTypes.bool
};

Button.defaultProps = {
	onAction: () => {},
	fullG: false,
	simple: false,
	full: false,
	around: false,
	activeOpacity: 0.7,
	keyDismiss: true,
};

export {Button};
