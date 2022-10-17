const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:', req.path)
  console.log('Body:', req.body)
  console.log('---')

  next()
}

const unknownEndpoint = (req, res) => {
  console.log('Unknown endpoint')
  console.log('----');
  res.status(404).send({ error: 'Unknown endpoint' })
}

module.exports = { requestLogger, unknownEndpoint }
