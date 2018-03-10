import {database} from '../firebase'

const SET_LISTS = 'lists/SET_LISTS'                     // action for async .on() websocket, no response
const ADDING_LIST_START = 'lists/ADDING_LIST_START'           // action for async .push(), responses
const ADDING_LIST_SUCCESS = 'lists/ADDING_LIST_SUCCESS'       // if promise resolved
const ADDING_LIST_FAILED = 'lists/ADDING_LIST_FAILED'         // if promise rejected
const EDITING_LIST_START = 'lists/EDITING_LIST_START'         // action for async .update(), responses
const EDITING_LIST_SUCCESS = 'lists/EDITING_LIST_SUCCESS'     // if promise resolved
const EDITING_LIST_FAILED = 'lists/EDITING_LIST_FAILED'       // if promise rejected
const DELETING_LIST_START = 'lists/DELETING_LIST_START'         // action for async .remove(), responses
const DELETING_LIST_SUCCESS = 'lists/DELETING_LIST_SUCCESS'     // if promise resolved
const DELETING_LIST_FAILED = 'lists/DELETING_LIST_FAILED'       // if promise rejected

//ACTIONS CREATORS

const setLists = (lists) => ({
    type: SET_LISTS,
    lists
})
const addingListStart = (list) => ({  //new object to store and from store to db. just for visibility.
    type: ADDING_LIST_START,
    list
})
const addingListSuccess = (msg) => ({
    type: ADDING_LIST_SUCCESS,
    msg
})
const addingListFailed = (msg) => ({
    type: ADDING_LIST_FAILED,
    msg
})
const editingListStart = (list) => ({  //new object to store and from store to db. just for visibility.
    type: EDITING_LIST_START,
    list
})
const editingListSuccess = (msg) => ({
    type: EDITING_LIST_SUCCESS,
    msg
})
const editingListFailed = (msg) => ({
    type: EDITING_LIST_FAILED,
    msg
})
const deletingListStart = () => ({  //no payload
    type: DELETING_LIST_START
})
const deletingListSuccess = (msg) => ({
    type: DELETING_LIST_SUCCESS,
    msg
})
const deletingListFailed = (msg) => ({
    type: DELETING_LIST_FAILED,
    msg
})

// ASYNC ACTIONS CREATORS

export const syncLists = () => (dispatch, getState) => {
    const uid = getState().auth.user.uid
    database.ref(`/users/${uid}/lists/`)
        .on('value', (snapshot) => {
            dispatch(setLists(snapshot.val() || {}))
        })
}
export const stopSyncingLists = () => (dispatch, getState) => {
    const uid = getState().auth.user.uid
    database.ref(`/users/${uid}/lists/`)
        .off('value')
}

export const pushList = (obj) => (dispatch, getState) => {
    const uid = getState().auth.user.uid
    dispatch(addingListStart(obj))
    database.ref(`/users/${uid}/lists/`)
        .push(getState().lists.newListToSend)
        .then(() => {dispatch(addingListSuccess('List added successfully'))})
        .catch(() => {dispatch(addingListFailed('List add failed :('))})
}

export const updateList = (listId, obj) => (dispatch, getState) => {
    const uid = getState().auth.user.uid
    dispatch(editingListStart(obj))
    database.ref(`/users/${uid}/lists/${listId}`)
        .update(getState().lists.updatedListToSend)
        .then(() => {dispatch(editingListSuccess('List edited successfully'))})
        .catch(() => {dispatch(editingListFailed('List edit failed :('))})
}

export const removeList = (listId) => (dispatch, getState) => {
    const uid = getState().auth.user.uid
    dispatch(deletingListStart())
    database.ref(`/users/${uid}/lists/${listId}`)
        .remove()
        .then(() => {dispatch(deletingListSuccess('List deleted successfully'))})
        .catch(() => {dispatch(deletingListFailed('List delete failed :('))})
}


const initialState = {
    listsData: {},
    newListToSend: {},
    updatedListToSend: {},
    msg:'',
    snack:null
}


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LISTS:
            return {
                ...state,
                listsData: action.lists
            }
        case ADDING_LIST_START:
            return {
                ...state,
                newListToSend: action.list
            }
        case ADDING_LIST_SUCCESS:
            return {
                ...state,
                msg: action.msg
            }
        case ADDING_LIST_FAILED:
            return {
                ...state,
                msg: action.msg
            }
        case EDITING_LIST_START:
            return {
                ...state,
                updatedListToSend: action.list
            }
        case EDITING_LIST_SUCCESS:
            return {
                ...state,
                msg: action.msg
            }
        case EDITING_LIST_FAILED:
            return {
                ...state,
                msg: action.msg
            }
        case DELETING_LIST_START:
            return state
        case DELETING_LIST_SUCCESS:
            return {
                ...state,
                msg: action.msg
            }
        case DELETING_LIST_FAILED:
            return {
                ...state,
                msg: action.msg
            }
        default:
            return state
    }
}