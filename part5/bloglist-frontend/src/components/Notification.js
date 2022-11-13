const Notificiation = ({ message, errorMessage }) => {
  if (message === null) {
    return null
  }
  if (errorMessage) {
    return <div className="error">{message}</div>
  }
  return <div className="confirmation">{message}</div>
}

export default Notificiation
