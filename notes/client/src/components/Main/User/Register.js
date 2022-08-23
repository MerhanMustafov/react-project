import * as api from '../../../Api/userApi'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Register({setIsAuth}) {
    
    const navigate = useNavigate()
  let errKey = 0
  const [errors, setErrors] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [img, setImg] = useState('')
  const [gender, setGender] = useState(null)

  async function registerUser(e) {
    e.preventDefault()
    if (errors.length === 0) {
      const userData = generateUserData({username, password, gender, uploadedImg: img})
      try{
        const response = await api.register(userData)
        
        setLocalStorage(response)
        setIsAuth(true)
        navigate('/')

      }catch(err){
        const error = [...err.message]
        setErrors(err.message)
      }
    }
  }
  return (
    <div className="register-form-wrapper">
      <form className="registerForm" onSubmit={(e) => registerUser(e)}>
        <div className="r-box">
          <input
            type="checkbox"
            id="show-hide-btn"
            name="show-hide-btn"
            onClick={(e) => checkboxHandler(e)}
          />
          <label htmlFor="show-hide-btn" className="show-hide-btn">
            Sign up <i className="fa-solid fa-chevron-down"></i>
          </label>
        </div>
        {errors.length > 0 ? (
          <div className="errors">
            {errors.map((e) => (
              <p key={++errKey}>{e}</p>
            ))}
          </div>
        ) : null}
        <div className="r-box">
          <label htmlFor="username" className="r-input-l" defaultValue="sth">
            Username*
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
        <div className="r-box">
          <label htmlFor="password" className="r-input-l">
            Password*
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
        <div className="r-box">
          <label htmlFor="rep-password" className="r-input-l">
            Reapeat*
          </label>
          <input
            type="password"
            id="rep-password"
            className="r-input"
            name="rep-password"
            placeholder="Repeat Password"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <div className="r-box">
          <label htmlFor="registerImgInput" className="r-input-l registerImgLabel" onChange={(e) => uploadImg(e, setImg)}>
            Upload Profile Image
          </label>
          <input
            type="file"
            id="registerImgInput"
            className="r-input"
            name="img"
            placeholder="Image URL"
            onChange={(e) => uploadImg(e, setImg)}
          />
        </div>
        <div className="gender-wapper">
          <div className="F-wrapper">
            <label htmlFor="F" className="gender-label">
              Female
            </label>
            <input
              type="radio"
              id="F"
              name="gender"
              value="female"
              onChange={(e) => setGender(e.target.value)}
            />
          </div>

          <div className="M-wrapper">
            <label htmlFor="M" className="gender-label">
              Male
            </label>
            <input
              type="radio"
              id="M"
              name="gender"
              value="male"
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="register-btn"
          onClick={() =>
            checkforErrors(setErrors, {
              username,
              password,
              repeatPassword,
              gender,
              img
            })
          }
        >
          Sign up
        </button>
      </form>
    </div>
  )
}
export { Register }

function uploadImg(e, setImg){
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
        const url = reader.result
        setImg(url)
    })
    reader.readAsDataURL(e.target.files[0])
  }

function checkforErrors(setErrors, inputs) {
  let err = []
  const allFilled =
    inputs.password.length > 0 &&
    inputs.repeatPassword.length > 0 &&
    inputs.username.length > 0 &&
    inputs.img.length > 0 &&
    inputs.gender !== null

  const passMatch = inputs.password === inputs.repeatPassword
  const passLength = inputs.password.length >= 5
  const userLength = inputs.username.length >= 3
  const imgPresent = inputs.img.length > 0
  const genderchecked = inputs.gender !== null
  if (!allFilled) {
    err.push('all required fields should be filled!')
  }
  if (!passMatch) {
    err.push('passwords do not match!')
  }
  if (!userLength) {
    err.push('username should be at least 3 characters long!')
  }
  if (!passLength) {
    err.push('password should be at least 5 characters long!')
  }
  if (!imgPresent) {
    err.push('upload an image!')
  }
  if (!genderchecked) {
    err.push('should choose gender!')
  } else {
    if (allFilled && passMatch && userLength && genderchecked && passLength) {
      err = []
    }
  }
  setErrors(err)
}

function checkboxHandler(e) {
  if (e.target.checked) {
    e.target.form.classList.add('show-r-form')
    e.target.form.classList.remove('hide-r-form')
  } else {
    e.target.form.classList.add('hide-r-form')
    e.target.form.classList.remove('show-r-form')
  }
}


function setLocalStorage(data){
    localStorage.setItem('userId', data.userId)
    localStorage.setItem('username', data.username)
    if(data.cld_profile_img_url.length > 0){
        localStorage.setItem('img', data.cld_profile_img_url)
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
        password: inputs.password.trim(),
        uploadedImg: inputs.uploadedImg.trim(),
        gender: inputs.gender.trim(),
      }
}