import { useState } from 'react'
import Proptypes from 'prop-types'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const blogStyle = {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2,
    marginTop: 2,
  }

  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  return (
    <div style={blogStyle}>
      <b>
        <span className='blog'>{blog.title} - {blog.author}{' '}</span>
        <button
          id="showButton"
          style={hideWhenVisible}
          onClick={toggleVisibility}
        >
          show
        </button>
        <button
          id="hideButton"
          style={showWhenVisible}
          onClick={toggleVisibility}
        >
          hide
        </button>
      </b>
      <div className="details" style={showWhenVisible}>
        <span id="url">{blog.url}</span>
        <br></br>
        Likes: <span id="likes">{blog.likes}</span>{' '}
        <button id="likeButton" onClick={() => addLike(blog)}>
          like
        </button>
        <br></br>
        Added by:{' '}
        {blog.user.name === undefined ? blog.user.username : blog.user.name}
        <br></br>
        {user.username === blog.user.username ? (
          <button onClick={() => removeBlog(blog)}>remove</button>
        ) : null}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: Proptypes.object.isRequired,
  addLike: Proptypes.func.isRequired,
  removeBlog: Proptypes.func.isRequired,
  user: Proptypes.object.isRequired,
}
export default Blog
