/**
 * @module Rest/Storage
 * @description хранилищи токенов
 * @private
 */
import * as Keychain from 'react-native-keychain';

/**
 * Созраняет информацию
 * @param {String} key ключ
 * @param {*} value значение
 * @memberof module:Rest/Storage
 */
export const setItem = async (key, value) => {
	try {
		await Keychain.setGenericPassword(key, JSON.stringify(value), {
			service: key,
			accessible: Keychain.ACCESSIBLE.ALWAYS,
		});
	} catch (error) {
		// Error saving data
		console.log(`DO NOT SAVED PRIVATE STORAGE ${key}`);
	}
};

/**
 * Вытаскивает информацию из хранилища
 * @param {String} key ключ
 * @memberof module:Rest/Storage
 */
export const getItem = async key => {
	try {
		const value = await Keychain.getGenericPassword({service: key});
		if (value !== null) {
			return JSON.parse(value.password);
		}
		return '';
	} catch (error) {
		console.log(`DO NOT GIVE DATA IN PRIVATE STORAGE ${key}`);
		return '';
	}
};
