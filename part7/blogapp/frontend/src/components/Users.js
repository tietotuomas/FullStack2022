import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  console.log({ users })

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
            <td>{<Link to={`/users/${user.id}`}>{user.name}</Link>}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Users
