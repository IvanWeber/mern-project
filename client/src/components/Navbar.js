import React, {useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const {request} = useHttp()

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  const profileHandler = async event => {
    event.preventDefault()
    try {
      const user = await request('/api/profile/user', 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      })
      history.push(`/profile/${user._id}`)
    } catch (e) {

    }
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
        <span href="/" className="brand-logo">Сокращение ссылок</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Создать</NavLink></li>
          <li><NavLink to="/links">Ссылки</NavLink></li>
          <li><a href="/" onClick={profileHandler}>Мой профиль</a></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  )
}