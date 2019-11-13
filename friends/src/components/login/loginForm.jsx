import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postLoginUser } from '../../actions/index'

export default props => {
    const [credentials, setCredentials] = useState({})
    const dispatch = useDispatch()

    const handleChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const loginUser = e => {
        e.preventDefault()
        dispatch(postLoginUser({ props, credentials }))
    }

    return (
        <div>
            <form onSubmit={(e) => loginUser(e)}>
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                />
                <button>Log in</button>
            </form>
        </div>
    )

}