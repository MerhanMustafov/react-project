import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './components/Css/Global.css'

import { getUserById } from './Api/userService'

import { GuestNav } from './components/header/Nav/Guest'
import { LoggedNav } from './components/header/Nav/Logged'

// import { Main } from './components/Main/Main.js'

import { Login } from './components/Main/User/Login'
import { Logout } from './components/Main/User/Logout'
import { Register } from './components/Main/User/Register'

import { Dashboard } from './components/Main/Dashboard/Dashboard'
import { UserProfile } from './components/Main/Profile/UserProfile'
import { Home } from './components/Main/Home/Home'
import { NotFound } from './components/Main/NotFound'
import { Logged, Guest } from './components/Guards/Guard'

import { AppSpinner } from './components/Main/Spinner/Spinner'

function App() {
  const [userStatus, setUserStatus] = useState(null)
  const navigate = useNavigate()
    console.log(userStatus)
  useEffect(() => {
    async function getUser() {
    const userid = localStorage.getItem('userId')
    if(userid){
      const user = await (await getUserById(userid)).json()
        if(user.userId === userid){
            setUserStatus(user.userId)

        }else{
            setUserStatus('')
            // navigate('/logout')
        }
    }else{
        setUserStatus('')
            // navigate('/logout')
    }
    //   setUserStatus(user.userId)
    }
      getUser()
  }, [])

  return (
    <div className="App">
      {userStatus === null ? (
        <AppSpinner />
      ) : (
        <>
          <header>
            {localStorage.getItem('userId') === userStatus? (
              <LoggedNav
                userStatus={userStatus}
                setUserStatus={setUserStatus}
              />
            ) : (
              <GuestNav
                userStatus={userStatus}
                setUserStatus={setUserStatus}
              />
            )}
          </header>
          <main className="mainHome">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                element={
                  <Logged
                    userStatus={userStatus}
                    setUserStatus={setUserStatus}
                  />
                }
              >
                <Route
                  path="/dashboard"
                  element={<Dashboard setUserStatus={setUserStatus} />}
                />
                <Route
                  path={`/profile/:username/:userid`}
                  element={<UserProfile setUserStatus={setUserStatus} />}
                />
                <Route
                  path="/logout"
                  element={<Logout setUserStatus={setUserStatus} />}
                ></Route>
              </Route>

              <Route
                element={
                  <Guest
                    userStatus={userStatus}
                    setUserStatus={setUserStatus}
                  />
                }
              >
                <Route
                  path="/login"
                  element={<Login setUserStatus={setUserStatus} />}
                ></Route>
                <Route
                  path="/register"
                  element={<Register setUserStatus={setUserStatus} />}
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
