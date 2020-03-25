import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

import rootReducer from '../Reducers'


const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducers = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReducers, {}, applyMiddleware(thunk))
    let persistor = persistStore(store)
    return { store, persistor }
}