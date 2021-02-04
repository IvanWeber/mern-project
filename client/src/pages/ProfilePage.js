import React, {useContext, useEffect, useState, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {BlogForm} from '../components/BlogForm'
// import {NavLink, useHistory} from 'react-router-dom'

export const ProfilePage = () => {
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [user, setUser] = useState('')
  const [authUserId, setAuthUserId] = useState('')
  const [blogPosts, setBlogPosts] = useState([])
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

  const fetchBlogPosts = useCallback(async () => {
    try {
      const posts = await request(`/api/blog-post/${userId}`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      })
      setBlogPosts(posts)
    } catch (e) {

    }
  }, [auth.token, request])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  useEffect(() => {
    fetchAuthUserId()
  }, [fetchAuthUserId])

  useEffect(() => {
    fetchBlogPosts()
  }, [fetchBlogPosts])

  if (userId === authUserId) {
    return (
      <div className="row profile-page">
        Profile Page {user.name}
        <BlogForm authUserId={authUserId}/>
        {blogPosts.map((post, index) => {
          return <div className="blog-post">
                    <h3 className="blog-post__header">{post.heading}</h3>
                    <div className="blog-post__message">{post.message}</div>
                    <div className="blog-post__date">{post.date}</div>
                 </div>
        })}
      </div>
    )
  }

  return (
    <div className="row profile-page">
      Profile Page {user.name}
      {blogPosts.map((post, index) => {
          return <div className="blog-post">
                    <h3 className="blog-post__header">{post.heading}</h3>
                    <div className="blog-post__message">{post.message}</div>
                    <div className="blog-post__date">{post.date}</div>
                 </div>
        })}
    </div>
  )
}
