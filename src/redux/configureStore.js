import {createStore} from 'redux';
import {reducer} from './reducer';

export const ConfigureStore = () => createStore(reducer);