import React from 'react'

export const FeedbackForm = ({
  changeFeedbackFormHandler,
  feedbackForm,
  feedbackMessageSendingHandler,
  loading
}) => {
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
