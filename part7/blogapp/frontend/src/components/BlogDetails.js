import { useState } from 'react'
const BlogDetails = ({ blog, likeBlog, removeBlog, own, addNewComment }) => {
  const [comment, setComment] = useState('')

  if (!blog) return null

  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'

  const addComment = (event) => {
    event.preventDefault()
    addNewComment(comment, blog.id)
    setComment('')
  }

  return (
    <div>
      <div>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes{' '}
        <button onClick={() => likeBlog(blog.id)}>like</button>
      </div>
      Added by {addedBy}
      {own && <button onClick={() => removeBlog(blog.id)}>remove</button>}
      <div>
        <h3>comments</h3>
        <form onSubmit={addComment}>
          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          ></input>
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogDetails
