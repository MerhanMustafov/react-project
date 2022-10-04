import * as api from '../../../Api/userApi'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Register({ setIsAuth }) {
  const navigate = useNavigate()
  let errKey = 0
  const [errors, setErrors] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [img, setImg] = useState(null)
  const [linkImg, setLinkImg] = useState(null)
  const [gender, setGender] = useState(null)


  async function registerUser(e) {
    e.preventDefault()
    if (errors.length === 0) {
      const userData = generateUserData({
        username,
        password,
        gender,
        uploadedImg: img,
        linkImg,
      })
      try {
        const response = await api.register(userData)

        document.querySelector('.registerImgLabel').value = ''
        document.getElementById('registerImgInput').value = ''
        document.getElementById('r-image-link-input').value = ''

        setLocalStorage(response)
        setIsAuth(true)
        navigate('/')
      } catch (err) {
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
         <div className="users show">
        <div className="userInfo">You can log in with one of the following users:</div>
            <div className="user">David - 123456</div>
            <div className="user">Jhon - 123456</div>
            <div className="user">Ruth - 123456</div>
            <div className="user">lily - 123456</div>
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
          <label htmlFor="r-image-link-input" className="profile-img-label">
            Profile image
          </label>
          <div className="r-imageWrapper">
            <input
              type="text"
              id="r-image-link-input"
              className="r-image-link-input"
              placeholder="Image URL"
              onChange={(e) => set(e, setImg, setLinkImg, 'link')}
            />
            <label
              htmlFor="registerImgInput"
              className="r-input-l registerImgLabel"
              onChange={(e) => set(e, setImg, setLinkImg, 'upload')}
            >
              <i className="fa-solid fa-upload r-upload-img-icon"></i>
            </label>
            <input
              type="file"
              id="registerImgInput"
              className="r-input"
              name="img"
            //   placeholder="Image URL"
              onChange={(e) => set(e, setImg, setLinkImg, 'upload')}
            />
          </div>
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
              img,
              linkImg
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

function set(e, setImg, setLinkImg, type) {
    const imageIcon = document.querySelector('.r-upload-img-icon')
  if (type === 'link') {
    const uploadImgLabel = document.querySelector('.registerImgLabel')
    const uploadImgInput = document.getElementById('registerImgInput')
    uploadImgLabel.value = ''
    uploadImgInput.value = ''
    setLinkImg(e.target.value)
    imageIcon.style.color = 'white'
    setImg(null)
    // id r-image-link-input
  } else if (type === 'upload') {
    const linkImgInput = document.getElementById('r-image-link-input')
    linkImgInput.value = ''
    uploadImg(e, setImg, setLinkImg)
    imageIcon.style.color = 'green'
    setLinkImg(null)
    // cl registerImgLabel
    // id registerImgInput
  }
}

function uploadImg(e, setImg, setLinkImg) {
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
    // inputs.img || inputs.linkImg &&
    inputs.gender !== null

  const passMatch = inputs.password === inputs.repeatPassword
  const passLength = inputs.password.length >= 5
  const userLength = inputs.username.length >= 3
//   const imgPresent = inputs.img || inputs.linkImg
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
//   if (!imgPresent) {
//     err.push('upload an image!')
//   }
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
    uploadedImg: inputs.uploadedImg,
    linkImg: inputs.linkImg,
    gender: inputs.gender.trim(),
  }
}
