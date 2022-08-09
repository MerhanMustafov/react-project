import { Nav } from './Nav/Nav.js'
function Header({userStatus,  setUserStatus}) {
    
  return (
    <header>
      <Nav userStatus={userStatus} setUserStatus={setUserStatus} />
    </header>
  )
}

export { Header }
