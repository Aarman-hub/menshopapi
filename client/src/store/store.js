import { 
    createStore, 
    applyMiddleware
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';


const initialState = {};

let store;

try {
    store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
} catch (error) {
    store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));
}

export default store;