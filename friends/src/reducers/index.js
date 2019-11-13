import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    GET_FRIENDS_START,
    GET_FRIENDS_SUCCESS,
    GET_FRIENDS_FAIL,
    UPDATE_TOKEN
} from '../actions'

const initialState = {
    isLoggedIn: false,
    isLoggingIn: false,
    loginError: '',
    token: '',
    friends: [],
    gettingFriends: false,
    gotFriends: false,
    friendError: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_START: {
            return {
                ...state,
                isLoggingIn: true
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                token: action.payload
            }

        }
        case LOGIN_FAIL: {
            return {
                ...state,
                isLoggingIn: false,
                loginError: action.payload
            }
        }

        case GET_FRIENDS_START: {
            return {
                ...state,
                gettingFriends: true
            }
        }

        case GET_FRIENDS_SUCCESS: {
            return {
                ...state,
                gettingFriends: false,
                gotFriends: true,
                friends: action.payload
            }
        }

        case GET_FRIENDS_FAIL: {
            return {
                ...state,
                gettingFriends: false,
                gotFriends: false,
                friendError: action.payload
            }
        }

        case UPDATE_TOKEN: {
            return {
                ...state,
                token: action.payload
            }
        }
        default: {
            return state
        }
    }
}