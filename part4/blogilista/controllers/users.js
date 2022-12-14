const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
})

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body
  console.log(password);
  if (!password || password.length < 4) {
    return res
      .status(400)
      .json({
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

module.exports = userRouter
