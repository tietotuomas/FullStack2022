import { useDispatch } from 'react-redux'
import { editFilter } from '../reducers/filterReducer'

const Filter = () => {
const dispatch = useDispatch()
  const handleChange = (event) => {
    console.log(event.target.value)
    dispatch(editFilter(event.target.value))
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

export default Filter
