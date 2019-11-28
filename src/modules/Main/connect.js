import methods from './methods';
import component from './components';
import registerConnect from '../../core/containers';
import {} from '../../core/selectors';

export default registerConnect(state => ({}), methods)(component);
