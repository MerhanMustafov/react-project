import './Components/Css/Global.css'
import { Header } from './Components/Header/Header'
import { Main } from './Components/Main/Main.js'
import {useState} from 'react'

function App() {
    const [userStatus, setUserStatus] = useState(localStorage.getItem('userId'))
  return (
    <div className="App">
      <Header userStatus={userStatus}/>
      <Main setUserStatus={setUserStatus}/>
    </div>
  )
};

export default App
