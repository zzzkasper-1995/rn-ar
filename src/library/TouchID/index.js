import {Platform} from 'react-native';
import TouchID from 'react-native-touch-id';

// гайд по использованию
// https://medium.com/react-native-training/integrate-touch-id-and-face-id-to-your-react-native-app-707e7db17edc

// авторизация по нажатию
TouchID.pressHandler = async (title, onSuccess, onError) => {
	try {
		console.log('Authentication success');
		await TouchID.authenticate(title);
		onSuccess && onSuccess();
		return undefined;
	} catch (error) {
		console.log('Authentication Failed');
		if (error.name !== 'LAErrorUserCancel' && error.name !== 'RCTTouchIDNotSupported') {
			if (!(Platform.OS === 'android' && error.name === 'Touch ID Error')) {
				onError && onError();
			}
		}
		return error.name;
	}
};

export {TouchID};
