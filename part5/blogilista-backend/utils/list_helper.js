const blog = require('../models/blog')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length) {
    const blog = blogs.reduce((favorite, next) => {
      return favorite.likes >= next.likes ? favorite : next
    }, blogs[0])
    return {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
    }
  }
  return undefined
}

const mostBlogs = (blogs) => {
  if (blogs.length) {
    const totalBlogs = blogs.reduce((authors, next) => {
      const index = authors.findIndex((a) => a.author === next.author)
      if (index !== -1) {
        authors[index].blogs += 1
      } else {
        authors.push({ author: next.author, blogs: 1 })
      }
      return authors
    }, [])
    totalBlogs.sort((prev, next) => (prev.blogs > next.blogs ? -1 : 1))
    return totalBlogs[0]
  }
  return undefined
}

const mostLikes = (blogs) => {
  if (blogs.length !== 0) {
    const totalLikes = blogs.reduce((authors, next) => {
      const index = authors.findIndex((a) => a.author === next.author)
      index !== -1
        ? (authors[index].likes += next.likes)
        : authors.push({ author: next.author, likes: next.likes })
      return authors
    }, [])

    return totalLikes.sort((a, b) => (a.likes > b.likes ? -1 : 1))[0]
  }
  return undefined
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
