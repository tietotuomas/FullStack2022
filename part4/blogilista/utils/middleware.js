const jwt = require('jsonwebtoken')
const {SECRET} = require('../utils/config')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Method:', req.method)
    console.log('Path:', req.path)
    console.log('Body:', req.body)
    console.log('---')
  }
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  req.token =
    authorization && authorization.toLowerCase().startsWith('bearer ')
      ? authorization.substring(7)
      : null

  next()
}

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, SECRET)
  if (!req.token || !decodedToken.id) {
    return response.status(401).json({ error: 'Missing or invalid token.' })
  }

  req.user = await User.findById(decodedToken.id)
  next()
}

const unknownEndpoint = (req, res) => {
  console.log('Unknown endpoint')
  console.log('----')
  res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.log('Errorhandler:')
  console.log(error.message)

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Missing or invalid token.' })
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}
