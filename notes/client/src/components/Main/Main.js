// import { Routes, Route } from 'react-router-dom'
// import { useEffect, useState } from 'react'

// import { Login } from './User/Login'
// import { Logout } from './User/Logout'
// import { Register } from './User/Register.js'

// import { Dashboard } from './Dashboard/Dashboard'
// import { UserProfile } from './Profile/UserProfile'
// import { Home } from './Home/Home'
// import { NotFound } from './NotFound'

// import { Logged, Guest } from '../Guards/Guard'
// import { getUserById } from '../../Api/userService'

// function Main({ userStatus, setUserStatus }) {
//   const isUser = userStatus

//   const username = localStorage.getItem('username')
//   const userid = localStorage.getItem('userId')

//   return (
//     <main className="mainHome">
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route element={<Logged  isUser={isUser}/>}>
//           <Route
//             path="/dashboard"
//             element={<Dashboard setUserStatus={setUserStatus} />}
//           />
//           <Route
//             path={`/profile/:username/:userid`}
//             element={<UserProfile setUserStatus={setUserStatus} />}
//           />
//           <Route
//             path="/logout"
//             element={<Logout setUserStatus={setUserStatus} />}
//           ></Route>
//           <Route path="*" element={<NotFound />} />
//         </Route>

//         <Route element={<Guest isUser={isUser} setUserStatus={setUserStatus}/>}>
//           <Route
//             path="/login"
//             element={<Login setUserStatus={setUserStatus} />}
//           ></Route>
//           <Route
//             path="/register"
//             element={<Register setUserStatus={setUserStatus} />}
//           />
//           <Route path="*" element={<NotFound />} />
//         </Route>

//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </main>
//   )
// }

// export { Main }
