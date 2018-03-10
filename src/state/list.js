// TODO

import {database} from '../firebase'

const SET_LIST = 'list/SET_LIST'
const SET_NEW_TASK = 'chat/SET_NEW_TASK'


const setList = (list) => ({
    type: SET_LIST,
    list
})



export const syncList = () => (dispatch, getState) => {
    const uid = getState().auth.user.uid
    database.ref(`/users/${uid}/lists/${_____listId_____}/list/`)
        .on('value', (snapshot) => {
            dispatch(setList(snapshot.val() || {}))
        })
}

export const stopSyncingList = () => (dispatch, getState) => {
    database.ref(``)
        .off('value')
}

export const pushTask = (obj) => (dispatch, getState) => {
    dispatch(setNewTask(obj))
    database.ref(``)
        .push(getState().chat.newTask)
        .then(() => {})
        .catch(() => {})
}

export const updateTask = (id, obj) => (dispatch, getState) => {
    // not thru store ?? how it should be ??
    database.ref(``)
        .update(obj)
        .then(() => {})
        .catch(() => {})
}

export const removeTask = (id) => (dispatch, getState) => {
    // not thru store ?? how it should be ??
    database.ref(``)
        .remove()
        .then(() => {})
        .catch(() => {})
}


const initialState = {
    listData: {},
    newTask: {},
    updatedTask: {}
}


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            return {
                ...state,
                listData: action.list
            }
        case SET_NEW_TASK:
            return {
                ...state,
                newTask: action.newTask
            }
        default:
            return state
    }
}