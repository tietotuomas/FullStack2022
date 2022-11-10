const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
  console.log('login')
  const { username, password } = req.body
  console.log({ password })
  const user = await User.findOne({ username })
  const correctPassword =
    user === null || password === undefined
      ? false
      : await bcrypt.compare(password, user.passwordHash)
  console.log({ user }, { correctPassword })
  if (!(user && correctPassword)) {
    console.log('virhe')
    return res.status(401).json({ error: 'Invalid username or password.' })
  }
  const userForToken = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)
  res.status(200).send({token, username: user.username, name: user.name})
})

module.exports = loginRouter
