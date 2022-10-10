import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Admin from './components/admin/Admin'
import Login from './components/Login'
import User from './components/user/User'
import Navbar from './components/admin/Navbar'
import Footer from './components/Footer'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

function App() {
  return (
    <>
      <Router>
      <NotificationContainer/>
          <Navbar />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/:id/admin' element={<Admin />} exact />
            <Route path='/:id' element={<User />} exact />
          </Routes>
          <Footer />
      </Router>
    </>
  )
}

export default App
