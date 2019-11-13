import { axiosWithAuth } from '../axios/axiosAuth'
import axios from 'axios'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const GET_FRIENDS_START = 'GET_FRIENDS_START'
export const GET_FRIENDS_SUCCESS = 'GET_FRIENDS_SUCCESS'
export const GET_FRIENDS_FAIL = 'GET_FRIENDS_FAIL'

export const UPDATE_TOKEN = 'UPDATE_TOKEN'

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

export const getFriends = payload => dispatch => {
    dispatch({ type: GET_FRIENDS_START, payload: payload })
    axiosWithAuth()
        .get('http://localhost:5000/api/friends', payload)
        .then(res => dispatch({ type: GET_FRIENDS_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: GET_FRIENDS_FAIL, payload: err }))
}