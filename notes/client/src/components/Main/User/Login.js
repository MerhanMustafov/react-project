import * as api from '../../../Api/userService'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({setUserStatus}) {
    const navigate = useNavigate()
    let errKey = 0
  const [errors, setErrors] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

    const filled = username.length >= 3 && password.length >= 5

  async function loginUser(e) {
    e.preventDefault()
    if (errors.length === 0) {
      const userData = generateUserData({username, password})
      try{
        const response = await api.login(userData)
        if(response.error){
            setErrors(response.error)
        }

        setLocalStorage(response)
        setUserStatus( response.userId)
        navigate('/')

      }catch(err){
        const error = [err.message]
        setErrors(error)
      }
    }
  }

  return (
    <div className="login-form-wrapper">
      <form className="loginForm" onSubmit={(e) => loginUser(e)}>
        <div className="l-box">
          <input
            type="checkbox"
            id="show-hide-btn"
            name="show-hide-btn"
            onClick={(e) => checkboxHandler(e)}
          />
          <label htmlFor="show-hide-btn" className="show-hide-btn">
            Log in <i className="fa-solid fa-chevron-down"></i>
          </label>
        </div>
         {errors.length > 0 ? (
          <div className="errors">
            {errors.map((e) => (
              <p key={++errKey}>{e}</p>
            ))}
          </div>
        ) : null}
        <div className="l-box">
          <label htmlFor="username" className="l-input-l" >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="r-input"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="l-box">
          <label htmlFor="password" className="l-input-l">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="r-input"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button type="submit" className="login-btn"  onClick={() => setErrors([])}  disabled={true ? !filled : false}>
          Log in
        </button>
      </form>
    </div>
  )
}
export { Login }


function checkforErrors(setErrors, inputs) {
  let err = []
//   const allFilled =
    // inputs.username.length > 0 &&
    // inputs.password.length > 0 

//   const passLength = inputs.password.length >= 5
//   const userLength = inputs.username.length >= 3
//   const genderchecked = inputs.gender !== null
//   if (!allFilled) {
//     err.push('all required fields should be filled!')
//   }
//   if (!passMatch) {
//     err.push('passwords do not match!')
//   }
//   if (!userLength) {
//     err.push('username should be at least 3 characters long!')
//   }
//   if (!passLength) {
//     err.push('password should be at least 5 characters long!')
//   }
//   if (!genderchecked) {
//     err.push('should choose gender!')
//   } else {
//     if (allFilled && passMatch && userLength && genderchecked && passLength) {
//       err = []
//     }
//   }
  setErrors(err)
}

function checkboxHandler(e) {
  if (e.target.checked) {
    e.target.form.classList.add('show-l-form')
    e.target.form.classList.remove('hide-l-form')
  } else {
    e.target.form.classList.add('hide-l-form')
    e.target.form.classList.remove('show-l-form')
  }
}

function setLocalStorage(data){
    localStorage.setItem('userId', data.userId)
    localStorage.setItem('username', data.username)
    if(data.profile_img_url.length > 0){
        localStorage.setItem('img', data.profile_img_url)
    }else{
        const maleImg = require('../../../profileImages/male.jpg')
        const femaleImg = require('../../../profileImages/female.jpg')
        if(data.gender === 'male'){
            localStorage.setItem('img', maleImg)
        }else{
            localStorage.setItem('img', femaleImg)
        }
    }
    
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('gender', data.gender)
}

function generateUserData(inputs){
    return  {
        username: inputs.username.trim(),
        password: inputs.password.trim()
      }
}