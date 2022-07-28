// import * as api from '../../Api/userService'
import {useState} from 'react'
function Register() {
    const [errors, setErrors] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [img, setImg] = useState('')
    const [gender, setGender] = useState(null)
    let allFilled = username.length >= 3 && password.length >= 5 && repeatPassword !== '' && gender !== null
    console.log(allFilled)
  async function registerUser(e) {
    e.preventDefault()
    const formD = new FormData(e.target)
    if(password !== repeatPassword){
        setErrors('Passwords do not match!')
    }
    const userData = {
        username: username,
        password: password,
        img: img,
        gender: gender,
    }
    console.log(userData)
    // await api.register(userData)
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
        <div className="r-box">
          <label htmlFor="username" className="r-input-l" defaultValue="sth">
            Username*
          </label>
          <input
            type="text"
            id="username"
            className="r-input"
            name="username"
            placeholder="Username (min length: 3)"
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
            placeholder="Password (min length: 5)"
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
          <label htmlFor="img" className="r-input-l">
            Profile Image
          </label>
          <input
            type="text"
            id="img"
            className="r-input"
            name="img"
            placeholder="Image URL"
            onChange={(e) => setImg(e.target.value)}
          />
        </div>
        <div className="gender-wapper">
          <div className="F-wrapper">
            <label htmlFor="F" className="gender-label">
              Female
            </label>
            <input type="radio" id="F" name="gender"  value="female" onChange={(e) => setGender(e.target.value)}/>
          </div>
            

          <div className="M-wrapper">
            <label htmlFor="M" className="gender-label">
              Male
            </label>
            <input type="radio" id="M" name="gender" value="male" onChange={(e) => setGender(e.target.value)}/>
          </div>
        </div>
        <button type="submit" className="register-btn" disabled={allFilled ? false : true} >
          Sign up
        </button>
      </form>
    </div>
  )
}
export { Register }

function checkboxHandler(e) {
  if (e.target.checked) {
    e.target.form.classList.add('show-r-form')
    e.target.form.classList.remove('hide-r-form')
  } else {
    e.target.form.classList.add('hide-r-form')
    e.target.form.classList.remove('show-r-form')
  }
}
