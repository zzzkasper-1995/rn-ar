import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {format} from 'date-fns';
import {BindSimple} from '../../../Component';

import Styles from './styles';

export default class DateItem extends PureComponent {
	constructor(props) {
		super(props);
		BindSimple(this, {styles: Styles});
	}

	render() {
		const {styles, props} = this;
		const {item, highlight, marked, onItemPress, isDisableOldDate} = props;
		const solar = format(item, 'D');

		const isOld = isDisableOldDate && item < new Date() - 1000 * 60 * 60 * 24;

		return (
			<View style={styles.itemContainer}>
				<TouchableOpacity
					style={styles.itemWrapButton}
					onPress={isOld || !marked ? undefined : onItemPress}
					activeOpacity={isOld || !marked ? 1 : undefined}
				>
					<View
						style={
							highlight
								? styles.selectItemView
								: isOld || !marked
								? styles.disableItemView
								: styles.itemView
						}
					>
						<Text style={highlight ? styles.selectItemDateText : styles.itemDateText}>{solar}</Text>
						{/* {marked && (
							<View style={highlight ? styles.selectItemBottomDot : styles.itemBottomDot} />
						)} */}
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}
