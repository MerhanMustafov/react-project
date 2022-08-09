import { Link, useNavigate } from 'react-router-dom'

function Guest({ userStatus, setUserStatus }) {

  return (
    <nav>
      <div className="main-nav-area">
        <div className="logo-area">NoTes</div>
        <ul>
          <li><Link to="/ghome">Home</Link></li>
        </ul>
      </div>
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
    </nav>
  )
}

export {Guest}