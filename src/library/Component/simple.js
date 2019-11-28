import {Theme} from '../Theme';

/**
 * 	Расширяет компонент :
 *  state.isLoadComponent - показывает загрузился ли компонент или нет (полезно для рендеринга высоконагруженных компонентов) *
 */

/**
 * Для примитивов
 * @param {Object} self компонент подписи
 * @param {Object} options параметры компонента
 * @param {Function} options.styles функция возвращаюзаяя стиль компонента
 */

export default (self, {styles}) => {
	self.state = {...self.state, isLoadScreen: false};

	/** мерджит стили в один объект */
	self.compose = (...array) => {
		let r = {};
		array.forEach(element => {
			r = {...r, ...element};
		});
		return r;
	};

	self.componentDidMount = () => {
		self.__proto__.componentDidMount && self.__proto__.componentDidMount.bind(self)();

		this.timerLoading = setTimeout(() => {
			self.setState({isLoadComponent: true});
		}, 500);
		// console.log('componentDidMount');
		// Логика при монтировании
	};

	self.componentWillUnmount = () => {
		clearTimeout(this.timerLoading);
		self.__proto__.componentWillUnmount && self.__proto__.componentWillUnmount.bind(self)();
		// Логика при размонтровании
	};

	self.componentWillUpdate = () => {
		self.__proto__.componentWillUpdate && self.__proto__.componentWillUpdate.bind(self)();
		self.styles = styles ? Theme.createStyles(styles) : {};
		// console.log('componentWillUpdate');
	};

	self.componentWillMount = () => {
		self.__proto__.componentWillMount && self.__proto__.componentWillMount.bind(self)();
		self.styles = styles ? Theme.createStyles(styles) : {};
		// console.log('componentWillMount');
	};
};
