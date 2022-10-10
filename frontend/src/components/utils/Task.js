import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createTask, resetT } from '../../features/tasks/taskSlice'
import { toast } from 'react-toastify'

export default function Task({setOpenModal}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    description: '',
    type: 'Break',
    startTime: '',
    timeTaken: 1,
  })

  const { description, type, startTime, timeTaken } = formData

  const { isError, isSuccess, message } = useSelector((state) => state.tasks)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message, isSuccess, navigate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const taskData = {
      description,
      type,
      startTime,
      timeTaken,
    }

    dispatch(createTask(taskData))
    dispatch(resetT())

    setOpenModal(false)
  }

  return (
    <>
      <div
        style={{
          border: '2px solid red',
          margin: '20px 40px',
          padding: '20px',
          width: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
        }}
      >
        <form style={{ width: '400px' }}>
          <h2>Add Task</h2>
          <div className='form-group my-1 py-1'>
            <label>Task Description</label>
            <textarea
              className='form-control'
              id='description'
              name='description'
              value={description}
              rows='3'
              onChange={onChange}
            ></textarea>
          </div>

          <div className='form-group my-1 py-1'>
            <label>Task Type </label>
            <select
              className='form-control'
              id='type'
              name='type'
              value={type}
              onChange={onChange}
            >
              <option>Break</option>
              <option>Meeting</option>
              <option>Work</option>
            </select>
          </div>
          {/* email */}
          <div className='form-group my-1 py-1'>
            <label>Start Time</label>
            <input
              type='datetime-local'
              className='form-control'
              id='startTime'
              name='startTime'
              value={startTime}
              aria-describedby='emailHelp'
              onChange={onChange}
            />
          </div>
          <div className='form-group my-1 py-1'>
            <label>Time taken to complete the task in minutes</label>
            <input
              type='number'
              min='1'
              className='form-control'
              id='timeTaken'
              name='timeTaken'
              value={timeTaken}
              onChange={onChange}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <button
              type='submit'
              className='btn btn-primary my-2'
              onClick={onSubmit}
            >
              Add
            </button>
            <button
              type='submit'
              className='btn btn-primary my-2'
              onClick={() => {
                setOpenModal(false)
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
