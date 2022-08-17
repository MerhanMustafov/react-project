import { Link } from 'react-router-dom'

function LoggedNav() {
  const userImg = localStorage.getItem('img')
  const username = localStorage.getItem('username')
  const userid = localStorage.getItem('userId')


  return (
    <nav>
      <div className="main-nav-area">
        <div className="logo-area">NoTes</div>
        <ul>
          <li >
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>
      <div className="profile-area">
        <div className="profile-img-Wrapper">
          <img src={userImg} alt="" className="profileImg" />
        </div>
        <div className="profile-name-wrapper">
          <div className="profile-name" >
            <Link to={`/profile/${username}/${userid}`}>{username}</Link>
          </div>
          <i className="fa-solid fa-chevron-down dropDownProfileIcon"></i>
        </div>
      </div>
      <div className="user-nav-area">
        <ul>
          <li >
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export { LoggedNav }
