let instance;

/**
 * @class Looper
 * @classdesc Выполняет действия с заданной переодичностью (в основном для зацикливания запросов)
 */
export default class Looper {
	/**
	 * Инициализация
	 * @static
	 * @returns экземпляр этого класса
	 * @memberof Looper
	 */
	static instance() {
		if (!instance) {
			instance = new Looper();
		}
		return instance;
	}

	constructor() {
		this.buff = {}; // буфер задач
		this.run(); // запускается жизненный цикл
	}

	run() {
		setInterval(() => {
			Object.values(this.buff).forEach(el => {
				if (el.wait > 0) {
					el.wait -= 1;
				} else {
					el.action();
					el.wait = el.interval;
				}
			});
		}, 1000);
	}
}
