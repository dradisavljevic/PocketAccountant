import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import thunkMiddleware from 'redux-thunk';

import RootReducer from './RootReducer';

const middleware = applyMiddleware(thunkMiddleware);

const Store = createStore(RootReducer, composeWithDevTools(middleware));

export type RootState = ReturnType<typeof Store.getState>

export type ReducerActionType = {type: string, payload: string};

export default Store;

/*
import {applyMiddleware} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import {composeWithDevTools} from 'redux-devtools-extension';

import thunkMiddleware from 'redux-thunk';

import RootReducer from './RootReducer';

const middleware = applyMiddleware(thunkMiddleware);

const Store = configureStore({reducer: RootReducer});

export default Store;
*/
