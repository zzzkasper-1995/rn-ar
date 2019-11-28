import {createSelector} from 'reselect';

export const slTest = createSelector(
	state => state.app.isOffline,
	status => {
		console.log(status);
		return status;
	},
);
