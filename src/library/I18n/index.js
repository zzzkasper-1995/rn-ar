import React from 'react';
import {Text} from 'react-native';
import i18n from './i18n';

const db = {};
const getText = key => {
	const text = i18n.t(key, {language: i18n.currentLocale()});
	if (i18n.t(key, {language: i18n.currentLocale()}).includes('[missing')) {
		db[i18n.currentLocale()] = {...db[i18n.currentLocale()], [key]: key};
		return key;
	}
	return text;
};
const I = ({style = {}, text = 'default'}) => <Text style={style}>{getText(text)}</Text>;

I.text = (text = 'default') => getText(text);

I.printNotFound = () => {
	// какой либо запрос или просто вывод
	console.log('Not found localization', db);
};

export {I};
