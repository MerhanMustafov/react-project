import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { verifyUser, getUserById } from '../../Api/userApi'
function LoggedGuard(props) {

  useEffect(() => {
    async function verify() {
      const accesstoken = localStorage.getItem('accessToken')
      const userid = localStorage.getItem('userId')
      if (accesstoken && userid) {
        Promise.all([verifyUser(accesstoken), getUserById(userid)])
          .then(([token, user]) => {
            props.setIsAuth(true)
          })
          .catch((err) => props.setIsAuth(false))
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
