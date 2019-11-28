/**
 * @module App/Reducer
 * @description Стор ответственный за глобальные состояния
 * @private
 */
import {APP_UPDATE_NET_CONNECT} from '../app';
// eslint-disable-next-line
export function app(
	state = {
		isOffline: false,
	},
	action = {},
) {
	switch (action.type) {
		case APP_UPDATE_NET_CONNECT:
			return {...state, isOffline: action.isConnected};

		default:
			return state;
	}
}
