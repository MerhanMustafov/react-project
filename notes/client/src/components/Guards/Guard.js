import { Navigate, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { verifyUser } from '../../Api/userService'
function LoggedGuard(props) {
   useEffect(() => {
    async function verify() {
      const accesstoken = localStorage.getItem('accessToken')
      if (accesstoken) {
        try {
          const response = await verifyUser(accesstoken)
          props.setIsAuth(true)
        } catch (err) {
          props.setIsAuth(false)
        }
      } else {
        props.setIsAuth(false)
      }
    }
    verify()
  })
  return <>{props.isAuth ? <Outlet /> : <Navigate to="/login" />}</>
}
function GuestGuard(props) {
  return <>{!props.isAuth ? <Outlet /> : <Navigate to="/" />}</>
}

export { LoggedGuard, GuestGuard }
