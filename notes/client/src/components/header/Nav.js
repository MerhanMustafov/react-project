import { Link } from 'react-router-dom'

// import {LoginViwe} from '../Main/Login.js'

function Nav({ userStatus }) {
  const isUser = userStatus?.length > 0

  
  return (
    <nav>
      <div className="main-nav-area">
        <div className="logo-area">NoTes</div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isUser ? (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          ) : null}
        </ul>
      </div>
      {isUser ? (
        <div className="user-nav-area">
          <ul>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="user-nav-area">
          <ul>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/register">Sign up</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export { Nav }
