import { connect } from 'react-redux'
import { editFilter } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    console.log(event.target.value)
    props.editFilter(event.target.value)
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}
const mapDispatchToProps = {
  editFilter,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter
