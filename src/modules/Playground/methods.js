/**
 * @module Playground/Methods
 * @description логика модуля
 * @private
 * */
import {PLAYGROUND_OPEN_ONBOARDING} from './action';

const self = {};
/**
 *  Зыкрывает модуль эксперементов
 */
self.onOpenOnboarding = () => dispatch => {
	dispatch({type: PLAYGROUND_OPEN_ONBOARDING});
};

export default self;
