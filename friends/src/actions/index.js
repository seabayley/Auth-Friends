import { axiosWithAuth } from '../axios/axiosAuth'
import axios from 'axios'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const GET_FRIENDS_START = 'GET_FRIENDS_START'
export const GET_FRIENDS_SUCCESS = 'GET_FRIENDS_SUCCESS'
export const GET_FRIENDS_FAIL = 'GET_FRIENDS_FAIL'

export const CREATE_FRIEND_START = 'CREATE_FRIENDS_START'
export const CREATE_FRIEND_SUCCESS = 'CREATE_FRIENDS_SUCCESS'
export const CREATE_FRIEND_FAIL = 'CREATE_FRIENDS_FAIL'

export const UPDATE_FRIEND_START = 'UPDATE_FRIENDS_START'
export const UPDATE_FRIEND_SUCCESS = 'UPDATE_FRIENDS_SUCCESS'
export const UPDATE_FRIEND_FAIL = 'UPDATE_FRIENDS_FAIL'

export const DELETE_FRIEND_START = 'DELETE_FRIEND_START'
export const DELETE_FRIEND_SUCCESS = 'DELETE_FRIEND_SUCCESS'
export const DELETE_FRIEND_FAIL = 'DELETE_FRIEND_FAIL'

export const UPDATE_TOKEN = 'UPDATE_TOKEN'
export const UPDATE_CURRENT_FRIEND = 'UPDATE_CURRENT_FRIEND'
export const LOGOUT_USER = 'LOGOUT_USER'

export const postLoginUser = payload => dispatch => {
    dispatch({ type: LOGIN_START })
    axios
        .post('http://localhost:5000/api/login/', payload.credentials)
        .then(res => {
            dispatch({ type: LOGIN_SUCCESS, payload: res.data.payload })
            payload.props.history.push('/')
        })
        .catch(err => dispatch({ type: LOGIN_FAIL, payload: err }))
}

export const updateToken = payload => dispatch => {
    dispatch({ type: UPDATE_TOKEN, payload: payload })
}

export const updateCurrentFriend = payload => dispatch => {
    dispatch({ type: UPDATE_CURRENT_FRIEND, payload: payload })
}

export const logoutUser = payload => dispatch => {
    dispatch({ type: LOGOUT_USER, payload: payload })
    payload.history.push('/login')
}

export const getFriends = payload => dispatch => {
    dispatch({ type: GET_FRIENDS_START, payload: payload })
    axiosWithAuth()
        .get('http://localhost:5000/api/friends', payload)
        .then(res => dispatch({ type: GET_FRIENDS_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: GET_FRIENDS_FAIL, payload: err }))
}

export const createFriend = payload => dispatch => {
    dispatch({ type: CREATE_FRIEND_START })
    axiosWithAuth()
        .post('http://localhost:5000/api/friends', payload)
        .then(res => dispatch({ type: CREATE_FRIEND_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: CREATE_FRIEND_FAIL, payload: err }))
}

export const updateFriend = payload => dispatch => {
    dispatch({ type: UPDATE_FRIEND_START })
    axiosWithAuth()
        .put(`http://localhost:5000/api/friends/${payload.id}`, {
            email: String(payload.email),
            name: String(payload.name),
            age: Number(payload.age),
            image: String(payload.image)
        })
        .then(res => dispatch({ type: UPDATE_FRIEND_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: UPDATE_FRIEND_FAIL, payload: err }))
}

export const deleteFriend = payload => dispatch => {
    dispatch({ type: DELETE_FRIEND_START })
    axiosWithAuth()
        .delete(`http://localhost:5000/api/friends/${payload.id}`, payload)
        .then(res => dispatch({ type: DELETE_FRIEND_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: DELETE_FRIEND_FAIL, payload: err }))
}