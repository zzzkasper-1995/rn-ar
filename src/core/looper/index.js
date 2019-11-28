import Looper from './cor';

/**
 * Стартует какое либо событие на повтор
 * @param {String} name имя собятия
 * @param {Function} action действие собятия
 * @param {Number} interval интервал между повторами в сек
 */
const start = (name, action, interval = 1) => {
	const ref = Looper.instance();
	if (!ref.buff[name]) {
		ref.buff[name] = {
			action,
			interval,
			wait: interval,
		};
	}
};

/**
 * Снимает с выполнения какое либо событие
 * @param {String} name имя собятия
 */
const stop = name => {
	const ref = Looper.instance();
	delete ref.buff[name];
};

export default {start, stop};
