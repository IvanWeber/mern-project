import React, {useContext, useEffect, useState, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import {BlogPost} from '../components/BlogPost'
import {CommentForm} from '../components/CommentForm'
import {Comment} from '../components/Comment'

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
  }, [userId, auth.token, request])


  useEffect(() => {
    fetchBlogPosts()
  }, [fetchBlogPosts])

  return (
  <ul className="blog-posts-list">
    {blogPosts.map((post, index) => {
      return <li key={index} className="row">
              <BlogPost post={post}/>
              <ul className="comments-list">
                {post.comments.map((commentId, index) => {return <li key={index} className="row"><Comment commentId={commentId}/></li>})}
              </ul>
              <CommentForm blogPostId={post._id} />
             </li>
             
    })}
  </ul>
  )
}