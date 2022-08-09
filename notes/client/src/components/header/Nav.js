import { Link } from 'react-router-dom'
import {useState} from 'react'

// import {LoginViwe} from '../Main/Login.js'
import {getUserById} from '../../Api/userService'

function Nav({ userStatus }) {
  const isUser = userStatus?.length > 0
//   const [user, setUser] = useState(null)
    const userImg = localStorage.getItem('img')
    const username = localStorage.getItem('username')
    const userid = localStorage.getItem('userId')

    // if(user === null){
    //   getUserById(userid).then(res => res.json()).then(data => setUser(data))

    // }

    console.log(userImg, 'Nav')
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
        <>
        <div className="profile-area">
            <div className="profile-img-Wrapper">
                <img src={userImg} alt="" className="profileImg"/>
            </div>
            <div className="profile-name-wrapper">
                <div className="profile-name">
                    <Link to={`/profile/${username}/${userid}`}>{username}</Link>

                </div>
                <i className="fa-solid fa-chevron-down dropDownProfileIcon"></i>
                {/* <div className="profileOptions"></div> */}
            </div>
        </div>
        <div className="user-nav-area">
          <ul>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
        </>
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
