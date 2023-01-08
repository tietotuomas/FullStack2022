const BlogDetails = ({ blog, likeBlog, removeBlog, own }) => {
    if (!blog) return null
  
    const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'
    console.log({likeBlog});
  
    return (
      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes <button onClick={() => likeBlog(blog.id)}>like</button>
        </div>
        Added by {addedBy}
        {own&&<button onClick={() => removeBlog(blog.id)}>
          remove
        </button>}
      </div>
    )
  }

  export default BlogDetails
  