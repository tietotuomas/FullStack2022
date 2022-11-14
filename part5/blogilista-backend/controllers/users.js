const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    author: 1,
    title: 1,
    url: 1,
    likes: 1,
  })
  res.status(200).json(users)
})

router.post('/', async (req, res) => {
  const { username, name, password } = req.body
  console.log({ password })
  if (!password || password.length < 3) {
    return res.status(400).json({
      error: 'Invalid password. Password must contain at least 3 characters.',
    })
  }
  const existingUser = await User.findOne({ username })
  console.log({ existingUser })
  if (existingUser) {
    return res.status(400).json({ error: 'Username must be unique.' })
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({ name, username, passwordHash })
  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = router
