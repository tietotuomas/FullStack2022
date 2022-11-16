import PropTypes from 'prop-types'

const Notification = ({ message, errorMessage }) => {
  if (message === null) {
    return null
  }
  if (errorMessage) {
    return <div className="error">{message}</div>
  }
  return <div className="confirmation">{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string,
  setMessage: PropTypes.func,
}
export default Notification
