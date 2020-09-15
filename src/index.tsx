import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';


import App from './App';
import Channels from './pages/channels/channels';
import VPlay from './pages/vplay/vplay';
import Home from './pages/home/home';
import Login from './pages/account/login'

import * as serviceWorker from './serviceWorker';

//import {func, myAdd} from './lib/test';

import rootSaga from './store/rootSaga'
import rootReducer from './store/rootReducer'
import './App.scss'
const sagaMiddleware = createSagaMiddleware();
// 1、创建 store
const store = createStore(rootReducer, applyMiddleware( sagaMiddleware));
sagaMiddleware.run( rootSaga )

ReactDOM.render(
    // 2、然后使用react-redux的Provider将props与容器连通起来
    <Provider store={ store }>        
        <Router>            
            <Switch>
                <Route path="/" exact component={Channels} />    
                <Route path="/channels" component={Channels} />
                <Route path="/vplay" component={VPlay} />
                <Route path="/home" component={Home} />
                <Route path="/account/login"  component={Login} />
            </Switch>
        </Router>
    </Provider> ,
    document.getElementById('root') as HTMLElement
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
