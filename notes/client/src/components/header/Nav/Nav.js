import { Guest } from './Guest'
import { Logged } from './Logged'

function Nav({ userStatus, setUserStatus }) {
  const isUser = userStatus

  return <>{isUser ? <Logged /> : <Guest />}</>
}

export { Nav }
