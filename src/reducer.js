import {push, setRoot} from './core/navigation';
import {
	PLAYGROUND_OPEN_ONBOARDING,
	MAIN_OPEN_ONBOARDING,
	MAIN_OPEN_PLAYGROUND,
	MAIN_OPEN_INDICATORS,
	MAIN_OPEN_AR,
} from './modules';
import {APP_INIT} from './core/app';
import {rootMainApp} from './routes';

export default function nav(
	state = {
		isLoadPersistStore: false,
	},
	action = {},
) {
	let nextState;
	switch (action.type) {
		// Indicators
		case MAIN_OPEN_INDICATORS:
			push('appStack', 'indicators');
			break;

		//  Playground
		case MAIN_OPEN_PLAYGROUND:
			push('appStack', 'playground');
			break;

		//  AR
		case MAIN_OPEN_AR:
			push('appStack', 'arScene');
			break;

		case PLAYGROUND_OPEN_ONBOARDING:
			push('appStack', 'onboarding');
			break;

		// Onboarding
		case MAIN_OPEN_ONBOARDING:
			push('appStack', 'onboarding');
			break;

		case APP_INIT:
			setRoot(rootMainApp);
			break;

		case 'persist/REHYDRATE':
			return {...state, isLoadPersistStore: true};
		default:
			nextState = state;
			break;
	}
	return nextState || state;
}
