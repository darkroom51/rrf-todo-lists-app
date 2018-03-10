import {database} from '../firebase'

const SET_LIST = 'list/SET_LIST'                     // action for async .on() websocket, no response
const ADDING_TASK_START = 'list/ADDING_TASK_START'           // action for async .push(), responses
const ADDING_TASK_SUCCESS = 'list/ADDING_TASK_SUCCESS'       // if promise resolved
const ADDING_TASK_FAILED = 'list/ADDING_LIST_FAILED'         // if promise rejected
const EDITING_TASK_START = 'list/EDITING_TASK_START'         // action for async .update(), responses
const EDITING_TASK_SUCCESS = 'list/EDITING_TASK_SUCCESS'     // if promise resolved
const EDITING_TASK_FAILED = 'list/EDITING_TASK_FAILED'       // if promise rejected
const DELETING_TASK_START = 'list/DELETING_TASK_START'         // action for async .remove(), responses
const DELETING_TASK_SUCCESS = 'list/DELETING_TASK_SUCCESS'     // if promise resolved
const DELETING_TASK_FAILED = 'list/DELETING_TASK_FAILED'       // if promise rejected


//ACTIONS CREATORS

const setList = (list) => ({
    type: SET_LIST,
    list
})
const addingTaskStart = (task) => ({  //new object to store and from store to db. just for visibility.
    type: ADDING_TASK_START,
    task
})
const addingTaskSuccess = (msg) => ({
    type: ADDING_TASK_SUCCESS,
    msg
})
const addingTaskFailed = (msg) => ({
    type: ADDING_TASK_FAILED,
    msg
})
const editingTaskStart = (task) => ({  //new object to store and from store to db. just for visibility.
    type: EDITING_TASK_START,
    task
})
const editingTaskSuccess = (msg) => ({
    type: EDITING_TASK_SUCCESS,
    msg
})
const editingTaskFailed = (msg) => ({
    type: EDITING_TASK_FAILED,
    msg
})
const deletingTaskStart = () => ({  //no payload
    type: DELETING_TASK_START
})
const deletingTaskSuccess = (msg) => ({
    type: DELETING_TASK_SUCCESS,
    msg
})
const deletingTaskFailed = (msg) => ({
    type: DELETING_TASK_FAILED,
    msg
})

// ASYNC ACTIONS CREATORS

export const syncList = (listId) => (dispatch, getState) => {
    const uid = getState().auth.user.uid
    database.ref(`/users/${uid}/lists/${listId}/list/`)
        .on('value', (snapshot) => {
            dispatch(setList(snapshot.val() || {}))
        })
}
export const stopSyncingList = (listId) => (dispatch, getState) => {
    const uid = getState().auth.user.uid || null
    database.ref(`/users/${uid}/lists/${listId}/list/`)
        .off('value')
}

export const pushTask = (listId, obj) => (dispatch, getState) => {
    const uid = getState().auth.user.uid
    dispatch(addingTaskStart(obj))
    database.ref(`/users/${uid}/lists/${listId}/list/`)
        .push(getState().list.newTaskToSend)
        .then(() => {dispatch(addingTaskSuccess('Task added successfully'))})
        .catch(() => {dispatch(addingTaskFailed('Task add failed :('))})
}

export const updateTask = (taskId, listId, obj) => (dispatch, getState) => {
    const uid = getState().auth.user.uid
    dispatch(editingTaskStart(obj))
    database.ref(`/users/${uid}/lists/${listId}/list/${taskId}`)
        .update(getState().list.updatedTaskToSend)
        .then(() => {dispatch(editingTaskSuccess('Task edited successfully'))})
        .catch(() => {dispatch(editingTaskFailed('Task edit failed :('))})
}

export const removeTask = (taskId, listId) => (dispatch, getState) => {
    const uid = getState().auth.user.uid
    dispatch(deletingTaskStart())
    database.ref(`/users/${uid}/lists/${listId}/list/${taskId}`)
        .remove()
        .then(() => {dispatch(deletingTaskSuccess('Task deleted successfully'))})
        .catch(() => {dispatch(deletingTaskFailed('Task delete failed :('))})
}


const initialState = {
    listData: {},
    newTaskToSend: {},
    updatedTaskToSend: {},
    msg:''
}


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            return {
                ...state,
                listData: action.list
            }
        case ADDING_TASK_START:
            return {
                ...state,
                newTaskToSend: action.task
            }
        case ADDING_TASK_SUCCESS:
            return {
                ...state,
                msg: action.msg
            }
        case ADDING_TASK_FAILED:
            return {
                ...state,
                msg: action.msg
            }
        case EDITING_TASK_START:
            return {
                ...state,
                updatedTaskToSend: action.task
            }
        case EDITING_TASK_SUCCESS:
            return {
                ...state,
                msg: action.msg
            }
        case EDITING_TASK_FAILED:
            return {
                ...state,
                msg: action.msg
            }
        case DELETING_TASK_START:
            return state
        case DELETING_TASK_SUCCESS:
            return {
                ...state,
                msg: action.msg
            }
        case DELETING_TASK_FAILED:
            return {
                ...state,
                msg: action.msg
            }
        default:
            return state
    }
}