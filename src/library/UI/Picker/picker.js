import React, {Component} from 'react';
import {Modal, TouchableHighlight, View, StyleSheet, Picker as RNPicker} from 'react-native';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-navigation';
import {Log} from '../../Log';

const {Item} = RNPicker;

export default class Picker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data || [],
			select: props.selectedValue || props.data[0],
			modalVisible: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.data !== nextProps.data) {
			this.setState({
				data: nextProps.data,
			});
		}
		if (this.state.select !== nextProps.selectedValue) {
			this.setState({
				select: this.props.selectedValue,
			});
		}
	}

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	render() {
		Log('ModalPicker', this.props, this.state);
		const {data, select, modalVisible} = this.state;

		return (
			<View
				style={{
					backgroundColor: 'transparent',
					flex: 1,
					position: 'absolute',
				}}
			>
				<Modal
					animationType='fade'
					transparent
					visible={modalVisible}
					onRequestClose={() => {
						this.setModalVisible(false);
					}}
				>
					<TouchableHighlight
						style={styles.container}
						onPress={() => this.setModalVisible(false)}
						underlayColor='#333333cc'
					>
						<SafeAreaView
							style={{backgroundColor: 'white', height: 200, width: '100%', alignItems: 'center'}}
						>
							<View
								style={{
									backgroundColor: 'white',
									height: 200,
									width: '100%',
									alignItems: 'center',
									flexDirection: 'row',
								}}
							>
								<RNPicker
									selectedValue={select.value}
									onValueChange={(itemValue, itemIndex) => {
										Log('itemValue', itemValue);
										this.setModalVisible(false);
										this.setState({select: itemValue});
										this.props.onValueChange(data[itemIndex], itemIndex);
									}}
									style={{height: 200, paddingHorizontal: 20, flex: 1}}
								>
									{data.map(item => {
										Log('item', item);
										return (
											<Item
												key={`${item.id}`}
												label={item.value}
												value={item.value}
												style={{width: '100%'}}
											/>
										);
									})}
								</RNPicker>
							</View>
						</SafeAreaView>
					</TouchableHighlight>
				</Modal>
			</View>
		);
	}
}

Picker.propTypes = {
	data: PropTypes.array.isRequired,
	label: PropTypes.string.isRequired,
	onValueChange: PropTypes.func,
	renderRow: PropTypes.func,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: '#333333cc',
	},
	itemText: {
		backgroundColor: '#fff',
		padding: 16,
		fontSize: 18,
		color: '#222',
		borderTopWidth: 1,
		borderColor: '#CCC',
	},
});
