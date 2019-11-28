/**
 * @module Rest
 * @description  Клиент формирует очередь запросов при отсутствии интернета, обрабатывает ответы
 * @see {@link RequestsManager} Клиент запросов
 */
import managerRequest, {manager} from './client';

export {managerRequest as Request, manager as ManagerRequest};
