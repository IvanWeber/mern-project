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
      return <li className="row">
      <div claclassNamess="col s12 m6">
        <div className="card white darken-1">
          <div className="card-content">
            <span className="card-title">{post.heading}</span>
            <p>{post.message}</p>
          </div>
          <div className="blog-post__date card-action">{post.date}</div>
          {/* <div class="card-action">
            <a href="#">This is a link</a>
            <a href="#">This is a link</a>
          </div> */}
        </div>
      </div>
    </li>
             
    })}
  </ul>
  )
}