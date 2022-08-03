import { Link } from 'react-router-dom'

// import {LoginViwe} from '../Main/Login.js'

function Nav({userStatus}) {
    // const [userStatus, setUserStatus] = useState(null)
//   const loged = localStorage.getItem('userId')
    const isUser = userStatus?.length > 0
    console.log(userStatus)
  return (
    <nav>
      <div className="main-nav-area">
        <div className="logo-area">NoTes</div>
        <ul>
          <li>
            <Link to="/" >Home</Link>
          </li>
          {isUser ? <li>
            <Link  to="/dashboard">Dashboard</Link>
          </li> : <li>
            <Link  to="/myNotes">My NoTes</Link>
          </li>}
          {!isUser ? null : <li>
            <Link to="/create">
              Create <i className="fa-solid fa-plus"></i>
            </Link>
          </li>}
          
        </ul>
      </div>
      {isUser ? 
        <div className="user-nav-area">
          <ul>
            <li>
              <Link  to="/logout">Logout</Link>
            </li>
          </ul>
        </div>  
        : 
        <div className="user-nav-area">
          <ul>
            <li>
              <Link  to="/login">Log in</Link>
            </li>
            <li>
              <Link  to="/register">Sign up</Link>
            </li>
          </ul>
        </div>}
        
        
    </nav>
  )
}

export { Nav }

