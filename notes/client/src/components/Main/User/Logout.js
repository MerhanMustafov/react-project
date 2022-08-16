import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
function Logout({setUserStatus}) {
  const navigate = useNavigate()
  useEffect(() => {
    localStorage.clear()
    setUserStatus('')
    navigate('/login')
  }, [])
}

export { Logout }
