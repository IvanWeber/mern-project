import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {FeedbackLink} from '../components/FeedbackLink'

export const ProfileEditPage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [name, setName] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const user = await request('/api/profile-edit/set-name', 'POST', {name}, {
          Authorization: `Bearer ${auth.token}`
        })
        history.push(`/profile/${user._id}`)
      } catch (e) {}
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input
            placeholder="Введите ваше имя"
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="name">Введите ваше имя</label>
        </div>     
        <FeedbackLink /> 
      </div>
    </div>
  )
}
