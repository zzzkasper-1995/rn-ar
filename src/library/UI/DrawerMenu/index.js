import {Navigation} from 'react-native-navigation';
import {emit} from 'jetemit';
import RNNDrawer from './RNNDrawer';

/**
 * Shows a drawer component
 *
 * @param options
 */
const showDrawer = options => {
	Navigation.showOverlay(options);
};

/**
 * Dismiss the drawer component
 *
 * @param componentId
 */
const dismissDrawer = () => {
	emit('DISMISS_DRAWER', true);
};

export {RNNDrawer, showDrawer, dismissDrawer};
