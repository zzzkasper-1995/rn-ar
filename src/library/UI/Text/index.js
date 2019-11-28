import React from 'react';
import {Text as RNText} from 'react-native';
import TextHTML from 'react-native-render-html';
import {I} from '../../I18n';
import {BindSimple} from '../../Component';
import Styles from './styles';

/**
 * Обертка над текстом
 *
 * @class Text
 * @extends {React.PureComponent}
 */
class Text extends React.PureComponent {
	constructor(props) {
		super(props);
		BindSimple(this, {styles: Styles});
	}

	render() {
		const {styles, props} = this;
		const {style, children, i18n, html, ...other} = props;
		if (html && i18n)
			return (
				<TextHTML
					html={I.text(children || '')}
					imagesMaxWidth={styles.screen.width}
					baseFontStyle={style}
					{...other}
				/>
			);
		if (html)
			return (
				<TextHTML
					html={children}
					imagesMaxWidth={styles.screen.width}
					baseFontStyle={style}
					{...other}
				/>
			);
		if (i18n)
			return (
				<RNText {...this.props} style={{...styles.text, ...style}}>
					{I.text(children || '')}
				</RNText>
			);

		return <RNText {...this.props} style={{...styles.text, ...style}} />;
	}
}

export {Text};
