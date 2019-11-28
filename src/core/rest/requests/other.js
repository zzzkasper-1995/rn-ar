import {PORTAL} from '../globalOptions';

export const requestTest = async (params, callback) => {
	console.log('request.other.requestTest: ', params);

	// request

	callback({ok: true});
};

export const requestTest2 = async (params, callback) => {
	console.log('request.other.requestTest2', params);

	// request

	callback({ok: true});
};
