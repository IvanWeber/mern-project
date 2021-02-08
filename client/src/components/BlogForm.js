import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import { useMessage } from '../hooks/message.hook'
import {useHistory} from 'react-router-dom'

export const BlogForm = ({authUserId}) => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()
  const [blogPostForm, setBlogPost] = useState({
    heading: '',
    message: '',
    date: Date.now(),
    owner: authUserId
    })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])  
  
  const changeBlogPostFormHandler = (event) => {
    setBlogPost({ ...blogPostForm, [event.target.name]: event.target.value })
  }

  const blogPostHandler = async () => {
    try {
      const data = await request('/api/blog-post/create', 'POST', {...blogPostForm}, {
        Authorization: `Bearer ${auth.token}`
      })
      setBlogPost({
        heading: '',
        message: '',
        date: Date.now(),
        owner: authUserId
      })
      message(data.message)
      history.push(`/profile`)
    } catch (e) {}
  }

  return (
    <div>

    <div className="feedback-page">
        <div className="">
          <strong className="feedback-page__ask-your-question">Напишите пост для своего блога</strong>
          <div className="feedback-page__form row">
            <div className="input-field col s6">
              <input
                placeholder="Name"
                id="heading"
                name="heading"
                type="text"
                className="validate"
                disabled={loading}
                value={ blogPostForm.heading || "" }
                onChange={changeBlogPostFormHandler}
              />
              <label htmlFor="heading">Заголовок</label>
            </div>
            <div className="input-field col s6">
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                id="message"
                name="message"
                className="materialize-textarea"
                data-length="2500"
                disabled={loading}
                value={ blogPostForm.message || "" }
                onChange={changeBlogPostFormHandler}
              ></textarea>
              <label htmlFor="message">Текст</label>
            </div>
          </div>
          <button
            onClick={blogPostHandler}
            className="btn waves-effect waves-light"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  )
}
