import methods from './methods';
import component from './components';
import registerConnect from '../containers';
import {} from '../selectors';

export default registerConnect(state => ({}), methods)(component);
