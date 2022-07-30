import { Nav } from './Nav.js'

function Header({userStatus}) {
  return (
    <header>
      <Nav userStatus={userStatus}/>
    </header>
  )
}

export { Header }
