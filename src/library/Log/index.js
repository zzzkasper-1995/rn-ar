import Options from '../../options';

const Log = (...params) => {
	if (Options.isLog && __DEV__ === true) {
		console.log(...params);
	}
};

export {Log};
