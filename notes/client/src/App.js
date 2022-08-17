import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './components/Css/Global.css'

import { verifyUser } from './Api/userService'

// NAVIGATION
import { GuestNav } from './components/Nav/Guest'
import { LoggedNav } from './components/Nav/Logged'

// MAIN
import { Login } from './components/Main/User/Login'
import { Logout } from './components/Main/User/Logout'
import { Register } from './components/Main/User/Register'

import { Dashboard } from './components/Main/Dashboard/Dashboard'
import { UserProfile } from './components/Main/Profile/UserProfile'
import { Home } from './components/Main/Home/Home'
import { NotFound } from './components/Main/NotFound'
import { LoggedGuard, GuestGuard } from './components/Guards/Guard'

import { AppSpinner } from './components/Main/Spinner/Spinner'

function App() {
  const [isAuth, setIsAuth] = useState(null)

  useEffect(() => {
    async function verify() {
      const accesstoken = localStorage.getItem('accessToken')
      if (accesstoken) {
        try {
          const response = await verifyUser(accesstoken)
          setIsAuth(true)
        } catch (err) {
          setIsAuth(false)
        }
      } else {
        setIsAuth(false)
      }
    }
    verify()
  }, [])

  return (
    <div className="App">
      {isAuth === null ? (
        <AppSpinner />
      ) : (
        <>
          <header>{isAuth ? <LoggedNav /> : <GuestNav />}</header>
          <main className="mainHome">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                element={<LoggedGuard isAuth={isAuth} setIsAuth={setIsAuth} />}
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path={`/profile/:username/:userid`}
                  element={<UserProfile />}
                />
                <Route
                  path="/logout"
                  element={<Logout setIsAuth={setIsAuth} />}
                ></Route>
              </Route>

              <Route
                element={<GuestGuard isAuth={isAuth} setIsAuth={setIsAuth} />}
              >
                <Route
                  path="/login"
                  element={<Login setIsAuth={setIsAuth} />}
                ></Route>
                <Route
                  path="/register"
                  element={<Register setIsAuth={setIsAuth} />}
                />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </>
      )}
    </div>
  )
}

export default App
