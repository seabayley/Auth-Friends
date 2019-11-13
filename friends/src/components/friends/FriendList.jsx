import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getFriends } from '../../actions/index'

export default () => {
    const dispatch = useDispatch()
    const friends = useSelector(state => state.friends)

    useEffect(() => {
        dispatch(getFriends())
    }, [])

    return (
        <div>
            {friends.map(friend => {
                return <p>{friend.name}</p>
            })}
        </div>
    )
}