import { combineReducers } from 'redux';

// Reducers
import userReducer from './userReducer';
import widgetReducer from './widgetReducer';
import searchLayoutReducer from './searchLayoutReducer';

// Combine Reducers
var reducers = combineReducers({
    userState: userReducer,
    widgetState: widgetReducer,
    searchLayoutState: searchLayoutReducer
});

export default reducers;
