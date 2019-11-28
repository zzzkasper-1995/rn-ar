import {Platform} from 'react-native';
import SplashScreenMod from 'react-native-splash-screen';

const SplashScreen = () =>
	setTimeout(
		() =>
			Platform.select({
				ios: () => {
					SplashScreenMod.hide();
				},
				android: () => {
					SplashScreenMod.hide();
				},
			})(),
		1000,
	);

export {SplashScreen};
