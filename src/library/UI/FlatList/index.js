import React from 'react';
import {FlatList} from 'react-native';

/**
 *  Обертка над видженом FlatList
 *
 * @class InitflowFlatList
 * @extends {React.PureComponent}
 */
class InitflowFlatList extends React.PureComponent {
	onRef(ref) {
		const {reference} = this.props;

		if (reference) reference(ref);
		this.textInput = ref;
	}

	render() {
		const {style, reference} = this.props;

		return (
			<FlatList
				ref={this.onRef.bind(this)}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				{...this.props}
			/>
		);
	}
}

InitflowFlatList.propTypes = {
	...FlatList.propTypes,
};

InitflowFlatList.defaultProps = {
	...FlatList.defaultProps,
};

export {InitflowFlatList as FlatList};
