import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
function Logout({setIsAuth}) {
  const navigate = useNavigate()
  useEffect(() => {
    localStorage.clear()
    setIsAuth(false)
    navigate('/login')
  }, [])
}

export { Logout }
