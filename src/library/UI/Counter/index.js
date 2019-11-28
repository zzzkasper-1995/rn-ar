/* eslint-disable class-methods-use-this */
import React from 'react';
import Styles from './styles';
import {Text} from '../Text';
import {View} from '../View';
import {Button} from '../Button';
import {BindSimple} from '../../Component';

class Counter extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			counter: this.initCounter.bind(this)(),
		};

		BindSimple(this, {
			styles: Styles,
		});
	}

	initCounter() {
		const {input = {}} = this.props;
		const {value} = input;

		if (value) {
			return value;
		}
		return 0;
	}

	handlePressPlus() {
		const {counter} = this.state;
		const {input = {}, max = 999} = this.props;
		const {onChange = () => {}} = input;

		const newCount = counter + 1;
		this.setState({counter: newCount < max ? newCount : max});
		onChange(newCount < max ? newCount : max);
		const onChangeValue = this.props.onChange;
		onChangeValue && onChangeValue(newCount < max ? newCount : max);
	}

	handlePressMinus() {
		const {counter} = this.state;
		const {input = {}} = this.props;
		const {onChange = () => {}} = input;

		const newCount = counter - 1;
		this.setState({counter: newCount < 0 ? 0 : newCount});
		onChange(newCount < 0 ? 0 : newCount);
		const onChangeValue = this.props.onChange;
		onChangeValue && onChangeValue(newCount > 0 ? newCount : 0);
	}

	render() {
		// console.log('Counter', this);
		const {styles, state, props} = this;
		const {counter} = state;
		const {mod, style = {}, input, meta} = props;

		const isError = input && meta && !!meta.error && meta.submitFailed;

		return (
			<View style={{...styles.mainView, ...style}}>
				<Button
					style={{...styles.btn}}
					activeOpacity={1}
					onAction={this.handlePressMinus.bind(this)}
				>
					<Text style={styles.btnText}>-</Text>
				</Button>
				<View style={styles.textView}>
					<Text style={{...styles.text, ...(counter === 0 && {opacity: 0.5})}}>{`${counter}${
						mod ? ` ${mod}` : ''
					}`}</Text>
				</View>
				<Button
					style={{...styles.btn}}
					activeOpacity={1}
					onAction={this.handlePressPlus.bind(this)}
				>
					<Text style={styles.btnText}>+</Text>
				</Button>
			</View>
		);
	}
}

export {Counter};
