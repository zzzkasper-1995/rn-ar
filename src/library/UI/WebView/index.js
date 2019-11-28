import React from 'react';
import {} from 'react-native';
import {WebView as Web} from 'react-native-webview';
import Styles from './styles';
import {BindSimple} from '../../Component';

/**
 *  Обетка над видженом
 *
 * @class View
 * @extends {React.PureComponent}
 */
class WebView extends React.PureComponent {
	constructor(props) {
		super(props);
		BindSimple(this, {styles: Styles});
	}

	render() {
		const {styles, props} = this;
		const {source, style, reference, ...other} = props;
		const sty = {...style, ...styles.web};
		return (
			<Web
				ref={ref => {
					reference && reference(ref);
					this.web = ref;
				}}
				source={source}
				style={sty}
				{...other}
			/>
		);
	}
}

export {WebView};
