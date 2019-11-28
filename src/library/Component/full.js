import React from 'react';
import {pop, bindComponent, mergeOptions} from '../../core/navigation';
import {Text, View} from '../UI';
import {BackHandler} from '../BackHandler';
import {StatusBar} from '../StatusBar';
import {Theme} from '../Theme';
import {Utils} from '../Utils';

const rend = () => null;

let propsWix = {
	_private: {},
};

/**
 * 	Расширяет компонент :
 *  state.isLoadScreen - показывает загрузился ли компонент или нет (полезно для рендеринга высоконагруженных компонентов)
 *
 *  propsWix - глобальная пропса для передаи данных между экранами минуя редакс
 *  setPropsWix - обновляет глобальную проспсу на подобии setState только с возможностью отчистки (1 уровень вложенности)
 * 	onBack - выполняет переход на предыдущий экран
 *  updateTheme - обновляет тему приложения
 *  componentDidAppear - вызывается когда компонент получил фокус
 *  componentDidDisappear - вызывается когда компонент потерял фокус
 *
 */

/**
 * @param {Object} self компонент подписи
 * @param {Object} options параметры компонента
 * @param {Boolean} options.isBack флаг который указывает возможно ли осуществление обработки кнопки бек
 * @param {String} options.statusBar ('light','dark','hide') указывает использовать светлый статус бар или же оставить темный статус бар  или вообще срыть
 * @param {Function} options.onFocusedScreen функция обработки фокусировки на экран (возвращает true or false в зависимости от фокусировки)
 * @param {Function} options.styles функция возвращаюзаяя стиль компонента
 */
export default (self, options = {}) => {
	const {isBack = true, statusBar, colorBackStatusBar, onFocusedScreen, styles} = options;
	bindComponent(self);
	const nameScreen = self.props.componentId;
	self.state = {...self.state, isLoadScreen: false};

	const handleBackPress = () => {
		if (isBack) {
			pop(nameScreen);
			return true;
		}
		return true;
	};

	const setStatusBar = () => {
		let status = statusBar;
		if (!status) {
			status = Utils.getKeyObject(propsWix, 'statusBar');
		} else {
			propsWix = {...propsWix, _private: {...propsWix._private, statusBar}};
		}
		switch (status) {
			case 'light':
				StatusBar.setLigthTranslucent({colorBackStatusBar});
				break;
			case 'dark':
				StatusBar.setDarkTranslucent({colorBackStatusBar});
				break;
			case 'dark-translucent':
				StatusBar.setDarkTranslucent({translucent: false, colorBackStatusBar});
				break;
			case 'light-translucent':
				StatusBar.setLigthTranslucent({translucent: false, colorBackStatusBar});
				break;
			case 'hide-translucent':
				StatusBar.hide({translucent: false, colorBackStatusBar});
				break;
			case 'hide':
				StatusBar.hide({colorBackStatusBar});
				break;
			default:
				StatusBar.setDarkTranslucent({colorBackStatusBar});
				break;
		}
	};

	const iosSwipeBack = () => {
		mergeOptions(nameScreen, {
			popGesture: isBack,
		});
	};

	const loadPropsWix = () => {
		self.propsWix = propsWix;
		self.forceUpdate(); // Опасный код
	};

	/** мерджит стили в один объект */
	self.compose = (...array) => {
		let r = {};
		array.forEach(element => {
			r = {...r, ...element};
		});
		return r;
	};

	/** Настанавливает пропсу доступную на экранах */
	self.setPropsWix = (props, isClear = false) => {
		if (isClear) propsWix = {_private: {...propsWix._private}};

		propsWix = {...propsWix, ...props};
		self.propsWix = propsWix;
		self.forceUpdate(); // Опасный код
	};

	self.onBack = function() {
		pop(nameScreen);
	};

	/** Обновляет тему прилы */
	self.updateTheme = theme => {
		Theme.setTheme(theme);
		self.forceUpdate();
		self.styles = styles ? Theme.createStyles(styles) : {};
	};

	self.componentDidAppear = () => {
		loadPropsWix();
		setStatusBar();
		iosSwipeBack();
		// Фокусировка экрана
		onFocusedScreen !== undefined
			? onFocusedScreen({status: true, nameScreen})
			: self.props.onFocusedScreen && self.props.onFocusedScreen({status: true, nameScreen});

		this.timerLoading = setTimeout(() => {
			self.setState({isLoadScreen: true});
		}, 500);

		self.__proto__.componentDidAppear && self.__proto__.componentDidAppear.bind(self)();
		// console.log('componentDidAppear');
	};

	self.componentDidDisappear = () => {
		// Логика при снятии фокуса с экрана
		// Фокусировка экрана
		onFocusedScreen !== undefined
			? onFocusedScreen({status: false, nameScreen})
			: self.props.onFocusedScreen && self.props.onFocusedScreen({status: false, nameScreen});

		self.__proto__.componentDidDisappear && self.__proto__.componentDidDisappear.bind(self)();
		// console.log('componentDidDisappear');
	};

	self.componentDidMount = () => {
		// Логика при монтировании
		loadPropsWix();
		BackHandler.addEventListener('hardwareBackPress', handleBackPress);
		// StatusBar.setDarkTranslucent();

		self.__proto__.componentDidMount && self.__proto__.componentDidMount.bind(self)();
		// console.log('componentDidMount');
	};

	self.componentWillUnmount = () => {
		// Логика при размонтровании

		BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
		clearTimeout(this.timerLoading);

		self.__proto__.componentWillUnmount && self.__proto__.componentWillUnmount.bind(self)();
		// console.log('componentWillUnmount');
	};

	self.componentWillUpdate = () => {
		self.__proto__.componentWillUpdate && self.__proto__.componentWillUpdate.bind(self)();
		// console.log('componentWillUpdate');
	};

	self.componentWillMount = () => {
		self.styles = styles ? Theme.createStyles(styles) : {};

		self.__proto__.componentWillMount && self.__proto__.componentWillMount.bind(self)();
		// console.log('componentWillMount');
	};

	// self.render = () => {
	// 	console.log(self);
	// 	self.styles = styles ? Theme.createStyles(styles) : {};
	// 	return (
	// 		<>
	// 			{/* {rend()} */}
	// 			{self.state.isLoadScreen ? self.__proto__.render.bind(self)() : null}
	// 		</>
	// 	);
	// };
};
