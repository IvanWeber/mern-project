import React, {useContext, useEffect, useState} from 'react'
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

  useEffect(() => {
    let cleanupFunction = false
    const fetchBlogPosts = async () => {
      try {
        const posts = await request(`/api/blog-post/${userId}`, 'GET', null, {
          Authorization: `Bearer ${auth.token}`
        })
        if(!cleanupFunction) setBlogPosts(posts)
      } catch (e) {
        console.error(e.message)
      }
    }

    fetchBlogPosts()
    return () => cleanupFunction = true
  }, [auth.token, request, userId])

  return (
  <ul className="blog-posts-list">
    {blogPosts.map((post, index) => {
      return <li key={index} className="row">
                <BlogPost post={post}/>
                <div className="comments-describer"><p>Комментарии:</p></div>
                <ul className="comments-list">
                  {post.comments.map((commentId, index) => {return <li key={index} className="row"><Comment commentId={commentId}/></li>})}
                </ul>
                <CommentForm blogPostId={post._id} />
             </li>
             
    })}
  </ul>
  )
}