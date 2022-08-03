import { Routes, Route } from 'react-router-dom'
import { Login } from './Login'
import { Logout } from './Logout'
import { Register } from '../Main/Register.js'
import { Create } from '../Main/Create'
import { MyNotes } from '../Main/MyNotes'
import { Dashboard } from '../Main/Dashboard'
import { Home } from '../Main/Home'
import { NotFound } from '../Main/NotFound'

function Main({ userStatus, setUserStatus }) {
  const isUser = userStatus?.length > 0
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        {isUser ? (
          <>
            <Route path="/myNotes" element={<MyNotes />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<Create />} />
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
