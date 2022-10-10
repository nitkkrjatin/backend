import axios from 'axios'

const API_URL = '/api/users/'

//Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  return response.data
}

//Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

//Logout user
const logout = () => {
  localStorage.removeItem('user')
}

//Get users
const getUsers = async (user) => {
  // console.log(user.token)
  const config = {
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  }
  const response = await axios.get(API_URL, config)

  if (response.data) {
    localStorage.setItem('users', JSON.stringify(response.data))
  }
  return response.data
}
const authService = {
  login,
  logout,
  register,
  getUsers,
}

export default authService
