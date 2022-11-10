const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog.js')
const app = require('../app.js')

const api = supertest(app)

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

const newBlog = {
  title:
    'Systems based on the microservice architecture are highly maintaintable and loosely coupled',
  author: 'Bullo',
  url: 'www.mikropalveluarkkitehtuuri.fi',
  likes: 1,
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
})

describe('/api/blogs works correctly when there are blogs in the database', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('correct amount of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length)
  })
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map((b) => b.title)
    expect(titles).toContain('React patterns')
  })
  test('returned blog contain a string property named id', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    expect(id).toBeDefined()
    expect(typeof id).toBe('string')
  })
  test('returned blog does not contain removed properties named _id and __v', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog._id).toBeUndefined()
    expect(blog.__v).toBeUndefined()
  })
})

describe('after posting a new blog', () => {
  test('the response includes correct status code and Content-type', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
  test('the amount of blogs is increased by one', async () => {
    await api.post('/api/blogs').send(newBlog)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length + 1)
  })
  test('the new blog is added to the database', async () => {
    const post_response = await api.post('/api/blogs').send(newBlog)
    expect(post_response.body.title).toBe(
      'Systems based on the microservice architecture are highly maintaintable and loosely coupled'
    )
    const get_response = await api.get('/api/blogs')
    const titles = get_response.body.map((b) => b.title)

    expect(titles).toContain(
      'Systems based on the microservice architecture are highly maintaintable and loosely coupled'
    )
  })
  test('likes will be set to 0 if left empty', async () => {
    const blogWithoutLikes = { ...newBlog }
    delete blogWithoutLikes.likes
    const post_response = await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const get_response = await api.get('/api/blogs')
    const fetchedBlog = get_response.body.find(
      (b) =>
        b.title ===
        'Systems based on the microservice architecture are highly maintaintable and loosely coupled'
    )
    expect(fetchedBlog.likes).toBe(0)
  })
  test('without a title the saving process fails and server responds with the status code 400 - Bad Request', async () => {
    const blogWithoutTitle = { ...newBlog }
    delete blogWithoutTitle.title
    const post_response = await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const get_response = await api.get('/api/blogs')
    expect(get_response.body).toHaveLength(blogs.length)
  })
  test('without a url the saving process fails and server responds with the status code 400 - Bad Request', async () => {
    const blogWithoutUrl = { ...newBlog }
    delete blogWithoutUrl.url
    const post_response = await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const get_response = await api.get('/api/blogs')
    expect(get_response.body).toHaveLength(blogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
