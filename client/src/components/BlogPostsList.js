import React, {useContext, useEffect, useState, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'

export const BlogPostsList = () => {
  const {request} = useHttp()
  const auth = useContext(AuthContext)
  const [blogPosts, setBlogPosts] = useState([])
  const userId = useParams().id

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
    fetchBlogPosts()
  }, [fetchBlogPosts])

  return (
  <ul className="blog-posts-list">
    {blogPosts.map((post, index) => {
      return <li key={index} className="blog-post">
                <h3 className="blog-post__header">{post.heading}</h3>
                <div className="blog-post__message">{post.message}</div>
                <div className="blog-post__date">{post.date}</div>
            </li>
    })}
  </ul>
  )
}