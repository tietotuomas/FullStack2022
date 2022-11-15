const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

router.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Missing or invalid token.' })
  }
  const user = req.user
  const body = req.body

  const blog = new Blog({
    ...body,
    user: req.user._id,
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  console.log(
    `${user.username}'s blogs: ${user.blogs} savedBlog.id: ${savedBlog.id}`
  )
  await user.save()
  res.status(201).json(savedBlog)
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id)
  if (!blog) {
    return res.status(204).end()
  }
  // blogToDelete.user &&
  console.log('delete by req.user.id:', req.user.id)
  if (blog.user.toString() !== req.user.id.toString()) {
    return res.status(401).json({ error: 'Not authorized to delete the blog.' })
  }
  await Blog.deleteOne(blog)
  res.status(204).end()
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const blog = {...req.body, user: req.body.user.id}
  console.log({blog});
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  })
  console.log({ updatedBlog })

  res.json(updatedBlog)
})

module.exports = router
