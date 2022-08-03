import './Components/Css/Global.css'
import { Header } from './Components/Header/Header'
import { Main } from './Components/Main/Main.js'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {getUserById, logout} from './Api/userService'

function App() {
  const [userStatus, setUserStatus] = useState(localStorage.getItem('userId'))
    const navigate = useNavigate()
    useEffect(() => {
        async function checkForUser(){
            const userId = localStorage.getItem('userId')
            const user = await getUserById(userId)
            if(user == null){
                logout()
                setUserStatus(localStorage.getItem('userId'))
                navigate('/login')
            }
        }
        checkForUser()
    }, [])
  return (
    <div className="App">
      <Header userStatus={userStatus} />
      <Main setUserStatus={setUserStatus}  userStatus={userStatus}/>
    </div>
  )
}

export default App
