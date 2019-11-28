/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Utils, Text, View, Button} from '../src/library';
// import {Text} from '../src/library';

// Note: test renderer must be required after react-native.

test('renders correctly text', () => {
	const tree = renderer.create(<Text />).toJSON();
	expect(tree).toMatchSnapshot();
});

test('renders correctly view', () => {
	const tree = renderer.create(<View />).toJSON();
	expect(tree).toMatchSnapshot();
});

test('renders correctly button', () => {
	const tree = renderer.create(<Button />).toJSON();
	expect(tree).toMatchSnapshot();
});

test(' correctly rounding', () => {
	let value = Utils.rounding(0.0001, 1);
	expect(value).toBe('0');
	value = Utils.rounding(0.000323232323321, 1);
	expect(value).toBe('0');
	value = Utils.rounding(21, 1);
	expect(value).toBe('21');
	value = Utils.rounding(2324234.0001, 1);
	expect(value).toBe('2 324 234');
	value = Utils.rounding(23424324324234324.002342343201, 150);
	expect(value).toBe('23 424 324 324 234 300');
});

test('time rounding 1 000 000', () => {
	const ar = [];
	const length = 1000000;
	for (let i = 0; i < length; i += 1) {
		const v = 10 * i * Math.random() ** (Math.random() * 100);
		ar.push({value: v, eps: Math.random()});
	}

	ar.forEach(el => {
		Utils.rounding(el.value, el.eps);
	});
});
