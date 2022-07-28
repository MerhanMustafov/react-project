import {Routes, Route} from 'react-router-dom';
import {Login} from './Login'
import {Register} from '../Main/Register.js';
import {Create} from '../Main/Create';
import {MyNotes} from '../Main/MyNotes';
import {Home} from '../Main/Home';
import {NotFound} from '../Main/NotFound';
      


function Main() {
    return <main>
         <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/myNotes" element={<MyNotes />}/>
            <Route path="/create" element={<Create />}/>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    </main>
}

export {Main}