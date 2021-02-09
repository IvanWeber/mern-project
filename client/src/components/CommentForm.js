import React, {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import { useMessage } from '../hooks/message.hook'
import {useHistory} from 'react-router-dom'

export const CommentForm = ({blogPostId}) => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()
  const userId = useParams().id
  const [commentForm, setCommentForm] = useState({
    message: '',
    date: Date.now(),
    blogPostRef: blogPostId,
    owner: auth.userId
    })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])  
  
  const changeCommentFormHandler = (event) => {
    setCommentForm({ ...commentForm, [event.target.name]: event.target.value })
  }

  const commentFormSendHandler = async () => {
    try {
      const data = await request('/api/comments/create', 'POST', {...commentForm}, {
        Authorization: `Bearer ${auth.token}`
      })
      setCommentForm({
        message: '',
        date: Date.now()
      })
      message(data.message)
      history.push(`/profile/${userId}`)
      window.location.reload()
    } catch (e) {}
  }

  return (
    <div>

    <div className="feedback-page">
        <div className="">
          <div className="row">
            <div className="input-field col s12">
              <textarea
                placeholder="Написать комментарий"
                id="message"
                name="message"
                className="materialize-textarea"
                data-length="2500"
                disabled={loading}
                value={ commentForm.message || "" }
                onChange={changeCommentFormHandler}
              ></textarea>
              <label htmlFor="message">Текст</label>
            </div>
          </div>
          <button
            onClick={commentFormSendHandler}
            className="btn waves-effect waves-light"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  )
}
