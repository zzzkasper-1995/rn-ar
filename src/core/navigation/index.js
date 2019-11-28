/** @module Navigation */
import {Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import configureStore from '../../store';
import {Toast, BackHandler} from '../../library';

const {store} = configureStore();

let lastNameScreen = '';
let stack = []; // для стэк навигации (орентировочный маршрут)
let isWait = false; // для игнорирования сторонних операций во время совершения операции
let isSwipebl = true;
let amountPopToBack = 1;
let screenEventListener;
const timeWait = 1000; // ms
let constans; // константы

/**
 * Переход назад по стек навигаци
 * @param {String} currentID имя компонента с которого производится переход
 * @param {Object} options настройки перехода см(док wix/react-native-navigation)
 */
const pop = (currentID, options = {}) => {
	if (!isWait) {
		isSwipebl = false;
		isWait = true;
		lastNameScreen = stack[stack.length - 1];
		if (stack.length > 2) {
			stack.pop();
			stack.pop();
			amountPopToBack = 3;
			Navigation.pop(currentID, options);
		} else if (amountPopToBack === 0) {
			stack = [];
			lastNameScreen = '';
			amountPopToBack = 1;
			screenEventListener && screenEventListener.remove();
			BackHandler.exitApp();
		} else if (Platform.OS !== 'ios') {
			Toast.show('Повторите для выхода из приложения');
			amountPopToBack -= 1;
		}
		setTimeout(() => {
			isWait = false;
			isSwipebl = true;
		}, timeWait);
	}
};

/**
 * Сбрасывание стека навигации до корня
 * @param {String} currentID имя текущей сцена
 */
const popToRoot = currentID => {
	if (!isWait) {
		isSwipebl = false;
		isWait = true;
		lastNameScreen = '';
		stack = [];
		Navigation.popToRoot(currentID);
		setTimeout(() => {
			isWait = false;
			isSwipebl = true;
		}, timeWait);
	}
};

/**
 * Переход назад по стек навигаци к определенному экрану
 * @param {String|Number} currentID имя компонента до которого вернуться или количество компонентов назад
 * @param {Object} options настройки перехода см(док wix/react-native-navigation)
 */
const popTo = (currentID = 1, options = {}) => {
	if (!isWait) {
		isWait = true;
		isSwipebl = false;
		if (typeof currentID === 'number') {
			for (let i = 0; i < currentID; i += 1) {
				if (stack.length > 1) stack.pop();
			}
			const l = stack.length - 1;
			lastNameScreen = stack[l];
			Navigation.popTo(lastNameScreen, options);
		} else {
			lastNameScreen = stack[stack.length - 1];
			for (let i = stack.length - 1; i > 0; i -= 1) {
				if (stack[i] === currentID) break;
				stack.pop();
			}
			stack.pop();
			Navigation.popTo(currentID, options);
		}
		setTimeout(() => {
			isWait = false;
			isSwipebl = true;
		}, timeWait);
	}
};

/**
 * Переход вперед по стек навигации
 * @param {String} currentID имя компонента с которого делается переход
 * @param {String} nameScreen имя компонента на который делается переход
 * @param {Object} options настройки перехода см(док wix/react-native-navigation)
 */
const push = (currentID, nameScreen, options) => {
	if (lastNameScreen !== nameScreen) {
		if (stack.includes(nameScreen)) {
			popTo(nameScreen, {});
		} else {
			lastNameScreen = stack[stack.length - 1];
			isSwipebl = false;
			Navigation.push(currentID, {
				component: {
					id: nameScreen,
					name: nameScreen,
				},
				options: options || {},
			});
			setTimeout(() => {
				isSwipebl = true;
			}, timeWait);
		}
	}
};

/**
 *  Переход по таб навигации wix
 *
 * @param {String} screenID имя таб навигатора или имя сцены в табнавигаторе с которой производится переход
 * @param {String} nameScreen имя сцены на которую производится переход
 * @param {Object} options почие настройки (см wix/react-native-navigation)
 */
const navigateTab = (screenID, nameScreen, options) => {
	isSwipebl = false;
	Navigation.mergeOptions(screenID, {
		bottomTabs: {
			currentTabId: nameScreen,
			...options,
		},
	});
	setTimeout(() => {
		isSwipebl = true;
	}, timeWait);
};

/**
 * Замена дерева навигации
 * @param {Object} root дерево навигации (RNN)
 */
const setRoot = root => {
	Navigation.setRoot(root);
	isSwipebl = false;
	for (let i = 0; i < stack.length - 1; i += 1) stack.pop();
};

/**
 * Трансформирует экран
 * @param {*} screenID
 * @param {*} options
 */
const mergeOptions = (screenID, options) => {
	Navigation.mergeOptions(screenID, options);
};

const setLastNameScreen = nameScreen => {
	lastNameScreen = nameScreen;
};

/**
 * Расширяет компонент виксовскими штуками
 * @param {Object} self контекст
 */
const bindComponent = self => {
	Navigation.events().bindComponent(self);
};

/**
 * Регистрация компонентов
 * @param {String} name имя компонента
 * @param {Object} component компонент
 */
function registerComponent(name, component) {
	Navigation.registerComponentWithRedux(name, () => component, Provider, store);
}

/** Получает  константы от навигации родной */
const initConstans = async () => {
	constans = await Navigation.constants();
};

/**
 * Отслеживает последовательность открытия экранов пользователем
 * @param {String} root имя корня навигации
 * @param {Object} service сервисы для регистрации и отправки какой0либо информации
 */
const traking = (root, service) => {
	const {analytic} = service;

	screenEventListener = Navigation.events().registerComponentDidAppearListener(
		({componentId, componentName}) => {
			analytic.pushScreen(componentName);
			// console.log('open', componentName);
			// console.log('last', lastNameScreen);
			// console.log(stack, isSwipebl);
			if (Platform.OS === 'ios' && isSwipebl && stack.length > 2) {
				stack.pop();
			} else if (stack[stack.length - 1] !== componentName) stack.push(componentName);
			// console.log(stack, isSwipebl);

			lastNameScreen = analytic.getLastItem();

			initConstans();
		},
	);
};

/**
 * Показывает компонент как наложение
 * @param {String} name имя/ид  компонента
 * @param {Object} options  параметры
 */
const showOverlay = (name, options) => {
	Navigation.showOverlay({
		component: {
			id: name,
			name,
			options,
		},
	});
};

/**
 * Скрывает все наложения на экране по имени/id
 * @param {String} name имя/ид  компонента
 */
const dismissOverlay = name => {
	Navigation.dismissOverlay(name);
};

/**
 * Обернуть метод в функцию генератор собятия
 * @param {Function} action функция которую необходимо обернуть
 */
const storeDispatch = action => store.dispatch(action);

/** Регистрирует компонент в стеке */
const setStack = name => {
	stack.push(name);
};

export {
	setStack,
	Navigation,
	registerComponent,
	pop,
	popTo,
	push,
	setRoot,
	bindComponent,
	navigateTab,
	lastNameScreen,
	popToRoot,
	mergeOptions,
	setLastNameScreen,
	traking,
	showOverlay,
	dismissOverlay,
	storeDispatch,
	constans,
};
