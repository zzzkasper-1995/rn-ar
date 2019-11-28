import {Linking} from 'react-native';
import {Log} from '../Log';

/**
 * Обертка над линкс. Открывает ссылку
 * @param {String} url  ссылка для открытия
 */
const onLinking = url => {
	console.log('onLinking', url);

	Linking.canOpenURL(url)
		.then(supported => {
			if (!supported) {
				// Log('onLinking error');
			} else {
				return Linking.openURL(url);
			}
		})
		.catch(err => Log('onLinking error:', err));
};

export const Links = {
	onLinking,
};
