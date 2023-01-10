import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { TableCell, TableRow } from '@mui/material'

const Blog = ({ blog, table }) => {
  return (
    <TableRow className={table}>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </TableCell>
      <TableCell>{blog.author}</TableCell>
    </TableRow>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
}

export default Blog
