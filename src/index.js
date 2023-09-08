import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";

// const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
    // => state = {burgerBuilder:burgerBuilderReducer,order:orderReducer} => state.burgerBuilder & state.order

})

// اضافه می شدند applyMiddleware ها به middleware می باشد به پروژه ما اضافه شده است. middleware که یک thunk
// به ما کمک می کند که thunk
// یک تابع را برگردانیم action به جای برگرداندن
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);
// const store = createStore(rootReducer);
//const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();

