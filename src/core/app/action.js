/**
 * @module App/Actions
 * @description Типы событий этого модуля. Каждое событие с *SEND* имеет два типа событий состояния оканчивающихся на SUCCESS и FAILD
 * @private
 */

/** Приложение инициализируется */
export const APP_INIT = 'App/APP_INIT';
/** Отрывает модуль основного приложения */
export const APP_OPEN_MAIN = 'App/APP_OPEN_MAIN';
/** Открывает модуль рекламы приложения */
export const APP_OPEN_ONBOARDING = 'App/APP_OPEN_ONBOARDING';
/** Открывает модуль ээксперементов! */
export const APP_OPEN_PLAYGROUND = 'App/APP_OPEN_PLAYGROUND';
/** Открыть модуль индикаторов */
export const APP_OPEN_INDICATORS = 'App/APP_OPEN_INDICATORS';
/** Обновляет состояние сети */
export const APP_UPDATE_NET_CONNECT = 'App/APP_UPDATE_NET_CONNECT';
