import React, {useContext, useEffect} from 'react'
import {NavLink, useHistory, Link} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    var elems = document.querySelectorAll('.dropdown-trigger')
    window.M.Dropdown.init(elems)
  });

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }


  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
        <span href="/" className="brand-logo left">Cool Network</span>


        <a className='right dropdown-trigger dropdown-menu btn blue darken-1' href='/#' data-target='dropdown1'>Menu</a>
        <ul id='dropdown1' className='dropdown-content'>
          {/* <li><a href="/" onClick={profileHandler}>Мой профиль</a></li> */}
          <li><Link to={'/profile/' + auth.userId}>Мой профиль</Link></li>
          <li><NavLink to="/links">Ссылки</NavLink></li>
          <li><NavLink to="/create">Создать ссылку</NavLink></li>
          <li><NavLink to="/users">Пользователи</NavLink></li>
          <li><NavLink to="/profile-edit">Редактировать профиль</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul> 
        <ul id="nav-mobile" className="right hide-on-med-and-down long-nav-list">
          {/* <li><a href="/" onClick={profileHandler}>Мой профиль</a></li> */}
          <li><Link to={'/profile/' + auth.userId}>Мой профиль</Link></li>
          <li><NavLink to="/links">Ссылки</NavLink></li>
          <li><NavLink to="/create">Создать ссылку</NavLink></li>
          <li><NavLink to="/users">Пользователи</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}