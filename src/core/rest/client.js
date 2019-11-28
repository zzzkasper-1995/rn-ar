import NetInfo from '@react-native-community/netinfo';
import * as Requests from './requests';
import {getItem, setItem} from './storadge';
import {Toast, Log} from '../../library';
import Options from '../../options';

let instance;

const TIME_REFRESH = 5000;
const FAILD_RESPONSE = {
	ok: false,
	error: 'Timeout wait error',
};

const FAILD_RESPONSE_NET = {
	ok: false,
	error: 'Timeout wait error',
	result: 'Проверьте соединения с сетью',
};

const FAILD_REFRESH = {
	ok: false,
	error: 'Timeout wait error',
	result: 'Не удалось обновить сессию',
};

/**
 * Токены для запросов
 * @memberof class:RequestsManager
 */
const getTokens = async () => ({
	token: await getItem('token'),
	token_type: await getItem('token_type'),
});

/** Стераем токены */
const logout = async () => {
	await setItem('token_info', {});
	await setItem('token', '');
	await setItem('token_type', '');
	await setItem('token_time', '');
};

let isConnected = true; // соединение есть или нет
let typeConected;

/**
 * @class RequestsManager
 * @classdesc Выполняет запросы к серверу
 * @private
 */
class RequestsManager {
	/**
	 * Инициализация
	 * @static
	 * @returns экземпляр этого класса
	 * @memberof RequestsManager
	 */
	static instance() {
		if (!instance) {
			instance = new RequestsManager();
			Log('Init ManagerRequest, methods:', Requests);
		}
		return instance;
	}

	constructor() {
		this.callbackChangeConnectedNet = () => {};
		this.bufferRequest = {};
		this.currentNextId = 0;
		this.isWait = false;
		this.methodList = [
			// лист методов которые не должны дублироваться
			'login',
			'changedOrders',
		];
		this.methodResponse = [
			// лист методов которые должны получать ответ в любом случае
		];
		this.update();
	}

	/**
	 * Генерирует идентификатор для запроса
	 * @returns идентификатор в очереди запросов
	 * @memberof RequestsManager
	 */
	generationId() {
		this.currentNextId += 1;
		if (+this.currentNextId > 9 * 1000) this.currentNextId = 1;
		return this.currentNextId;
	}

	/**
	 * Обновление очереди запросов, выполнение запросов по возможности
	 * @memberof RequestsManager
	 */
	update() {
		setInterval(() => {
			NetInfo.fetch().then(state => {
				const isNet = state.isConnected;
				typeConected = state.type;
				if (isConnected !== isNet) {
					isConnected = isNet;
					this.callbackChangeConnectedNet(isNet);
				}
			});
			Object.values(this.bufferRequest).forEach(item => {
				if (!item.isWorkRequest && isConnected && !this.isWait) {
					item.method();
					// this.stopRequest(item.id);
					item.isWorkRequest = true;
				}
				// Время ожидания ответа
				if (item.timeWait <= item.timeWork + item.timeWaitWork) {
					this.stopRequest(item.id);
					item.callback(FAILD_RESPONSE);
				}
				// Время ожидания начала запроса
				if (item.timeWait <= item.timeWaitWork) {
					this.stopRequest(item.id);
					item.callback(FAILD_RESPONSE_NET);
				}
				if (item.isWorkRequest) item.timeWork += 1;
				if (!item.isWorkRequest) item.timeWaitWork += 1;
				// console.log(item);
			});
		}, 1000);
	}

	/**
	 * Фильтрует поступающие запросы по настройками (повторение)
	 * @param {String} nameMethod  имя запроса
	 * @returns разрешен ли запрос или нет
	 * @memberof RequestsManager
	 */
	filterRequest(nameMethod) {
		if (this.methodList.includes(nameMethod)) {
			return !Object.values(this.bufferRequest).some(item => item.name === nameMethod);
		}
		return true;
	}

	/**
	 * Фильтрует ответы
	 * @param {String} nameMethod имя запроса
	 * @returns  получить ли ответ в любом случае
	 * @memberof RequestsManager
	 */
	filterResponse(nameMethod) {
		return this.methodResponse.includes(nameMethod);
	}

	/**
	 * Регистрирует запрос
	 *
	 * @param {Number} timeWait время ожидания ответа от сервера
	 * @param {Function} method инкапсулированный запрос
	 * @param {String} name имя запроса
	 * @param {Object} [params={}] данные в запрос
	 * @param {Function} callBack функция обратного вызова для выполнения логики над результатом запроса
	 * @memberof RequestsManager
	 */
	addRequest(timeWait, method, name, params, callback) {
		if (this.filterRequest(name)) {
			const callBack = callback;
			const id = this.generationId();
			this.bufferRequest[id] = {
				id,
				name, // Имя запроcа
				isWorkRequest: false,
				timeWaitWork: 0, // время ожидания в очереди
				timeWork: 0, // текущее время ожидания ответа
				timeWait, // заданное время ожидания ответа, после которого запрос больше не ожидается и возвращается стандартный ответ
				method: async () => {
					try {
						method(
							{
								...params,
								...(await getTokens()),
							},
							res => {
								try {
									if (this.chekId(id)) {
										this.stopRequest(id);
										callBack(res);
									}
								} catch (e) {
									this.stopRequest(id);
									callBack({ok: false, result: 'Исключительная ситуация'});
								}
							},
						);
					} catch (e) {
						this.stopRequest(id);
						callBack({ok: false, result: 'Исключительная ситуация'});
					}
				}, // Запрос
				callback: callBack,
			};
		}
	}

	/**
	 * Выгружает запрос из очереди ожидания.
	 *
	 * @param {Number} id идентификатор запроса
	 * @memberof RequestsManager
	 */
	stopRequest(id) {
		// console.log('stop id',id)
		delete this.bufferRequest[id];
	}

	/**
	 * Проверяет содержится ли еще в очереди запрос
	 */
	chekId(id) {
		return !!this.bufferRequest[id];
	}

	/**
	 * Обновляет токен сессии
	 */
	async refreshToken(isDouble = false) {
		const time = await getItem('token_time');
		if ((isDouble || !this.isWait) && time !== '' && +time < Date.now()) {
			this.isWait = true;
			Log('Refresh');
			Requests.refreshToken({...(await getItem('token_info'))}, params => {
				Log('Refresh_params', params);
				if (params.ok) {
					setTimeout(() => {
						this.isWait = false;
					}, 1000);
				} else {
					setTimeout(() => this.refreshToken(true), TIME_REFRESH);
					Toast.show(FAILD_REFRESH.result);
				}
			});
		}
	}

	/** Устанавливает обратную связь на изменение состояния соединение */
	listenerNetConnected(online, offline) {
		this.callbackChangeConnectedNet = isConnect => {
			if (isConnect) {
				online();
			} else {
				offline();
			}
		};
	}

	logoutClient() {
		logout();
	}

	async getTokens() {
		return await getTokens();
	}
}

const manager = RequestsManager.instance();

export {manager};
export default async (method, params, success, error, time) => {
	if (Requests[method]) {
		await manager.refreshToken();

		Log(`request.${method}.params: `, params);

		manager.addRequest(time || Options.timeRequest, Requests[method], method, params, async res => {
			// Настраивается в зависимости от клиента и типа сообщений
			Log(`response.${method}: `, res);
			if (res.ok) {
				success && success(res.result);
			} else {
				Toast.show(res.result);
				error && error(res.result);
			}
		});
	} else {
		Log(`ERROR: REQUEST ${method} NOT FOUND !!!`);
	}
};
