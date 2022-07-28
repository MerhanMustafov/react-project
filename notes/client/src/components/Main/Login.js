function Login() {
  function registerUser(e) {
    e.preventDefault()
    console.log(e.target)
    const data = new FormData(e.target)
    console.log(data)
    console.log(data.entries())
    console.log(data.get('username'))
  }

  return (
    <div className="login-form-wrapper">
      <form className="loginForm" onSubmit={(e) => registerUser(e)}>
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
          />
        </div>
        
        <button type="submit" className="login-btn" >
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
