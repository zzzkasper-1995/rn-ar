import {PORTAL} from '../globalOptions';

export const requestTestLogin = async (params, callback) => {
	console.log('request.other.requestTestLogin: ', params);

	// request

	callback({ok: true});
};

export const requestTestLogin2 = async (params, callback) => {
	console.log('request.other.requestTestLogin2', params);

	// request

	callback({ok: true});
};
