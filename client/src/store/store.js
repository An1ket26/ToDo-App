import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import UserReducer from "./reducers/UserReducer";
import TaskReducer from "./reducers/taskReducer";
import alertReducer from "./reducers/alertReducers";
const rootReducer=combineReducers({
    user:UserReducer,
    task:TaskReducer,
    alert:alertReducer
});

const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

export default store;