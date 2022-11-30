import { connect } from 'react-redux'

const Notification = (props) => {
  
  const notification = props.notification.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  if (notification) {
    return <div style={style}>{notification}</div>
  } else {
    console.log('notification null');
    return null
  }
}

const mapStateToProps = (state) => {
  return {notification: state.notification}
}
const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
