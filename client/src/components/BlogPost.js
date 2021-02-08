import React, {useContext, useEffect} from 'react'
import { useMessage } from '../hooks/message.hook'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'

export const BlogPost = ({post}) => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { request, error, clearError } = useHttp()
  const message = useMessage()

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])  

  const blogPostRemoveHandler = async (postId) => {
    try {
      const data = await request(`/api/blog-post/delete/${postId}`, 'POST', null, {
        Authorization: `Bearer ${auth.token}`
      })
      message(data.message)
      history.push(`/profile`)
    } catch (e) {}
  }

  return (
      <div className="col s12 m10">
        <div className="card white darken-1">
          <div className="card-content">
            <span className="card-title">{post.heading}</span>
            <p>{post.message}</p>
          </div>
          <div className="blog-post__date card-action">{post.date}</div>
          <div className="card-action">
            {post.owner === auth.userId ? <div className="button-wrapper">
                                        <button className="waves-effect waves-light btn-small" onClick={() => blogPostRemoveHandler(post._id)}><i className="material-icons">delete</i></button>
                                      </div>
            : ''}
            
          </div>
          {/* <div className="card-action">
            <a href="#">This is a link</a>
            <a href="#">This is a link</a>
          </div> */}
        </div>
      </div>
  )
}