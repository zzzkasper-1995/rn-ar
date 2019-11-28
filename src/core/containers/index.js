import {connect} from 'react-redux';

export default (state, method) =>
	connect(
		state,
		dispatch => {
			const res = {};
			Object.keys(method).forEach(
				el =>
					(res[el] = (...params) => {
						dispatch(method[el](...params));
					}),
			);
			return {...res};
		},
	);
