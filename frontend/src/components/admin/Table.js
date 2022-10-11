import { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../../features/auth/authSlice'
import { resetT } from '../../features/tasks/taskSlice'

const columns = [
  { field: 'id', headerName: 'id', width: 100 },
  //   { field: 'firstName', headerName: 'First name', width: 130 },
  //   { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'employeeName',
    headerName: 'Employee name',
    // description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    width: 200,
  },
  {
    field: 'email',
    headerName: 'Employee email',
    // description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    width: 200,
  },
  {
    field: 'department',
    headerName: 'Department ',
    // description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    width: 160,
  },
  {
    field: 'contactNumber',
    headerName: 'Contact Number',
    // description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    width: 180,
  },
  {
    field: 'joiningDate',
    headerName: 'Joining Date',
    width: 180,
  },
  {
    field: '_id',
    headerName: '_id',
    width: 180,
  },
]

export default function DataTable() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { users } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) dispatch(getUsers(user))
    dispatch(resetT())
  }, [user, dispatch])

  let rows = []
  for (let i = 0; i < users.length; i++) {
    const u = {
      id: i + 1,
      employeeName: users[i].name,
      email: users[i].email,
      department: users[i].department,
      contactNumber: users[i].contactNumber,
      joiningDate: users[i].joiningDate,
      _id: users[i]._id,
    }
    rows.push(u)
  }
  const onClick = (e) => {
    navigate(`/${e.row._id}`)
  }
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            height: '80vh',
            width: '90%',
            padding: '20px',
            margin: '20px 0',
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            onRowClick={onClick}
          />
        </div>
      </div>
    </>
  )
}
