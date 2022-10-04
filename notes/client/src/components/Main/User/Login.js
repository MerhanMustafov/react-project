import * as api from '../../../Api/userApi'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ setIsAuth }) {
  const navigate = useNavigate()
  let errKey = 0
  const [errors, setErrors] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const filled = username.length >= 3 && password.length >= 5

  useEffect(() => {
    localStorage.clear()
  }, [localStorage.getItem('accessToken')])

  async function loginUser(e) {
    e.preventDefault()
    if (errors.length === 0) {
      const userData = generateUserData({ username, password })
      try {
        const response = await api.login(userData)
        if (response.error) {
          setErrors(response.error)
        }

        setLocalStorage(response)
        setIsAuth(true)
        navigate('/')
      } catch (err) {
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
        <div className="users show">
        <div className="userInfo">You can log in with one of the following users:</div>
            <div className="user">david - 123456</div>
            <div className="user">jhon - 123456</div>
            <div className="user">ruth - 123456</div>
            <div className="user">lily - 123456</div>
        </div>
        {errors.length > 0 ? (
          <div className="errors">
            {errors.map((e) => (
              <p key={++errKey}>{e}</p>
            ))}
          </div>
        ) : null}
        <div className="l-box">
          <label htmlFor="username" className="l-input-l">
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

        <button
          type="submit"
          className="login-btn"
          onClick={() => setErrors([])}
          disabled={true ? !filled : false}
        >
          Log in
        </button>
      
      </form>
    </div>
  )
}
export { Login }

function checkboxHandler(e) {
  if (e.target.checked) {
    e.target.form.classList.add('show-l-form')
    e.target.form.classList.remove('hide-l-form')
  } else {
    e.target.form.classList.add('hide-l-form')
    e.target.form.classList.remove('show-l-form')
  }
}

function setLocalStorage(data) {
  const img = setImage(data)
  localStorage.setItem('img', img)
  localStorage.setItem('userId', data.userId)
  localStorage.setItem('username', data.username)

  localStorage.setItem('accessToken', data.accessToken)
  localStorage.setItem('gender', data.gender)
}
function setImage(data) {
  if (data.cld_profile_img_url) {
    return data.cld_profile_img_url
  } else if (data.profile_img_web_link) {
    return data.profile_img_web_link
  } else {
    if (data.gender == 'male') {
      return data.default_image_male
    } else if (data.gender == 'female') {
      return data.default_image_female
    }
  }
}

function generateUserData(inputs) {
  return {
    username: inputs.username.trim(),
    password: inputs.password.trim(),
  }
}
