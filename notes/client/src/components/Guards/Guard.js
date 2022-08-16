import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getUserById, getUserByName } from '../../Api/userService'
import { render } from '@testing-library/react'

function Logged(props) {
    const navigate = useNavigate()
    // function x(){
    //     navigate('/logout')
    // }

    console.log(localStorage.getItem('userId') === props.userStatus)
  return (
    <>
      {localStorage.getItem('userId') === props.userStatus ? (
        <Outlet />
      ) : (
        // x()
        <Navigate to="/login"/>
      )}
    </>
  )
}
function Guest(props) {
  return (
    <>
      {props.userStatus == '' ||
      localStorage.getItem('userId') == null ||
      localStorage.getItem('userId') !== props.userStatus ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      )}
    </>
  )
}

export { Logged, Guest }
