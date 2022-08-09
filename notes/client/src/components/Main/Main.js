import { Routes, Route } from 'react-router-dom'

import { Login } from './User/Login'
import { Logout } from './User/Logout'
import { Register } from './User/Register.js'

import { Dashboard } from './Dashboard/Dashboard'
import { UserProfile } from './Profile/UserProfile'
import { Home } from '../Main/Home'
import { NotFound } from '../Main/NotFound'

function Main({ userStatus, setUserStatus }) {
  const isUser = userStatus?.length > 0

  const username = localStorage.getItem('username')
    const userid = localStorage.getItem('userId')
    
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        {isUser ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path={`/profile/${username}/${userid}`} element={<UserProfile />} />
            <Route
              path="/logout"
              element={<Logout setUserStatus={setUserStatus} />}
            ></Route>
          </>
        ) : (
          <>
            <Route
              path="/login"
              element={<Login setUserStatus={setUserStatus} />}
            ></Route>
            <Route
              path="/register"
              element={<Register setUserStatus={setUserStatus} />}
            />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

export { Main }
