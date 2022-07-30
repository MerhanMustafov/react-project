import {Routes, Route} from 'react-router-dom';
import {Login} from './Login'
import {Logout} from './Logout'
import {Register} from '../Main/Register.js';
import {Create} from '../Main/Create';
import {MyNotes} from '../Main/MyNotes';
import {Home} from '../Main/Home';
import {NotFound} from '../Main/NotFound';
      


function Main({setUserStatus}) {
    return <main>
         <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/myNotes" element={<MyNotes />}/>
            <Route path="/create" element={<Create />}/>
            <Route path="/login" element={<Login setUserStatus={setUserStatus}/>}></Route>
            <Route path="/register" element={<Register  setUserStatus={setUserStatus}/>}/>
            <Route path="/logout" element={<Logout setUserStatus={setUserStatus}/>}></Route>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    </main>
}

export {Main}