import React, { useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const FeedbackForm = () => {
  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()
  const [feedbackForm, setFeedbackForm] = useState({
    email: '',
    name: '',
    message: '',
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])


  const changeFeedbackFormHandler = (event) => {
    setFeedbackForm({ ...feedbackForm, [event.target.name]: event.target.value })
  }


  const feedbackMessageSendingHandler = async () => {
    try {
      const data = await request('/api/feedback', 'POST', { ...feedbackForm })
      setFeedbackForm({
        email: '',
        name: '',
        message: '',
      })
      message(data.message)
    } catch (e) {}
  }


  return (
    <div className="feedback-form">
      <div className="col s12">
        <strong>Задайте ваш вопрос с помощью формы ниже</strong>
        <div className="row">
          <div className="input-field col s6">
            <input
              placeholder="Name"
              id="name"
              name="name"
              type="text"
              className="validate"
              disabled={loading}
              value={feedbackForm.name}
              onChange={changeFeedbackFormHandler}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field col s6">
            <input 
              id="email2" 
              name="email"
              type="email" 
              className="validate" 
              disabled={loading}
              value={feedbackForm.email}
              onChange={changeFeedbackFormHandler}
            />
            <label htmlFor="email">Email</label>
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
              value={feedbackForm.message}
              onChange={changeFeedbackFormHandler}
            ></textarea>
            <label htmlFor="message">Textarea</label>
          </div>
        </div>
        <button
          onClick={feedbackMessageSendingHandler}
          className="btn waves-effect waves-light"
        >
          Отправить
        </button>
      </div>
    </div>
  )
}
