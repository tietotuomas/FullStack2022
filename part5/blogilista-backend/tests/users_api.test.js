const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const User = require('../models/user.js')
const app = require('../app.js')

const api = supertest(app)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const hashedPassword = await bcrypt.hash('dogecoin', 10)
    const user = new User({
      name: 'Elon Musk',
      username: 'crazyBillionare',
      passwordHash: hashedPassword,
    })
    await user.save()
  })
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct amount of users are returned initially', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(1)
  })
  test('creating another user with valid information increase the number of users by one', async () => {
    const usersAtStart = await User.find({})
    const hashedPassword = await bcrypt.hash('amazon', 10)
    const user = new User({
      name: 'Jeff Bezos',
      username: 'BaldAndBeatiful',
      passwordHash: hashedPassword,
    })
    await user.save()
    const userAtEnd = await User.find({})
    expect(userAtEnd).toHaveLength(usersAtStart.length + 1)
  })
  test('creating another user with an identical username return correct status code and error message', async () => {
    const user = {
      name: 'Elon',
      username: 'crazyBillionare',
      password: 'tesla',
    }
    const postResponse = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(postResponse.body.error).toContain('Username must be unique.')
    const getResponse = await api.get('/api/users')
    expect(getResponse.body).toHaveLength(1)
  })
  test('creating another user with an invalid username returns correct status code and error message', async () => {
    const user = {
      name: 'Jeff Bezos',
      username: '42',
      password: 'amazon',
    }
    const postResponse = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(postResponse.body.error).toContain(
      ' Path `username` (`42`) is shorter than the minimum allowed length (3)'
    )
    const getResponse = await api.get('/api/users')
    expect(getResponse.body).toHaveLength(1)
  })

  test('creating another user without a username returns correct status code and error message', async () => {
    const user = {
      name: 'Jeff Bezos',
      password: 'amazon',
    }
    const postResponse = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(postResponse.body.error).toContain(
      'username: Path `username` is required.'
    )
    const getResponse = await api.get('/api/users')
    expect(getResponse.body).toHaveLength(1)
  })

  test('creating another user with invalid password returns correct status code and error message', async () => {
    const user = {
      name: 'Jeff Bezos',
      username: 'BaldAndBeatiful',
      password: '69',
    }
    const postResponse = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(postResponse.body.error).toContain(
      'Invalid password. Password must contain at least 3 characters.'
    )
    const getResponse = await api.get('/api/users')
    expect(getResponse.body).toHaveLength(1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
