import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    GET_FRIENDS_START,
    GET_FRIENDS_SUCCESS,
    GET_FRIENDS_FAIL,
    CREATE_FRIEND_START,
    CREATE_FRIEND_SUCCESS,
    CREATE_FRIEND_FAIL,
    UPDATE_FRIEND_START,
    UPDATE_FRIEND_SUCCESS,
    UPDATE_FRIEND_FAIL,
    DELETE_FRIEND_START,
    DELETE_FRIEND_SUCCESS,
    DELETE_FRIEND_FAIL,
    UPDATE_TOKEN,
    UPDATE_CURRENT_FRIEND,
    LOGOUT_USER
} from '../actions'

const initialState = {
    isLoggedIn: false,
    isLoggingIn: false,
    loginError: '',
    token: '',
    friends: [],
    gettingFriends: false,
    gotFriends: false,
    friendError: '',
    currentFriend: ''
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

        case CREATE_FRIEND_START: {
            return {
                ...state,
                creatingFriend: true
            }
        }

        case CREATE_FRIEND_SUCCESS: {
            return {
                ...state,
                creatingFriend: false,
                friends: action.payload
            }
        }

        case CREATE_FRIEND_FAIL: {
            return {
                ...state,
                creatingFriend: false,
                friendError: action.payload
            }
        }

        case UPDATE_FRIEND_START: {
            return {
                ...state,
                creatingFriend: true
            }
        }

        case UPDATE_FRIEND_SUCCESS: {
            return {
                ...state,
                creatingFriend: false,
                friends: action.payload
            }
        }

        case UPDATE_FRIEND_FAIL: {
            return {
                ...state,
                creatingFriend: false,
                friendError: action.payload
            }
        }

        case DELETE_FRIEND_START: {
            return {
                ...state,
                deletingFriend: true
            }
        }

        case DELETE_FRIEND_SUCCESS: {
            return {
                ...state,
                deletingFriend: false,
                friends: action.payload
            }
        }

        case DELETE_FRIEND_FAIL: {
            return {
                ...state,
                deletingFriend: false,
                friendError: action.payload
            }
        }

        case UPDATE_TOKEN: {
            return {
                ...state,
                token: action.payload
            }
        }

        case UPDATE_CURRENT_FRIEND: {
            return {
                ...state,
                currentFriend: action.payload
            }
        }

        case LOGOUT_USER: {
            return {
                ...state,
                loggedIn: false
            }
        }


        default: {
            return state
        }
    }
}