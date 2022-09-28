const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
})

blogRouter.post('/', (req, res) => {
  const body = req.body
  console.log(body);
  const blog = new Blog(body)
  blog.save().then((savedBlog) => {
    res.status(201).json(savedBlog)
  })
})

module.exports = blogRouter