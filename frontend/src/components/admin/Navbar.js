import React from 'react'
import Task from '../utils/Task'
import Form from '../utils/Form'
import './Pop.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, reset } from '../../features/auth/authSlice'
import { NotificationManager } from 'react-notifications'

import { resetT } from '../../features/tasks/taskSlice'

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false)
  const [count, setCount] = useState(1)

  //jatin;s code
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    navigate('/')
    dispatch(logout())
    dispatch(reset())
    dispatch(resetT())
  }
  useEffect(() => {
    if (!user) navigate('/')
  }, [user, navigate])

  const onClick = (e) => {
    if (user.isAdmin) {
      dispatch(resetT())
      navigate(`/${user._id}/admin`)
    } else {
      navigate(`/${user._id}`)
    }
  }

  const name = user && user.isAdmin ? 'Admin' : 'User'
  const temp = name === 'Admin' ? 'Add Employee' : 'Add Task'
  //jatin;s code ends here

  //
  return (
    <div>
      <nav className='navbar navbar-light bg-dark justify-content-between px-4'>
        {user ? (
          <>
            <button
              className='btn bg-white'
              onClick={() => {
                setCount(count + 1)
                if (count % 2 === 1) {
                  setModalOpen(true)
                } else {
                  setModalOpen(false)
                }
              }}
            >
              {temp}
            </button>
            <div>
              <button
                className='btn bg-white my-2 my-sm-0 mx-2'
                type='submit'
                onClick={onClick}
              >
                {user.name}
              </button>
              <button
                className='btn bg-white my-2 my-sm-0'
                type='submit'
                onClick={() => {
                  onLogout()
                  NotificationManager.success('', 'Logout Successful', 2000)
                }}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className='bg-light btn'>Employee Tracker</div>
        )}
      </nav>
      {modalOpen && temp === 'Add Employee' && (
        <div className='modalBackground'>
          <div className='modalContainer'>
            <div
              className='body'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {modalOpen && <Form setOpenModal={setModalOpen} />}
            </div>
          </div>
        </div>
      )}
      {modalOpen && temp === 'Add Task' && (
        <div className='modalBackground'>
          <div className='modalContainer'>
            <div
              className='body'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {modalOpen && <Task setOpenModal={setModalOpen} />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
