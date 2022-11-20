import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('The function CreateNewBlog is called with correct information', async () => {
  const user = userEvent.setup()
  const createNewBlog = jest.fn()

  const container = render(<BlogForm createNewBlog={createNewBlog} />).container

  const title = container.querySelector('.Title')
  await user.type(title, 'Mocking makes testing easier and more appropriate.')

  const author = container.querySelector('.Author')
  await user.type(author, 'Testing author')

  const url = container.querySelector('.url')
  await user.type(url, 'www.jest.com')

  await user.click(container.querySelector('#sendButton'))

  expect(createNewBlog.mock.calls).toHaveLength(1)
  expect(createNewBlog.mock.calls[0][0].title).toBe(
    'Mocking makes testing easier and more appropriate.'
  )
  expect(createNewBlog.mock.calls[0][0].author).toBe('Testing author')
  expect(createNewBlog.mock.calls[0][0].url).toBe('www.jest.com')
})
