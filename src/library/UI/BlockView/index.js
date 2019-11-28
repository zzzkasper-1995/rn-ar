import {View as RNView} from 'react-native';
import React from 'react';
import Styles from './styles';
import {BindSimple} from '../../Component';

/**
 *  Обетка над видженом
 *
 * @class BlockView
 * @extends {React.PureComponent}
 */
class BlockView extends React.PureComponent {
	constructor(props) {
		super(props);
		BindSimple(this, {styles: Styles});
	}

	render() {
		const {styles, props} = this;
		const {isShow, style} = props;

		if (isShow) {
			return <RNView {...props} style={{...styles.view, ...style}} />;
		}
		return null;
	}
}

export {BlockView};
