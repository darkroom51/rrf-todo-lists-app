import {database, auth, googleProvider, facebookProvider} from '../firebase'
import {syncChat, stopSyncingChat} from './chat'
import {syncLists, stopSyncingLists} from './lists'
import {/*syncList,*/ stopSyncingList} from './list'

const SET_USER = 'auth/SET_USER'
const SET_LOGIN_LOGS = 'auth/SET_LOGIN_LOGS'
const SET_LOGIN_MSG = 'auth/SET_LOGIN_MSG'

const setUser = (user) => ({
    type: SET_USER,
    userData: user
})

const setLoginLogs = (logs) => ({
    type: SET_LOGIN_LOGS,
    logsData: logs
})

const setLoginMsg = (msg) => ({
    type: SET_LOGIN_MSG,
    loginMsg: msg
})



export const initAuth = () => (dispatch, getState) => {
    auth.onAuthStateChanged((user) => {
        // if not logged in user is null! if logged in set user data to store
        dispatch(setUser(user))

        if(user){ //if not null user is logged in, so set his record in DB
            dispatch(logLoginDate())
            dispatch(syncLoginLogs())
            dispatch(syncChat())
            dispatch(syncLists())
            // dispatch(syncList())
        }
    })
}

const syncLoginLogs = () => (dispatch, getState) =>{
    const uid = getState().auth.user.uid
    database.ref(`/users/${uid}/loginLogs`)
        .on('value', (snapshot)=>dispatch(setLoginLogs(snapshot.val())))
}

const logLoginDate = () => (dispatch, getState) => {
    const uid = getState().auth.user.uid
    database.ref(`/users/${uid}/loginLogs`)
        .push({timestamp: Date.now()})
        .then(() => console.log('LogIn Date pushed to DB!'))
        .catch(() => console.log('LogIn Date failed!'))
}

export const logIn = (email, password) => (dispatch, getState) => {
    auth.signInWithEmailAndPassword(email, password)
        .then(() => console.log('Logged in!'))
        .catch(() => dispatch(setLoginMsg('Something wrong with Login!')))
}

export const signUp = (email, password) => (dispatch, getState) => {
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => console.log('Signed Up!'))
        .catch(() => dispatch(setLoginMsg('Something wrong with SignUp!')))
}

export const logOut = () => (dispatch, getState) => {
    //const uid = getState().auth.user.uid
    auth.signOut()
        .then(() => {
            console.log('Logged Out!')
            dispatch(stopSyncingChat())
            dispatch(stopSyncingLists())
            dispatch(stopSyncingList())
        })
        .catch(() => dispatch(setLoginMsg('Something wrong with LogOut!')))
}

export const logInWithGoogle = () => (dispatch, getState) => {
    auth.signInWithPopup(googleProvider)
        .then(() => console.log('Logged in!'))
        .catch(() => dispatch(setLoginMsg('Something wrong with G Login!')))
}

export const logInWithFacebook = () => (dispatch, getState) => {
    auth.signInWithPopup(facebookProvider)
        .then(() => console.log('Logged in!'))
        .catch(() => dispatch(setLoginMsg('Something wrong with FB Login!')))
}



const initialState = {
    user: null,
    msg: ''
}



export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.userData
            }
        case SET_LOGIN_LOGS:{
            return {
                ...state,
                loginLogs: action.logsData
            }
        }
        case SET_LOGIN_MSG:{
            return {
                ...state,
                msg: action.loginMsg
            }
        }
        default:
            return state
    }
}