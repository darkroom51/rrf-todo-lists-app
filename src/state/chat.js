import {database} from '../firebase'

const SET_CHATS = 'chat/SET_CHATS'


const setChats = (chats) => ({
    type: SET_CHATS,
    chatsData: chats
})


export const syncChats = () => (dispatch, getState) => {
    const uid = getState().auth.user.uid
    database.ref(`/users/${uid}/meals`)
        .on('value', (snapshot) => {
            console.log('Syncing', uid)
            dispatch(setChats(snapshot.val() || {}))
        })
}

export const stopSyncingMeals = (uid) => (dispatch, getState) => {
    database.ref(`/users/${uid}/meals`)
        .off('value')
}


const initialState = {
    mealsData: {}
}


export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MEALS:
            return {
                ...state,
                mealsData: action.meals
            }
        default:
            return state
    }
}