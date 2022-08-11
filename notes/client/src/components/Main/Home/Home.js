import { useState } from 'react'
import { getUserByName } from '../../../Api/userService'
import {DropDownUser} from './DropDownUser'
function Home() {
//   const [name, setName] = useState('')
  const [users, setUsers] = useState([])

  async function requestHandler(e, to) {
    const name = e.target.value
    if(!name){
        setUsers([])
    }else{
      const users = await getUserByName(name)
      if (users.length > 0) {
        setUsers(users)
      }

    }
  }
  return (
    <form className="searchFriendsForm">
      <div className="searchFriendBoxWrapper">
        <label htmlFor="searchFriendBoxInput" className="searchFriendBoxLabel">
          Find a Friend
        </label>
        <div className="s-b-w">
          {/* <i */}
            {/* // className="fa-solid fa-magnifying-glass searchUser" */}
            {/* // onClick={(e) => requestHandler(document.getElementById('searchFriendBoxInput'))} */}
          {/* ></i> */}
          <div className="inputFrWrapper">
            <input
              type="text"
              id="searchFriendBoxInput"
              placeholder="Type name"
              autoComplete='off'
              onChange={(e) => requestHandler(e)}
            />
            <div className="optionsW" >
              {users.length > 0
                ? users.map((u) => u._id === localStorage.getItem('userId') ? null : <DropDownUser key={u._id} {...u}/>)
                : null}
              {/* <p>Hasdjasd</p> */}
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export { Home }
