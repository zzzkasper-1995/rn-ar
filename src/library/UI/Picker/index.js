import React from 'react';
// import {Picker} from 'react-native';
import {BindSimple} from '../../Component';
import {Button} from '../Button';
import {Text} from '../Text';
import {Icon} from '../Icon';
import {View} from '../View';
import ModalPicker from './customPicker';
import Picker from './picker';
import Styles from './styles';

class InitflowPicker extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			select: this.initValue(),
		};

		BindSimple(this, {
			styles: Styles,
		});
	}

	componentWillReceiveProps(nextProps) {
		const {input, value} = this.props;
		const nextInput = nextProps.input;
		const nextValue = nextProps.value;

		// console.log('nextProps', nextProps);

		if (!value && input && nextInput && input.value !== nextInput.value) {
			this.setState({select: nextInput.value});
		}
		if (value !== nextValue) {
			this.setState({select: nextValue});
		}
	}

	initValue = () => {
		const {input, items, value} = this.props;
		// console.log('initValue', value, this.props);
		try {
			const valueFirst = value || items[0];

			if (input && input.onChange) {
				input.onChange(valueFirst);
			}
			return valueFirst;
		} catch (error) {
			return undefined;
		}
	};

	onValueChange = (value, index) => {
		const {input, items, onChangeValue} = this.props;
		// console.log('onValueChange', value, index, items);

		this.setState({
			value,
		});
		if (input && input.onChange) {
			input.onChange(value);
		}
		if (onChangeValue) {
			onChangeValue(value);
		}
	};

	handleOnOpen = () => {
		this.picker.setModalVisible(true);
	};

	render() {
		// console.log('Picker', this.props, this.state);
		const {styles, compose} = this;
		const {
			items = [],
			input,
			style = {},
			textStyle = {},
			pickerStyles,
			icon,
			toUpperCase,
			custom,
			...other
		} = this.props;
		const {select} = this.state;

		return (
			<>
				<Button
					style={compose(
						styles.mainView,
						style,
					)}
					onAction={this.handleOnOpen}
				>
					<Text
						style={compose(
							styles.text,
							textStyle,
						)}
					>
						{select && select.value && toUpperCase
							? select.value.toUpperCase()
							: (select && select.value) || ''}
					</Text>
					{icon && (
						<Icon
							name={icon.name}
							style={compose(
								styles.icon,
								icon.style || {},
							)}
						/>
					)}
				</Button>

				{custom ? (
					<ModalPicker
						ref={ref => (this.picker = ref)}
						data={items}
						label='value'
						onValueChange={this.onValueChange}
						selectedValue={select}
						renderRow={row => (
							<View
								style={{backgroundColor: '#fff', padding: 8, justifyContent: 'center', height: 40}}
							>
								<Text style={styles.rowStyle}>{row.value}</Text>
							</View>
						)}
					/>
				) : (
					<Picker
						ref={ref => (this.picker = ref)}
						data={items}
						label='value'
						onValueChange={this.onValueChange}
						selectedValue={select}
						renderRow={row => (
							<View
								style={{backgroundColor: '#fff', padding: 8, justifyContent: 'center', height: 40}}
							>
								<Text style={styles.rowStyle}>{row.value}</Text>
							</View>
						)}
					/>
				)}
			</>
		);
	}
}

export {InitflowPicker as Picker};
