import React from 'react';
import {TextInput} from 'react-native';
import {TextMask} from '../TextMask';
// import styles from './styles';

/**
 *  Обертка над видженом
 *
 * @class InitflowTextInput
 * @extends {React.PureComponent}
 */
class InitflowTextInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
		};
	}

	componentDidMount() {
		if (this.props.autoFocus) {
			setTimeout(() => {
				this.textInput && this.textInput.focus();
			}, 500);
		}
	}

	_onChangeText = text => {
		const {onChangeText, input, keyboardType} = this.props;

		onChangeText && onChangeText(text);
		input && input.onChange && input.onChange(text); // для редакс-форм или финал-форм

		if (keyboardType === 'numeric' || keyboardType === 'number-pad') {
			this.textInput.clear();
			this.setState({value: text.replace(/\D/g, '')});
		} else {
			this.setState({value: text});
		}
	};

	focus = () => {
		this.textInput.focus();
	};

	render() {
		const {value} = this.state;
		const {mask, reference, input} = this.props;

		const str = (input && input.value) || value || '';

		return (
			<TextInput
				{...this.props}
				onChangeText={text => this._onChangeText(text)}
				ref={ref => {
					reference && reference(ref);
					this.textInput = ref;
				}}
				placeholderTextColor={'rgb(185, 199, 218)'}
				autoFocus={false}
			>
				{mask ? TextMask.getMaskedValue(str, mask) : str}
			</TextInput>
		);
	}
}

export {InitflowTextInput as TextInput};
