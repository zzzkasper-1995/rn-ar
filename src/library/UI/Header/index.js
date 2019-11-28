import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native';
import {Button} from '../Button';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {View} from '../View';

import Styles from './styles';
import {BindSimple} from '../../Component';

/**
 * @module Header
 * @description верхний бар инструментов
 */
/**
 * @param {String} title надпись
 * @param {Object} leftItem кнопка с лева от title
 * @param {Object} rightItem кнопка с права от title
 * @param {String} color цвет header
 * @param {Any} style
 * @param {Boolean} vertical флаг, если true то отображать header вертикально иначе горизонтально
 */
class Header extends React.PureComponent {
	constructor(props) {
		super(props);
		BindSimple(this, {styles: Styles});
	}

	render() {
		const {styles, props} = this;
		const {leftItem, rightItem, title, color, style = {}, topSpace} = props;

		return (
			<SafeAreaView style={styles.safeArea}>
				<View
					style={{
						...styles.rowView,
						...(topSpace && styles.topSpace),
						...style,
					}}
				>
					{leftItem ? (
						<View style={styles.item}>{leftItem}</View>
					) : rightItem ? (
						<View style={styles.item} />
					) : null}
					{title ? (
						<View style={styles.titleView}>
							<Text
								style={{
									...styles.horizontalTitle,
									...(color && {color}),
								}}
							>
								{title}
							</Text>
						</View>
					) : (
						<View style={{flex: 1}} />
					)}
					{rightItem ? (
						<View style={styles.item}>{rightItem}</View>
					) : leftItem ? (
						<View style={styles.item} />
					) : null}
					<View />
				</View>
			</SafeAreaView>
		);
	}
}

Header.propTypes = {
	leftItem: PropTypes.node,
	rightItem: PropTypes.node,
	title: PropTypes.string,
	color: PropTypes.string,
	style: PropTypes.any,
	topSpace: PropTypes.bool,
};

Header.defaultProps = {
	// элемнт управления расположенный в левой части Руader
	leftItem: undefined,
	// элемнт управления расположенный в правой части Руader
	rightItem: undefined,
	// заголовок
	title: undefined,
	// цвет содержимого
	color: undefined,
	style: undefined,
	topSpace: false,
};

export {Header};
