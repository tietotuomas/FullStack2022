const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const User = require('../models/user')
const logger = require('./logger')

const requestLogger = (req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    logger.info('Method:', req.method)
    logger.info('Path:', req.path)
    if (req.body) {
      logger.info('Body:', req.body)
    }

    logger.info('---')
  }
  next()
}

const userExtractor = async (req, res, next) => {
  console.log('userExtractor');
  const authorization = req.get('authorization')
  console.log({authorization});
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(authorization.substring(7), SECRET)
    console.log({ decodedToken })
    if (decodedToken) {
      req.user = await User.findById(decodedToken.id)
      console.log(`req.user ${req.user}`)
    }
  }
  next()
}

const unknownEndpoint = (req, res) => {
  logger.info('Unknown endpoint')
  logger.info('----')
  res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error('Errorhandler:')
  logger.error(error.message)

  //why .send, not .json
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id.' })
  }

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
  userExtractor,
}
