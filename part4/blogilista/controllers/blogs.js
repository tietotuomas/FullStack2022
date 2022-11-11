const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogRouter.post('/', userExtractor, async (req, res) => {
  const body = req.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: req.user._id,
  })
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog.toJSON())
})

blogRouter.delete('/:id', userExtractor, async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id)
  if (!blog) {
    return res.status(204).end()
  }
  if (blog.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ error: 'Not authorized to delete the blog.' })
  }
  await Blog.deleteOne(blog)
  res.status(204).end()
})

blogRouter.put('/:id', userExtractor, async (req, res) => {
  const id = req.params.id
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: req.user._id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {new:true})
  console.log({ updatedBlog })

  res.json(updatedBlog)
})

module.exports = blogRouter
