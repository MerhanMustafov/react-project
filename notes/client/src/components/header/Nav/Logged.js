import { Link, useNavigate } from 'react-router-dom'
import {getUserById} from '../../../Api/userService'

function Logged({ userStatus, setUserStatus }) {
    const navigate = useNavigate()
  const userImg = localStorage.getItem('img')
  const username = localStorage.getItem('username')
  const userid = localStorage.getItem('userId')

  async function chechUserStatus() {
    
    const localStorageUserId = localStorage.getItem('userId')
    const user = await getUserById(localStorageUserId)
    if (!user) {
      navigate('/logout')
    } else if (!localStorageUserId) {
      navigate('/logout')
    }
  }

  return (
    <nav>
      <div className="main-nav-area">
        <div className="logo-area">NoTes</div>
        <ul>
          <li onClick={(e) => chechUserStatus()}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={(e) => chechUserStatus()}>
            <Link to="/dashboard" >Dashboard</Link>
          </li>
        </ul>
      </div>
      <div className="profile-area">
        <div className="profile-img-Wrapper">
          <img src={userImg} alt="" className="profileImg" />
        </div>
        <div className="profile-name-wrapper">
          <div className="profile-name" onClick={(e) => chechUserStatus()}>
            <Link  to={`/profile/${username}/${userid}`}>{username}</Link>
          </div>
          <i className="fa-solid fa-chevron-down dropDownProfileIcon"></i>
          {/* <div className="profileOptions"></div> */}
        </div>
      </div>
      <div className="user-nav-area">
        <ul>
          <li onClick={(e) => chechUserStatus()}>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export { Logged }
