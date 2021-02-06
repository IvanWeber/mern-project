import React, {useContext, useEffect, useState, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {BlogForm} from '../components/BlogForm'
import {BlogPostsList} from '../components/BlogPostsList'
// import {NavLink, useHistory} from 'react-router-dom'

export const ProfilePage = () => {
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [user, setUser] = useState('')
  const [authUserId, setAuthUserId] = useState('')
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

  const fetchAuthUserId = useCallback(async () => {
    try {
      const authUserId = await request('/api/blog-post/user-id', 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      })
      setAuthUserId(authUserId)
    } catch (e) {

    }
  }, [auth.token, request])



  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  useEffect(() => {
    fetchAuthUserId()
  }, [fetchAuthUserId])


  if (userId === authUserId) {
    return (
      <div className="row profile-page">
        Profile Page {user.name}
        <BlogForm authUserId={authUserId}/>
        <BlogPostsList />
        
      </div>
    )
  }

  return (
    <div className="row profile-page">
      Profile Page {user.name}
      <BlogPostsList />
      
    </div>
  )
}
