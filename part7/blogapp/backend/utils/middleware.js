const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('User-agent', request.get('User-Agent'))
  logger.info('Content-Type', request.get('Content-Type'))

  logger.info('-----')
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error('errorHandler:')
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    })
  }
  logger.error('next (error)')
  next(error)
}

const userExtractor = async (request, response, next) => {
  logger.info('userExtractor: ')
  const authorization = request.get('authorization')
  console.log({ authorization })
  console.log('--------')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(
      authorization.substring(7),
      process.env.SECRET
    )
    if (decodedToken) {
      request.user = await User.findById(decodedToken.id)
      console.log(`req.user: ${request.user}`)
    }
  }
  next()
}

const unknownEndpoint = (reqquest, response) => {
  logger.info('Unknown endpoint')
  response.status(404).send({ error: 'Unknown endpoint' })
}

module.exports = {
  errorHandler,
  userExtractor,
  requestLogger,
  unknownEndpoint,
}
