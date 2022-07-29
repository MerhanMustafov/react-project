const route = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenSecret = 'asdf123 321fdsa'
const { ...userService } = require('../services/userService')
route.post('/register', async (req, res) => {
//   const userData = req.body
  try {
    const existing = await userService.getUserByName(req.body.username.trim().toLowerCase())
    if (existing) {
        throw new Error('Username already exists!')
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const userData = {
        username: req.body.username.trim().toLowerCase(),
        hashedPassword: hashedPassword,
        img: req.body.img,
        gender: req.body.gender,
        userSections: [],
        userNotes: []
    }
    const createdUser = await userService.createUser(userData)
    const token = generateToken(createdUser)
    res.status(200).json(token)
  }catch(err){
    const errors = {error: [err.message]}
    res.status(409).json(errors)
  }
})


function generateToken(userData){
    return {
    userId: userData._id,
    username: userData.username,
    accessToken: jwt.sign(
      { hashedPassword: userData.hashedPassword },
      tokenSecret,
    ),
  }
}
module.exports = route
