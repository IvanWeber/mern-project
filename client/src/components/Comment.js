import React, {useContext, useEffect, useState} from 'react'
import { useMessage } from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import {Link} from 'react-router-dom'

export const Comment = ({commentId}) => {
  const auth = useContext(AuthContext)
  const { request, error, clearError } = useHttp()
  const message = useMessage()
  const [comment, setComment] = useState('')
  const [user, setUser] = useState('')

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])  

  useEffect(() => {
    let cleanupFunction = false
    const fetchCommentAndUser = async () => {
      try {
        const comment = await request(`/api/comments/getComment/${commentId}`, 'GET', null, {
          Authorization: `Bearer ${auth.token}`
        })
        if(!cleanupFunction) setComment(comment)
  
        const user = await request(`/api/profile/${comment.owner}`, 'GET', null, {
          Authorization: `Bearer ${auth.token}`
        })
        if(!cleanupFunction) setUser(user)
      } catch (e) {
        console.error(e.message)
      }
    }

    fetchCommentAndUser()
    return () => cleanupFunction = true
  }, [auth.token, commentId, request])


  return (
    <div className="col s12 m7">
    {/* <h2 className="header">Horizontal Card</h2> */}
    <div className="card horizontal">
      {/* <div className="card-image">
        <img src="https://lorempixel.com/100/190/nature/6" />
      </div> */}
      <div className="card-stacked">
        <div className="card-content">
          <p>{comment.message}</p>
        </div>
        <div className="card-action">
          <Link to={'/profile/' + user._id}>Пользователь:{user.name}</Link>
        </div>
      </div>
    </div>
  </div>
  )
}