//NOTE: different/wrong way just for the future reference
import {database} from '../firebase'

const SET_CHAT = 'chat/SET_CHAT'
const SET_NEW_MESSAGE = 'chat/SET_NEW_MESSAGE'

// ACTIONS CREATORS

const setChat = (chat) => ({
    type: SET_CHAT,
    chat: chat
})
const setNewMessage = (newMessage) => ({
    type: SET_NEW_MESSAGE,
    newMessage
})

// ASYNC ACTIONS CREATORS

export const syncChat = () => (dispatch, getState) => {
    database.ref(`/chat/list/`)
        .on('value', (snapshot) => {
            dispatch(setChat(snapshot.val() || {}))
        })
}

export const stopSyncingChat = () => (dispatch, getState) => {
    database.ref(`/chat/list/`)
        .off('value')
}

export const pushMessage = (obj) => (dispatch, getState) => {
    dispatch(setNewMessage(obj))
    database.ref(`/chat/list/`)
        .push(getState().chat.newMessage)
        .then(() => {})
        .catch(() => {})
}

export const updateMessage = (id, obj) => (dispatch, getState) => {
    // not thru store, no actions
    database.ref(`/chat/list/${id}`)
        .update(obj)
        .then(() => {})
        .catch(() => {})
}

export const removeMessage = (id) => (dispatch, getState) => {
    // not thru store, no actions
    database.ref(`/chat/list/${id}`)
        .remove()
        .then(() => {})
        .catch(() => {})
}


const initialState = {
    chatData: {},
    newMessage: {},
    //updatedMessage: {}
}


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CHAT:
            return {
                ...state,
                chatData: action.chat
            }
        case SET_NEW_MESSAGE:
            return {
                ...state,
                newMessage: action.newMessage
            }
        default:
            return state
    }
}