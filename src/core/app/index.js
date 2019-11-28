/**
 * @module App
 * @description  Главный модуль приложения. Выполняет закулисную логику, хранит глобальные состояния приложения
 * @see {@link module:App/Actions} Типы событий
 * @see {@link module:App/Methods} Методы логики
 * @see {@link module:App/Reducer} Чистые функци по работе с редаксом
 * */
import Screen from './connect';

export * from './action';
export {Screen as AppScreen};
