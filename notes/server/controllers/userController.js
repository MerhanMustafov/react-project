const route = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenSecret = 'asdf123 321fdsa'
const { ...userService } = require('../services/userService')
route.post('/register', async (req, res) => {
  try {
    const existing = await userService.getUserByName(req.body.username)
    if (existing) {
        throw new Error('Username already exists!')
    }
    
    const userData = await generateUserDataDbFormat(req.body)
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

async function generateUserDataDbFormat(userData){
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    return {
        username: userData.username.trim(),
        hashedPassword: hashedPassword,
        img: userData.img,
        gender: userData.gender,
        userSections: [],
        userNotes: []
    }
}
module.exports = route
