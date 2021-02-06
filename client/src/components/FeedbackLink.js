import React from 'react'
import {NavLink} from 'react-router-dom'

export const FeedbackLink = () => {
  return (
    <div className="feedback-link">
      <span>Возникли вопросы? Задайте их с помощью <NavLink to="/feedback">формы обратной связи</NavLink></span>
    </div>
  )
}