import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'


import authReducer, {initAuth} from './state/auth'
import chatReducer from './state/chat'
import listsReducer from './state/lists'


const reducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    lists: listsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)


store.dispatch(initAuth())


export default store