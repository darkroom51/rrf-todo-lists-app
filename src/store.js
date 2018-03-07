import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'


import authReducer, {initAuth} from './state/auth'


const reducer = combineReducers({
    auth: authReducer

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)


store.dispatch(initAuth())
// store.dispatch(fetchProducts())
// store.dispatch(fetchUsers())


export default store