import React, {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {BlogForm} from '../components/BlogForm'
import {BlogPostsList} from '../components/BlogPostsList'
import {Loader} from '../components/Loader'
import {FeedbackLink} from '../components/FeedbackLink'

export const ProfilePage = () => {
  const auth = useContext(AuthContext)
  const {loading, request} = useHttp()
  const [user, setUser] = useState('')
  const [authUserId, setAuthUserId] = useState('')
  const userId = useParams().id

  useEffect(() => {
    let cleanupFunction = false
    const fetchUser = async () => {
      try {
        const user = await request(`/api/profile/${userId}`, 'GET', null, {
          Authorization: `Bearer ${auth.token}`
        })
        if(!cleanupFunction) setUser(user)
      } catch (e) {
        console.error(e.message)
      }
    }

    fetchUser()
    return () => cleanupFunction = true
  }, [auth.token, request, userId])

  useEffect(() => {
    let cleanupFunction = false
    const fetchAuthUserId = async () => {
      try {
        const authUserId = await request('/api/blog-post/user-id', 'GET', null, {
          Authorization: `Bearer ${auth.token}`
        })
        if(!cleanupFunction) setAuthUserId(authUserId)
      } catch (e) {
        console.error(e.message)
      }
    }

    fetchAuthUserId()
    return () => cleanupFunction = true
  }, [auth.token, request])

  if (loading) {
    return <Loader/>
  }


  if (userId === authUserId) {
    return (
      <div className="row profile-page">
        Profile Page {user.name}
        <BlogForm authUserId={authUserId}/>
        <BlogPostsList />
        <FeedbackLink />
      </div>
    )
  }

  return (
    <div className="row profile-page">
      Profile Page {user.name}
      <BlogPostsList />
      <FeedbackLink />
    </div>
  )
}
