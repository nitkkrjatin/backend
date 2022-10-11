import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'

export default function Form({ setOpenModal }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    department: 'Finance',
    email: '',
    contactNumber: '',
    joiningDate: '',
    password: '',
  })

  const { name, department, email, contactNumber, joiningDate, password } =
    formData

  const { user, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      navigate(`/${user._id}/admin`)
    }
  }, [isError, message, isSuccess, user, navigate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      name,
      department,
      email,
      contactNumber,
      joiningDate,
      password,
    }

    dispatch(register(userData))
    setOpenModal(false)
  }

  return (
    <>
      <div
        style={{
          border: '2px solid red',
          margin: '30px 30px',
          padding: '20px',
          width: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
        }}
      >
        <form style={{ width: '400px' }}>
          <h2>Add Employee</h2>
          <div className='form-group'>
            <label>Full Name</label>
            <input
              type='text'
              className='form-control'
              name='name'
              value={name}
              id='name'
              placeholder='Enter Full Name'
              onChange={onChange}
            />
          </div>
          {/* department */}
          <div className='form-group'>
            <label>Select Department</label>
            <select
              className='form-control'
              id='department'
              name='department'
              value={department}
              onChange={onChange}
            >
              <option>Finance</option>
              <option>Tech</option>
              <option>Hr</option>
              <option>Research</option>
              <option>Others</option>
            </select>
          </div>
          {/* email */}
          <div className='form-group'>
            <label>Email address</label>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              aria-describedby='emailHelp'
              placeholder='Enter email'
              onChange={onChange}
            />
            <small id='emailHelp' className='form-text text-muted'>
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className='form-group'>
            <label>Contact Number</label>
            <input
              type='text'
              className='form-control'
              id='contact'
              name='contactNumber'
              value={contactNumber}
              placeholder='Enter Contact Number'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label>Joining Date</label>
            <input
              type='date'
              className='form-control'
              id='date'
              name='joiningDate'
              value={joiningDate}
              placeholder='Enter Joining Date'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Password'
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
