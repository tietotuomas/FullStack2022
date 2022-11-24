import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog/>', () => {
  let container
  let mockedAddLike

  beforeEach(() => {
    const user = {
      name: 'Elon Musk',
      username: 'Elon',
      password: 'tesla',
      token: 'abc',
    }
    const blog = {
      author: 'software developer',
      title: 'Cypress vs robot framework',
      likes: 1,
      url: 'www.fullstack.com',
      user: { user },
    }

    mockedAddLike = jest.fn()
    const removeBlog = jest.fn()
    container = render(
      <Blog
        key="123"
        blog={blog}
        addLike={mockedAddLike}
        removeBlog={removeBlog}
        user={user}
      />
    ).container
  })

  test('author and title are rendered at start', () => {
    screen.getByText('software developer', { exact: false })
    screen.getByText('Cypress vs robot framework', {
      exact: false,
    })
  })

  test('uri and likes are not rendered at start', () => {
    const detailsElement = container.querySelector('.details')
    const uri = detailsElement.querySelector('#url')
    const likes = detailsElement.querySelector('#likes')
    expect(uri).toHaveTextContent('www.fullstack.com')
    expect(likes).toHaveTextContent('1')
    expect(detailsElement).toHaveStyle('display: none')
  })

  test('uri and likes are rendered after clicking the showButton', async () => {
    const showButton = container.querySelector('#showButton')
    const user = userEvent.setup()
    await user.click(showButton)

    const detailsElement = container.querySelector('.details')
    const uri = detailsElement.querySelector('#url')
    const likes = detailsElement.querySelector('#likes')
    expect(uri).toHaveTextContent('www.fullstack.com')
    expect(likes).toHaveTextContent('1')
    expect(detailsElement).not.toHaveStyle('display: none')
  })

  test('The function addLike is called twice when the likeButton is clicked twice', async () => {
    const likeButton = container.querySelector('#likeButton')
    const user = userEvent.setup()
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockedAddLike.mock.calls).toHaveLength(2)
  })
})
