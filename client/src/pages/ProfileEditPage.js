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
  const [file, setFile] = useState('')

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

  const fileChangeHandler = event => {
    setFile(event.target.files)
  }

  const formSubmitHandler = async event => {
    event.preventDefault();
    const formData = new FormData()
    const fileReady = file[0]
    formData.append('myFile', fileReady)
    formData.append('userId', auth.userId)
    const response = await fetch('/api/profile-edit/upload-avatar', {
    method: 'PUT',
    body: formData,
    headers: {
          Authorization: `Bearer ${auth.token}`
        },
  });
    return await response.json(); 
  }

  return (
    <div className="row">
      {/* asd */}
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
        <iframe name="dummyframe" id="dummyframe" style={{display: 'none'}}></iframe>
          <form method="POST" action="/api/profile-edit/upload-avatar" encType="multipart/form-data" className="my-form" target="dummyframe" onSubmit={formSubmitHandler}>
            <label htmlFor="avatar">Добавьте ваш аватар</label>
            <input type="file" name="file" onChange= {fileChangeHandler} id="avatar"/>
            <input type="submit" name="upload"/>
          </form>     
        <FeedbackLink /> 
      </div>
    </div>
  )
}
