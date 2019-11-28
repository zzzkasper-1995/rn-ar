import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {TextInput} from '../TextInput';
import {Utils} from '../../Utils';
import Styles from './styles';
import {BindSimple} from '../../Component';
import {Text} from '../Text';
import {Icon} from '../Icon';

const {getDate, isDate} = Utils;

class DatePicker extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isDateTimePickerVisible: false,
			textValue:
				(props.input && isDate(props.input.value) && new Date(props.input.value)) ||
				(props.textValue && props.textValue !== '' && props.textValue) ||
				new Date(),
		};
		BindSimple(this, {styles: Styles});
	}

	_showDateTimePicker = () => {
		this.setState({isDateTimePickerVisible: true});
	};

	_hideDateTimePicker = is => {
		this.setState({isDateTimePickerVisible: false});
	};

	_handleDatePicked = date => {
		if (this.props.input && this.props.input.onChange) {
			this.props.input.onChange(date);
		}
		this.setState({textValue: new Date(date).toString()});
		this._hideDateTimePicker(true);
	};

	getFormatDate = date => {
		if (date) {
			res = {};
			res.yyyy = getDate(date, 'yyyy');
			res.MM = getDate(date, 'MM');
			res.d = getDate(date, 'd');
			res.HH = getDate(date, 'HH');
			res.mm = getDate(date, 'mm');
			return res;
		}
		return {};
	};

	render() {
		const {styles} = this;
		const {textValue} = this.state;
		const {mode = 'date', is24Hour = true, minimumDate, maximumDate, style} = this.props;

		const {yyyy, MM, d, HH, mm} = this.getFormatDate(textValue);
		const dateEl = <Text>{`${d}.${MM}.${yyyy}`}</Text>;
		const timeEl = HH ? (
			<View style={styles.timeView}>
				<Text style={styles.time}>{HH}</Text>
				<Text style={styles.sign}>:</Text>
				<Text style={styles.time}>{mm}</Text>
			</View>
		) : (
			<View />
		);

		return (
			<View style={styles.mainView}>
				{mode === 'date' ? dateEl : timeEl}
				<Icon name='TRIANGLE' style={styles.icon} />
				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this._handleDatePicked}
					onCancel={this._hideDateTimePicker}
					mode={mode}
					is24Hour={is24Hour}
					minimumDate={isDate(minimumDate) ? new Date(minimumDate) : undefined}
					maximumDate={isDate(maximumDate) ? new Date(maximumDate) : undefined}
				/>
				<TouchableOpacity onPress={this._showDateTimePicker} style={styles.main} />
			</View>
		);
	}
}

export {DatePicker};
