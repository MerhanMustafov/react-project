import * as userService from '../../Api/userService'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
function Logout({ setUserStatus }) {
  const navigate = useNavigate()
  userService.logout()
  useEffect(() => {
    setUserStatus(localStorage.getItem('userId'))
    navigate('/login')
  }, [])
}

export { Logout }
