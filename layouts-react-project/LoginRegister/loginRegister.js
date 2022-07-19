const objEls = {
  main: document.querySelector('main'),

  loginForm: document.querySelector('.login-form'),
  signupForm: document.querySelector('.signup-form'),

  loginBtnExtend: document.querySelector('.login_btn_extend'),
  signupBtnExtend: document.querySelector('.signup_btn_extend'),
}

console.log('LOGIN', objEls.loginBtnExtend)
console.log('SIGNUP', objEls.signupBtnExtend)

objEls.loginBtnExtend.addEventListener('click', (e) => {
  const checked = e.target.checked
  console.log(checked)
  if (checked) {
    objEls.loginForm.style.height = '450px'
    objEls.signupForm.style.height = '25px'
    objEls.signupBtnExtend.checked = false
  } else {
    objEls.loginForm.style.height = '25px'
  }
})
objEls.signupBtnExtend.addEventListener('click', (e) => {
  const checked = e.target.checked
  console.log(checked)
  if (checked) {
    objEls.signupForm.style.height = '450px'
    objEls.loginForm.style.height = '25px'
    objEls.loginBtnExtend.checked = false
  } else {
    objEls.signupForm.style.height = '25px'
  }
})
