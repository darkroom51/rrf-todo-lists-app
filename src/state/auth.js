import {database, auth, googleProvider} from '../firebase'
// import {stopSyncingMeals} from './meals'
//
// import {fetchFav} from './fav'
// import {fetchMeals} from './meals'

const SET_USER = 'auth/SET_USER'
const SET_LOGIN_LOGS = 'auth/SET_LOGIN_LOGS'
const SET_LOGIN_MSG = 'auth/SET_LOGIN_MSG'

const setUser = (user) => ({ //kreator akcji zwyklej
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
        // if not logged in user is null !
        dispatch(setUser(user))

        if(user){ //if not null user is logged in, so set his record in DB
            dispatch(logLoginDate())
            dispatch(syncLoginLogs())
            // dispatch(fetchFav())
            // dispatch(fetchMeals())
        }
    })
}

const syncLoginLogs = () => (dispatch, getState) =>{
    const uid = getState().auth.user.uid   //pobierz ze storu reduxa stan przez getState()
    database.ref(`/users/${uid}/loginLogs`)
        .on('value', (snapshot)=>dispatch(setLoginLogs(snapshot.val())))
}

const logLoginDate = () => (dispatch, getState) => {
    const uid = getState().auth.user.uid   //pobierz ze storu reduxa stan przez getState()
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
            // dispatch(stopSyncingMeals(uid))
        })
        .catch(() => dispatch(setLoginMsg('Something wrong with LogOut!')))
}

export const logInWithGoogle = () => (dispatch, getState) => {
    auth.signInWithPopup(googleProvider)
        .then(() => console.log('Logged in!'))
        .catch(() => dispatch(setLoginMsg('Something wrong with G Login!')))
}



const initialState = {
    user: null,
    msg: '',
    snackbarOpen: false,
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
                msg: action.loginMsg,
                snackbarOpen: true,
            }
        }
        default:
            return state
    }
}