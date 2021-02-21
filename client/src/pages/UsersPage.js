import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {UsersList} from '../components/UsersList'
import {FeedbackLink} from '../components/FeedbackLink'

export const UsersPage = () => {
  const [users, setUsers] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  useEffect(() => {
    let cleanupFunction = false
    const fetchUsers = async () => {
      try {
        const fetched = await request('/api/users', 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        if(!cleanupFunction) setUsers(fetched)
      } catch (e) {
        console.error(e.message)
      }
    }

    fetchUsers()
    return () => cleanupFunction = true
  }, [token, request])

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && <UsersList users={users} />}
      <FeedbackLink />
    </>
  )
}
