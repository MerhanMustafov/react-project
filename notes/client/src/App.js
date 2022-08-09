import './components/Css/Global.css'
import { Header } from './components/header/Header.js'
import { Main } from './components/Main/Main.js'
import {useState, useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import {getUserById} from './Api/userService'
 
function App() {

    const [userStatus, setUserStatus] = useState(null)
    const navigate = useNavigate()
  
    useEffect(() => {
        async function getUser(){
            const localStorageUserId = localStorage.getItem('userId')
            const user = await getUserById(localStorageUserId)
            if(localStorageUserId){
                if(user){
                    setUserStatus(localStorage.getItem('userId'))
                }else{
                    navigate('/login')
                }
            }else{
                navigate('/login')
            }
        } 
        getUser()
    }, [])


  return (
    <div className="App">
      <Header userStatus={userStatus} setUserStatus={setUserStatus}/>
        <Main userStatus={userStatus} setUserStatus={setUserStatus}/>
    </div>
  )
}

export default App
