import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {Image as RNImage} from 'react-native';
import {View} from '../View';
import {Text} from '../Text';

import IMAGE from './sourses';
import Styles from './styles';
import {BindSimple} from '../../Component';

/**
 * @module ImageView
 * @description Блок с картинкой
 */
/**
 * @param {String} name имя картинки, если отображаеться из списка имеющихся
 * @param {Object} style стиль иконки (в том числе высота и ширина)
 * @param {Object} uri uri до картинки, на пример 'www.google.com/yeuiyriy'
 * @param {String} resizeMode тип автоподгонки картинки
 * @param {Boolean} isFast использовать более оптимизированный компонент для вывода картинок (FastImage) или обычный Image
 * @param {Boolean} isReq используем сетевой запрос дл получения картинки
 * @param {Object} headers  шапка запроса
 * @param {String} priority  поретет запроса (normal,low,high)
 * @param {String} cache (immutable,web,cacheOnly)
 */

class ImageView extends React.Component {
	constructor(props) {
		super(props);
		BindSimple(this, {styles: Styles});
	}

	render() {
		const {styles, props, compose} = this;
		const {
			style,
			name,
			uri,
			resizeMode,
			isFast,
			headers,
			priority,
			cache,
			text,
			isActive,
			fadeDuration,
		} = props;
		const styleImg = compose(
			styles.image,
			style,
		);

		if (isFast) {
			if (uri) {
				return text ? (
					<View
						style={compose(
							styleImg,
							styles.reserveView,
						)}
					>
						{text && text.length >= 1 ? (
							<Text style={styles.text}>{text.toUpperCase()[0]}</Text>
						) : null}

						<FastImage
							style={[styleImg, {position: 'absolute', top: 0, left: 0}]}
							source={uri}
							resizeMode={FastImage.resizeMode[resizeMode]}
							fadeDuration={fadeDuration}
						/>
					</View>
				) : (
					<FastImage
						style={styleImg}
						source={uri}
						resizeMode={FastImage.resizeMode[resizeMode]}
						fadeDuration={fadeDuration}
					/>
				);
			}
			if (name) {
				return (
					<FastImage
						style={styleImg}
						source={IMAGE[name]}
						resizeMode={FastImage.resizeMode[resizeMode]}
						fadeDuration={fadeDuration}
					/>
				);
			}
			return (
				<View
					style={compose(
						styleImg,
						styles.reserveView,
					)}
				>
					{text && text.length >= 1 ? (
						<Text style={styles.text}>{text && text.toUpperCase()[0]}</Text>
					) : null}
				</View>
			);
		}
		return (
			<RNImage
				style={styleImg}
				source={uri || IMAGE[name]}
				resizeMode={resizeMode}
				fadeDuration={fadeDuration}
			/>
		);
	}
}

ImageView.propTypes = {
	name: PropTypes.string,
	style: PropTypes.any,
	uri: PropTypes.oneOfType([PropTypes.shape({uri: PropTypes.string}), PropTypes.number]),
	resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch', 'repeat', 'center']),
	isFast: PropTypes.bool,
	isReq: PropTypes.bool,
	text: PropTypes.string,
	fadeDuration: PropTypes.number,
};

ImageView.defaultProps = {
	name: undefined,
	style: {},
	uri: undefined,
	resizeMode: 'contain',
	isFast: true,
	text: undefined,
	fadeDuration: 3000,
};

export {ImageView as Image, IMAGE as ImageSources};
