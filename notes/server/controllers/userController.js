const route = require('express').Router()
const {...userService} = require('../services/userService')
route.post('/register',  async (req, res) => {
    console.log('Insid /register')
    res.status(200).json({msg: 'OK'})
})


module.exports = route