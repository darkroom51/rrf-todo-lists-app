import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'


import authReducer, {initAuth} from './state/auth'
import chatReducer from './state/chat'
import listsReducer from './state/lists'
import listReducer from './state/list'


const reducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    lists: listsReducer,
    list: listReducer
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