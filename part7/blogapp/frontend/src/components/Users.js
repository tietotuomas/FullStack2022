import usersService from '../services/users'
import { useState, useEffect } from 'react'

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    console.log('useEffect inside Users-component invoked!')
    usersService.getAll().then((initialUsers) => setUsers(initialUsers))
  }, [])

  console.log({users});

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Users
