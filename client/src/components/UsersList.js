import React from 'react'
import {Link} from 'react-router-dom'

export const UsersList = ({users}) => {
  if (!users.length) {
    return <p className="center">Пользователи не найдены</p>
  }
  return (
    <table>

        <thead>
          <tr>
              <th>№</th>
              <th>Имя</th>
              <th>Email</th>
              <th>Открыть</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/profile/${user._id}`}>Открыть</Link>
                </td>
              </tr>
            )
          })}
        </tbody>

      </table>
  )
}