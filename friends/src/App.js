import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { updateToken } from './actions/index'

import LoginForm from './components/login/loginForm'
import FriendList from './components/friends/FriendList'

function App() {
  const dispatch = useDispatch()
  const currToken = useSelector(state => state.token)
  const newToken = localStorage.getItem('token')

  const loggedIn = useSelector(state => state.isLoggedIn)

  useEffect(() => {
    if (currToken === '' && !(newToken === '')) {
      dispatch({ type: updateToken, payload: newToken })
    }
    else if (!(currToken === '')) {
      localStorage.setItem('token', currToken)
    }
  }, [currToken, newToken, dispatch])

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={props => loggedIn ? (<Component {...props} />) : (<Redirect to="/login" />)} />
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={LoginForm} />
        <PrivateRoute path="/" component={FriendList} />
      </Switch>
    </Router>
  );
}

export default App;
