import React, {useContext, useEffect, useState, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
// import {NavLink, useHistory} from 'react-router-dom'

export const ProfilePage = () => {
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [user, setUser] = useState('')
  const userId = useParams().id


  const fetchUser = useCallback(async () => {
    try {
      const user = await request(`/api/profile/${userId}`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      })
      setUser(user)
    } catch (e) {

    }
  }, [auth.token, request, userId])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <div className="row profile-page">
      Profile Page {user.name}
    </div>
  )
}
