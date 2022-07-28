function Register() {
  function registerUser(e) {
    e.preventDefault()
    console.log(e.target)
    const data = new FormData(e.target)
    console.log(data)
    console.log(data.entries())
    console.log(data.get('username'))
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
            Username{' '}
          </label>
          <input
            type="text"
            id="username"
            className="r-input"
            name="username"
            placeholder="Username"
          />
        </div>
        <div className="r-box">
          <label htmlFor="password" className="r-input-l">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="r-input"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="r-box">
          <label htmlFor="rep-password" className="r-input-l">
            Reapeat
          </label>
          <input
            type="password"
            id="rep-password"
            className="r-input"
            name="rep-password"
            placeholder="Repeat Password"
          />
        </div>
        <div className="r-box">
          <label htmlFor="img" className="r-input-l">
            Profile Image
          </label>
          <input
            type="password"
            id="img"
            className="r-input"
            name="img"
            placeholder="Image URL"
          />
        </div>
        <div className="gender-wapper">
          <div className="F-wrapper">
            <label htmlFor="F" className="gender-label">
              Female
            </label>
            <input type="radio" id="F" name="gender" />
          </div>
          <div className="M-wrapper">
            <label htmlFor="M" className="gender-label">
              Male
            </label>
            <input type="radio" id="M" name="gender" />
          </div>
        </div>
        <button type="submit" className="register-btn" >
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
